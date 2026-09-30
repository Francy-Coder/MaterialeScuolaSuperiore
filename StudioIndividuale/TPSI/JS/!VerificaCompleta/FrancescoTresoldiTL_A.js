const express = require('express');
const app = express();

app.use(express.json());

// ============================================================
// DATI — non modificare
// ============================================================

let livelli = [
  { id: 1, nome: 'Corridoio Iniziale', difficolta: 1, trappole: 4,  completato: false },
  { id: 2, nome: 'Sala delle Lame',    difficolta: 3, trappole: 12, completato: false },
  { id: 3, nome: 'Abisso Rotante',     difficolta: 4, trappole: 18, completato: false },
  { id: 4, nome: 'Trono del Diavolo',  difficolta: 5, trappole: 25, completato: false },
  { id: 5, nome: 'Ingresso Facile',    difficolta: 2, trappole: 7,  completato: true  }
];

let tentativi = [];

let viteRimaste = 50;
let nextLivelloId   = 6;
let nextTentativoId = 1;

// ============================================================
// AGGIUNGERE QUI middleware e route
// ============================================================

// SOGLIA 6: Logger globale
app.use(function(req, res, next) {
    console.log("Metodo: " + req.method + ", URL: " + req.url);
    next();
});

// SOGLIA 6: Middleware su /livelli per controllo x-giocatore
app.use("/livelli", function(req, res, next) {
    if (req.headers['x-giocatore'] !== 'diavolo') {
        return res.status(403).send("Accesso negato. Solo i coraggiosi entrano.");
    }
    next();
});

// SOGLIA 6: Middleware validazione body POST /livelli
app.use("/livelli", function(req, res, next) {
    if (req.method === 'POST') {
        if (!req.body.nome || typeof req.body.nome !== 'string') {
            return res.status(400).send("nome assente o non stringa non vuota");
        }
        if (req.body.difficolta === undefined || typeof req.body.difficolta !== 'number' || req.body.difficolta < 1 || req.body.difficolta > 5) {
            return res.status(400).send("difficolta assente, non numero o fuori range 1-5");
        }
        if (req.body.trappole === undefined || typeof req.body.trappole !== 'number' || req.body.trappole < 0) {
            return res.status(400).send("trappole assente, non numero o non positivo");
        }
    }
    next();
});

app.get('/livelli', function(req, res) {
    res.json(livelli);
});

app.post('/livelli', function(req, res) {
    // Verifica duplicato
    for (let i = 0; i < livelli.length; i++) {
        if (livelli[i].nome === req.body.nome) {
            return res.status(409).send("Livello già esistente");
        }
    }

    let nuovoLivello = {
        id: nextLivelloId,
        nome: req.body.nome,
        difficolta: req.body.difficolta,
        trappole: req.body.trappole,
        completato: false
    };
    
    livelli.push(nuovoLivello);
    nextLivelloId++;
    res.status(201).json(nuovoLivello);
});

// SOGLIA 7: Middleware parametrico
app.use('/livelli/difficolta/:difficolta', function(req, res, next) {
    req.difficoltaParam = parseInt(req.params.difficolta);
    next();
});

app.get('/livelli/difficolta/:difficolta', function(req, res) {
    let filtrati = [];
    for (let i = 0; i < livelli.length; i++) {
        if (livelli[i].difficolta === req.difficoltaParam) {
            filtrati.push(livelli[i]);
        }
    }
    res.json(filtrati);
});

// SOGLIA 8: Validazione body POST /tentativi
app.use("/tentativi", function(req, res, next) {
    if (req.method === 'POST') {
        if (typeof req.body.livelloId !== 'number' || !req.body.giocatore || !req.body.esito) {
            return res.status(400).send("Dati incompleti o errati");
        }
    }
    next();
});

app.get('/tentativi', function(req, res) {
    res.json(tentativi);
});

app.get('/tentativi/:id', function(req, res) {
    let trovato = null;
    for (let i = 0; i < tentativi.length; i++) {
        if (tentativi[i].id === parseInt(req.params.id)) {
            trovato = tentativi[i];
        }
    }
    if (!trovato) {
        return res.status(404).send("Tentativo non esistente");
    }
    res.json(trovato);
});

// SOGLIA 9-10: POST /tentativi
app.post('/tentativi', function(req, res) {
    let livello = null;
    for (let i = 0; i < livelli.length; i++) {
        if (livelli[i].id === req.body.livelloId) {
            livello = livelli[i];
        }
    }

    if (!livello) {
        return res.status(404).send("Livello non esistente");
    }

    let viteNecessarie = livello.difficolta * 2;

    if (viteRimaste < viteNecessarie) {
        return res.status(400).json({
            vite_disponibili: viteRimaste,
            vite_necessarie: viteNecessarie,
            messaggio: "Vite insufficienti per questo livello."
        });
    }

    viteRimaste = viteRimaste - viteNecessarie;

    let nuovoTentativo = {
        id: nextTentativoId,
        livelloId: req.body.livelloId,
        giocatore: req.body.giocatore,
        esito: req.body.esito,
        vite_usate: viteNecessarie
    };

    tentativi.push(nuovoTentativo);
    nextTentativoId++;
    res.status(201).json(nuovoTentativo);
});

// ============================================================

app.listen(3000, function() {
  console.log('Level Devil attivo sulla porta 3000');
});