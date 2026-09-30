ESERCIZIO 1 – Palestra smart

La palestra FitZone utilizza un sistema digitale per gestire clienti, sale di allenamento e sessioni di allenamento.

Il sistema deve occuparsi di:
- clienti
- sale
- sessioni di allenamento

Quando un cliente entra in una sala per allenarsi, viene registrato l’orario di inizio sessione.
Quando termina l’allenamento, viene registrato l’orario di fine.
Se l’orario di fine è assente, la sessione è considerata attiva.

Richieste:
1) Individua tre risorse necessarie e fornisci per ciascuna un esempio di oggetto JSON.
2) Progetta cinque endpoint REST che permettano di:
   - ottenere tutte le sessioni attive di una sala specifica
   - creare un nuovo cliente
   - modificare completamente i dati di una sala
   - eliminare una sessione di allenamento
   - creare una nuova sessione

Per ogni endpoint specifica:
- metodo HTTP
- URI
- body della richiesta (se presente)
- body della risposta
- status code di successo
- eventuali header HTTP rilevanti

---

RISORSE DEL SISTEMA

CLIENTE
{
    "id": 1,
    "nome": "Marco Rossi",
    "email": "marco.rossi@email.com",
    "abbonamento": "mensile"
}

SALA
{
    "id": 1,
    "nome": "Sala Pesi",
    "capienza": 20,
    "tipo": "fitness"
}

SESSIONE_ALLENAMENTO
{
    "id": 1,
    "id_cliente": 1,
    "id_sala": 1,
    "ora_inizio": "2026-02-09T10:00:00",
    "ora_fine": null
}


ENDPOINT 1 – Ottenere tutte le sessioni attive di una sala specifica
Metodo: GET
URI: /sale/1/sessioni?attive=true
Body Richiesta: -
Body Risposta:
[
    {
        "id": 1,
        "id_cliente": 1,
        "id_sala": 1,
        "ora_inizio": "2026-02-09T10:00:00",
        "ora_fine": null
    }
]
Status Code: 200 OK
Header: -


ENDPOINT 2 – Creare un nuovo cliente
Metodo: POST
URI: /clienti
Body Richiesta:
{
    "nome": "Luca Bianchi",
    "email": "luca.bianchi@email.com",
    "abbonamento": "annuale"
}
Body Risposta:
{
    "id": 2,
    "nome": "Luca Bianchi",
    "email": "luca.bianchi@email.com",
    "abbonamento": "annuale"
}
Status Code: 201 Created
Header Location: /clienti/2


ENDPOINT 3 – Modificare completamente i dati di una sala
Metodo: PUT
URI: /sale/1
Body Richiesta:
{
    "nome": "Sala Cardio",
    "capienza": 15,
    "tipo": "cardio"
}
Body Risposta:
{
    "id": 1,
    "nome": "Sala Cardio",
    "capienza": 15,
    "tipo": "cardio"
}
Status Code: 200 OK
Header: -


ENDPOINT 4 – Eliminare una sessione di allenamento
Metodo: DELETE
URI: /sessioni/1
Body Richiesta: -
Body Risposta: -
Status Code: 204 No Content
Header: -


ENDPOINT 5 – Creare una nuova sessione di allenamento
Metodo: POST
URI: /sessioni
Body Richiesta:
{
    "id_cliente": 2,
    "id_sala": 1,
    "ora_inizio": "2026-02-09T11:30:00",
    "ora_fine": null
}
Body Risposta:
{
    "id": 2,
    "id_cliente": 2,
    "id_sala": 1,
    "ora_inizio": "2026-02-09T11:30:00",
    "ora_fine": null
}
Status Code: 201 Created
Header Location: /sessioni/2
