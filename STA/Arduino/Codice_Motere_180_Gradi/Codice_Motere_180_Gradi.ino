#include <Servo.h>
#define PIN_SERVO 9
#define PIN_POTENZIOMETRO A0

Servo servo;

void setup() {
  servo.attach(PIN_SERVO);
}

void loop() {
  int input = analogRead(PIN_POTENZIOMETRO);
  int angolo = map(input, 0, 1023, 0, 179);
  servo.write(angolo);
  delay(20);
}
