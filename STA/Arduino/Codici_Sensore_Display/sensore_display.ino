#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 8, 5, 4, 3, 2); 

String messaggi [] = {
  "Hello word",
  "Ciao mondo",
  "Hola mundo",
  "Hallo welt",
  "Bonjour le monde"
  
};


void setup() {
lcd.begin(16, 2);
}


void loop() {
    for(int i = 0; i < 5; i++){
    lcd.clear ();
    lcd.setCursor (0,0);
    lcd.print ("Tutorial Arduino");
    lcd.setCursor (0, 1); 
    lcd.print (messaggi [i]);
    delay (1000);
    
}

}
