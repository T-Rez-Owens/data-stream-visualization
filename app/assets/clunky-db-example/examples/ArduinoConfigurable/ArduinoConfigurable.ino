// Arduino Uno WiFi Dev Ed Library - Version: Latest 
#include <UnoWiFiDevEd.h>


#define CONNECTOR "mqtt"
#define TOPIC_READ "ToSensor1"
#define TOPIC_WRITE "FromSensor1"
//constants:
const int buttonPin = 4;     // the number of the pressureSensor pin
const int ledPin =  13;
  
//initialize vars
int buttonState = 0;
int lastButtonState = 0;
int cycles = 0;
int lastCycle = -1;
int sampleData[] = {};
int updateBeat = 0;

//initialize triggers
bool samplingData = 1;
bool powerSave = 1;

//initialize settings
int sampleRate = 250;
int heartBeatRate = 100;


void setup(void) 
{
  Ciao.begin();
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Ciao.println("Starting...");
  Ciao.println("Read Channel: " TOPIC_READ);
  Ciao.println("Write Channel: " TOPIC_WRITE);
  Ciao.print("sample rate: ");
  Ciao.println(sampleRate);
  Ciao.print("heartBeat rate: ");
  Ciao.println(heartBeatRate);
  Ciao.println(ID_ERROR);
  
  Ciao.write(CONNECTOR, TOPIC_WRITE, "Sensor Ready"); 
  
}
void loop(void) 
{  
  CiaoData data = Ciao.read(CONNECTOR,TOPIC_READ);
  if(cycles>updateBeat+heartBeatRate){
    Ciao.println(cycles);
    updateBeat=cycles;
  }
  if (!data.isEmpty() ) 
  {
    String message = data.get(2);
    Ciao.println(message);
    message.toLowerCase();
    if ( message == "led on") {
      digitalWrite(ledPin, HIGH);
      Ciao.println(F("LED = ON"));
      Ciao.write(CONNECTOR, TOPIC_WRITE, F("LED = ON"));
    }
    else if ( message == "led off") {
      digitalWrite(ledPin, LOW);
      Ciao.println(F("LED = OFF"));
      Ciao.write(CONNECTOR, TOPIC_WRITE, F("LED = OFF"));
    }
     else{
    }
  }
  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  /*
  String myString = "On";
  
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
    Serial.print("On\n");
    myString = "on";
    lastButtonState = HIGH;
  } else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
    Serial.print("Off");
    myString = "off";
    lastButtonState = LOW;
  }
  delay(100);
  if(buttonState != lastButtonState){
    Ciao.write(CONNECTOR, TOPIC, myString);
    cycles=cycles+1; 
  }*/
  
  buttonState = digitalRead(buttonPin);
  if(cycles != lastCycles){
    //Ciao.write(CONNECTOR, TOPIC_WRITE, myString); 
    lastCycle=cycles;
  }
  delay(sampleRate);
  cycles+=1; 
  
}
