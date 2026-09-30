#include "pitches.h"

int buzzerPin = 2 ;

int melodia[] = {
  NOTE_C4, NOTE_F4, NOTE_F4, NOTE_G4, NOTE_A4, NOTE_F4, NOTE_C5,
  NOTE_B4, NOTE_A4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_B4, NOTE_A4, 
  NOTE_B4, NOTE_C5, NOTE_G4, NOTE_F4, NOTE_G4, NOTE_A4, NOTE_G4,
};

int durataNote[] = {
  4, 4, 8, 8, 4, 4, 3, 8, 3, 8, 4, 8, 8, 8, 8, 4, 8, 8, 8, 8, 3
};

int numeroNote = 21;

void setup(){
 pinMode(buzzerPin, OUTPUT);
}

void loop() {
 for(int i = 0; i < numeroNote; i++){
  int durata = 1500 / durataNote[i];
  tone(buzzerPin, melodia[i], durata);
  delay(durata * 1.3);
 }
} 
