#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN  9       //Pin 9 para el reset del RC522
#define SS_PIN_ENB  10   //Pin 10 para el SS (SDA) del RC522

MFRC522 MyLectorRF(SS_PIN_ENB, RST_PIN); //Creamos el objeto para el RC522
const byte nOne = "A9 55 EC A2";

void setup() {
  Serial.begin(9600); //Iniciamos la comunicación  serial
  SPI.begin();        //Iniciamos el Bus SPI
  MyLectorRF.PCD_Init(); // Iniciamos  el MyLectorRF
  Serial.println("Control Inicializado ...");
}

void loop() 
{
  // Verificamos si se ha detectado alguna tarjeta
  if ( MyLectorRF.PICC_IsNewCardPresent()) 
  {  
      // Determinamos el codigo de la tarjeta
            if ( MyLectorRF.PICC_ReadCardSerial()) 
            {
                  // Recuperamos en ID de la Tarjeta
                  //Serial.print("Card UID:");
                  for (byte i = 0; i < MyLectorRF.uid.size; i++) 
                  {
                          if(MyLectorRF.uid.uidByte[i] == MyLectorRF.uid.uidByte[nOne]) {
                            Serial.print(MyLectorRF.uid.uidByte[i] < 0x10 ? " 0" : " ");
                            Serial.print(MyLectorRF.uid.uidByte[i], HEX );
                          } else if (MyLectorRF.uid.uidByte[i] == "A2 92 6F 1C"){
                            Serial.print(MyLectorRF.uid.uidByte[i] < 0x10 ? " 0" : " ");
                            Serial.print(MyLectorRF.uid.uidByte[i], HEX);
                          }
                          Serial.print(MyLectorRF.uid.uidByte[i] < 0x10 ? " 0" : " ");
                          Serial.print(MyLectorRF.uid.uidByte[i], HEX);   
                  } 
                  Serial.println();
                  // Terminamos la lectura de la tarjeta  actual
                  MyLectorRF.PICC_HaltA();         
            }      
  } 
}
