#include <IRremote.h>
#include <Servo.h>

#define irReceivePin 11
#define ECHO_PIN 7       /**  per sensore di distanza  **/
#define TRIG_PIN 6       /**  per sensore di distanza  **/

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
   pinMode (ECHO_PIN, INPUT);   /**  per sensore di distanza  **/
   pinMode (TRIG_PIN, OUTPUT);  /**  per sensore di distanza  **/
   digitalWrite (TRIG_PIN,LOW); /**  per sensore di distanza  **/

}

void loop() {

  digitalWrite (TRIG_PIN,HIGH); /**  per sensore di distanza  **/
  delayMicroseconds(10);        /**  per sensore di distanza  **/
  digitalWrite (TRIG_PIN,LOW);  /**  per sensore di distanza  **/

  unsigned long tempo = pulseIn (ECHO_PIN,HIGH); /**  per sensore di distanza  **/
  float distanza = 0.03438*tempo/2;              /**  per sensore di distanza  **/

  Serial.println("Distanza = " + String(distanza) + " cm"); /**  per sensore di distanza  **/

  if (distanza <= 10) {    /**  per sensore di distanza  **/
    /* ferma la macchinina */
    leftSpeed = 90;        /**  per sensore di distanza  (impostare a 180 se si vuole far tornare indietro la macchinina)  **/
    rightSpeed = 90;       /**  per sensore di distanza  (impostare a 0 se si vuole far tornare indietro la macchinina)  **/
    updateMotors();        /**  per sensore di distanza  **/
  }                        /**  per sensore di distanza  **/

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
 
      case 0xE0E046B9l: Serial.println("Destra");
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
