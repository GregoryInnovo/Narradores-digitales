
int counter = 0;
// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.

  Serial.begin(9600); // Begen listening on port 9600 for serial
  
  pinMode(13, OUTPUT);

  digitalWrite(13, LOW);
}

// the loop function runs over and over again forever
void loop() {

   Serial.print(++counter, DEC);
   delay(2000);
   /*if(Serial.available() > 0) // Read from serial port
    {
      char ReaderFromNode; // Store current character
      ReaderFromNode = (char) Serial.read();
      convertToState(ReaderFromNode); // Convert character to state  
    }
  delay(1000); */
}

void convertToState(char chr) {
  if(chr=='o'){
    digitalWrite(13, HIGH);
    delay(500); 
    digitalWrite(13, LOW); 
  }
  if(chr=='f'){
    digitalWrite(13, LOW);
    delay(100); 
  }
}

/*int counter = 0;
void setup() {
  Serial.begin(9600); // Starts the serial communication
}
void loop() {
  Serial.print(++counter, DEC);
  delay(1000);
}*/
