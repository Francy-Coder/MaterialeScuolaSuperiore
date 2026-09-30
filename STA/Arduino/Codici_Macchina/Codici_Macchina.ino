#include <IRremote.h>

#include <Servo.h>

#define irReceivePin 11
IRrecv irrecv(irReceivePin);
decode_results results;

Servo rightServo;
Servo leftServo;

int rightSpeed = 90;
int leftSpeed = 90;
long keyCode = 0;


void setup (){
   leftServo.attach(9);
   rightServo.attach(10);
   pinMode(9, OUTPUT);
   pinMode(10, OUTPUT); 
   Serial.begin(9600);
   irrecv.enableIRIn();
   updateMotors();
}

void loop() {


if(irrecv.decode(&results)) {

  keyCode=results.value;
  irrecv.resume(); 
  Serial.println(keyCode,HEX);
  if (keyCode != -1) {
  switch (keyCode) {

    case 0xE0E006F9: Serial.println("Avanti");
      leftSpeed-=5;
      rightSpeed+=5; 
      break;

    case 0xE0E08679: Serial.println("Indietro");
       leftSpeed+=5;
       rightSpeed-=5;  
       break;

    case 0xE0E0F00F: Serial.println("Stop");
       leftSpeed=90;
       rightSpeed=90; 
       break;

    case 0xE0E0A659: Serial.println("Sinistra");
      leftSpeed-=5;
      rightSpeed-=5;
      break;

    case 0xE0E046B9: Serial.println("Destra");
      leftSpeed+=5;
      rightSpeed+=5;
      break;

    case 0xE0E016E9: Serial.println("Turbo");
      leftSpeed=0;
      rightSpeed=180;
      break;
  }
}


updateMotors ();
delay (10);
}
}


void updateMotors () {

   leftServo.write (leftSpeed);
   rightServo.write (rightSpeed);

}
