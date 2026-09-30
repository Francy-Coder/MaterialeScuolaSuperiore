L'arena e-sports CyberDome organizza tornei di videogiochi in realtà virtuale e necessita di un sistema per gestire giocatori, arene e partite.
Il sistema deve occuparsi di giocatori, arene virtuali e partite.
Quando un giocatore entra in un'arena per giocare una partita, il sistema registra l'inizio della sessione. Quando il giocatore esce dall'arena, viene registrata la fine. Se un giocatore è ancora in partita, la sua sessione risulta attiva.

Progetta un'API REST per questo sistema.

Dovrai identificare le tre risorse necessarie e fornire per ciascuna un esempio di oggetto JSON con i campi che ritieni opportuni.
Successivamente, dovrai progettare cinque endpoint che permettano di:
1. ottenere tutte le partite attive di un'arena specifica
2. creare un nuovo giocatore
3. modificare completamente i dati di un'arena esistente
4. eliminare una partita
5. creare una nuova partita

Per ogni endpoint dovrai specificare il metodo HTTP utilizzato, l'URI, l'eventuale corpo della richiesta e della risposta in formato JSON, lo status code in caso di successo e gli eventuali header HTTP rilevanti.

---

[
{
    "id": 1,
    "nome": "Francesco Tresoldi",
    "nickname": "Unrivaled Under the Sun",
    "livello": 100
},

{
    "id": 1,
    "nome": "Ashina Castle",
    "capienza": 100,
    "tipo": "story_mode"
}

{
    "id": 1,
    "id_giocatore": 1,
    "id_arena": 1,
    "data_inizio": "2026-02-05",
    "data_fine": null
}
]

# Endpoint 1 - Ottenere tutte le partite attive di un'arena specifica
Metodo: GET
URI Nested: /arene/1/partite
Status Code: 200 (OK)
Body Richiesta: -
Body Risposta: 
[
    {
    "id": 1,
    "id_giocatore": 1,
    "id_arena": 1,
    "data_inizio": "2026-02-05",
    "data_fine": null
    }
]

# Endpoint 2 - Creare un nuovo giocatore
Metodo: POST
URI: /giocatori
Body Richiesta:
[
    {
        "nome": "Luca Bianchi",
        "nickname": "Five-Kun",
        "livello": 10
    }
]

Status Code: 201 (Created)
Body Risposta: 
{
  "id": 2,
  "nome": "Luca Bianchi",
  "nickname": "FireStorm",
  "livello": 1
}

Header Location: /giocatori/2

# Endpoint 3 - Modificare completamente i dati di un'arena esistente
Metodo: PUT
URI: /arene/1
Body Richiesta:
[
    {
        "nome": "Elden Tree",
        "capienza": 10,
        "tipo": "story_mode"
    }
]

Status Code: 200
Body Risposta:
[
    {
        "id": 1,
        "nome": "Elden Tree",
        "capienza": 10,
        "tipo": "story_mode"
    }
]

Header Location: -

# Endpoint 4 - Eliminare una partita
Metodo: DELETE
URI: /partite/id
Body Richiesta: -
Status Code: 204
Body Risposta: -
Header Location: -

# Endpoint 5 - Creare una nuova partita
Metodo: POST
URI: /partite
Body Richiesta:
[
    {
    "id_giocatore": 2,
    "id_arena": 2,
    "data_inizio": "2026-02-09",
    "data_fine": null
    }
]

Status Code: 201
Body Risposta: 
[
    {
    "id": 2,
    "id_giocatore": 2,
    "id_arena": 1,
    "data_inizio": "2026-02-09",
    "data_fine": null
    }
]

Header Location: /partite/2