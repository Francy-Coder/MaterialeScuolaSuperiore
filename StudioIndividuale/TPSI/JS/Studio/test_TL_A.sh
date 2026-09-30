#!/bin/bash

# ============================================================
# TEST LEVEL DEVIL — Versione A
# 1. Apri un terminale e avvia il server: node index_TL_A.js
# 2. Apri un secondo terminale ed esegui: bash test_TL_A.sh
# ============================================================

BASE="http://localhost:3000"
HEADER="x-giocatore: diavolo"

echo ""
echo "=============================="
echo " SOGLIA 6"
echo "=============================="

echo ""
echo "--- Test 1: GET /livelli senza header --- atteso 403 ---"
curl -s -X GET "$BASE/livelli"

echo ""
echo "--- Test 2: GET /livelli con header --- atteso 200, lista livelli ---"
curl -s -X GET "$BASE/livelli" -H "$HEADER"

echo ""
echo "--- Test 3: POST /livelli incompleto --- atteso 400 ---"
curl -s -X POST "$BASE/livelli" -H "$HEADER" -H "Content-Type: application/json" -d @livello_incompleto.json

echo ""
echo "--- Test 4: POST /livelli difficolta fuori range --- atteso 400 ---"
curl -s -X POST "$BASE/livelli" -H "$HEADER" -H "Content-Type: application/json" -d @livello_difficolta_invalida.json

echo ""
echo "--- Test 5: POST /livelli valido --- atteso 201 ---"
curl -s -X POST "$BASE/livelli" -H "$HEADER" -H "Content-Type: application/json" -d @livello_valido.json

echo ""
echo "--- Test 6: POST /livelli nome duplicato --- atteso 409 ---"
curl -s -X POST "$BASE/livelli" -H "$HEADER" -H "Content-Type: application/json" -d @livello_valido.json

echo ""
echo "=============================="
echo " SOGLIA 7"
echo "=============================="

echo ""
echo "--- Test 7: GET /livelli/difficolta/3 --- atteso Sala delle Lame ---"
curl -s -X GET "$BASE/livelli/difficolta/3" -H "$HEADER"

echo ""
echo "--- Test 8: GET /livelli/difficolta/9 --- atteso array vuoto ---"
curl -s -X GET "$BASE/livelli/difficolta/9" -H "$HEADER"

echo ""
echo "=============================="
echo " SOGLIA 8"
echo "=============================="

echo ""
echo "--- Test 9: GET /tentativi --- atteso array vuoto ---"
curl -s -X GET "$BASE/tentativi"

echo ""
echo "--- Test 10: POST /tentativi incompleto --- atteso 400 ---"
curl -s -X POST "$BASE/tentativi" -H "Content-Type: application/json" -d @tentativo_incompleto.json

echo ""
echo "--- Test 11: GET /tentativi/99 --- atteso 404 ---"
curl -s -X GET "$BASE/tentativi/99"

echo ""
echo "=============================="
echo " SOGLIA 9-10"
echo "=============================="

echo ""
echo "--- Test 12: POST /tentativi livello inesistente --- atteso 404 ---"
curl -s -X POST "$BASE/tentativi" -H "Content-Type: application/json" -d @tentativo_livello_inesistente.json

echo ""
echo "--- Test 13: POST /tentativi su Corridoio Iniziale --- difficolta 1, viteNecessarie 2 ---"
echo "    atteso 201, viteRimaste scende da 50 a 48"
curl -s -X POST "$BASE/tentativi" -H "Content-Type: application/json" -d @tentativo_valido.json

echo ""
echo "--- Test 14: GET /tentativi/1 --- atteso il tentativo appena creato ---"
curl -s -X GET "$BASE/tentativi/1"

echo ""
echo "--- Test 15: POST /tentativi su Trono del Diavolo --- difficolta 5, viteNecessarie 10 ---"
echo "    atteso 201, viteRimaste scende da 48 a 38"
curl -s -X POST "$BASE/tentativi" -H "Content-Type: application/json" -d @tentativo_livello_duro.json

echo ""
echo "=============================="
echo " Fine test"
echo "=============================="
echo ""