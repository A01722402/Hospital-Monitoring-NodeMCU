
/*
  Sketch to handle each sample read from a PulseSensor.
  Typically used when you don't want to use interrupts
  to read PulseSensor voltages.

  Here is a link to the tutorial that discusses this code
  https://pulsesensor.com/pages/getting-advanced

  Copyright World Famous Electronics LLC - see LICENSE
  Contributors:
    Joel Murphy, https://pulsesensor.com
    Yury Gitman, https://pulsesensor.com
    Bradford Needham, @bneedhamia, https://bluepapertech.com

  Licensed under the MIT License, a copy of which
  should have been included with this software.

  This software is not intended for medical use.
*/

// ----- Incluir librerias para Wifi y conectar a broker
#include <ESP8266WiFi.h>
#include <PubSubClient.h> 

// ----- Definiciones de ESP8266MQTT
const char* ssid = "Tec-IoT";    // Nombre del internet Tec-IoT
const char* password = "spotless.magnetic.bridge";     // Contrasena del internet spotless.magnetic.bridge
const char* mqtt_server = "broker.mqtt-dashboard.com";    // Link del server

// Topicos
const char* topico_salidaBPM= "BPMHospitAI";
char sTopicoOutBPM[50];

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

// ----- Funcion que Conecta a Wifi del Router
// We start by connecting to a WiFi network
void setup_wifi() {
 delay(10);
 Serial.println();    Serial.print("Connecting to ");   Serial.println(ssid);  // Mostrar en consola ha que red se esta conectando
 WiFi.mode(WIFI_STA);          // El WIFI_STA (modo estacion) sirve para conectar el ESP8266 a una red WiFi mediante un punto de acceso
 WiFi.begin(ssid, password);   // Iniciamos la conexion real a la red

 // Comprobar si se conecta a la red
 while (WiFi.status() != WL_CONNECTED) {
   delay(500);
   Serial.print(".");
 }

 //randomSeed(micros());  randomSeed() es para generar un numero largo random y lo envia al micros() que es el numero de microsegundos desde que emepzo el programa
 Serial.println(""); Serial.println("WiFi connected"); Serial.print("IP address: "); Serial.println(WiFi.localIP());
}

// ----- Funcion que Conecta a Broker MQTT
void setup_mqtt() {
 client.setServer(mqtt_server, 1883);   // Se hace un cliente de un servidor parcialmente inicializado porque tenemos PubSubClient client(espClient)
 client.setCallback(callback);         // Establece el mensaje de la funcion callback

 // Si el cliente no esta conectado entonces intentar reconectar
 if (!client.connected()) {
   reconnect();
 }
}


// ----- Funcion que Conecta a Broker MQTT
void callback(char* topic, byte* payload, unsigned int length) {

 // El topic es la categorizacion por rutas tipo home/living-room/temperature
 Serial.print("Message arrived ["); Serial.print(topic); Serial.print("] ");

 // El payload es el contenido actual del mensaje, puede ser texto, JSON, XML, etc...
 for (int i = 0; i < length; i++) {
   Serial.print((char)payload[i]);
 }
 Serial.println();
}

// ----- Funcion que Conecta o reconecta a Broker MQTT
void reconnect() {
 // Loop until we're reconnected
 while (!client.connected()) {
   Serial.print("Attempting MQTT connection...");
   // Create a random client ID
   String clientId = "ESP8266Client-";
   clientId += String(random(0xffff), HEX);

   // Attempt to connect
   if (client.connect(clientId.c_str())) {
     Serial.println("connected");
     // Once connected, publish an announcement...
     //client.publish("outTopic", "hello world");
     //client.subscribe(topico_entrada);

     client.subscribe(topico_salidaBPM);

   
   } else {
     Serial.print("failed, rc="); Serial.print(client.state()); Serial.println(" try again in 5 seconds");
     // Wait 5 seconds before retrying
     delay(5000);
   }
 }
}

void conectarMQTT() {

 // Si el cliente no esta conectado entonces reconectar
 if (!client.connected()) {
   reconnect();
 }
 client.loop();
         
 unsigned long now = millis();
 if (now - lastMsg > 5000) {
   lastMsg = now;
   ++value;
  
   Serial.print("Publish message: "); Serial.println(sTopicoOutBPM);
   client.publish(topico_salidaBPM, sTopicoOutBPM);

 }
}



#define USE_ARDUINO_INTERRUPTS false
#include <PulseSensorPlayground.h>


const int OUTPUT_TYPE = PROCESSING_VISUALIZER;


const int PULSE_INPUT = A0;
const int PULSE_BLINK = 2;    // Pin led del node
const int PULSE_FADE = 5;
const int THRESHOLD = 550;
int BPM = 0;


byte samplesUntilReport;
const byte SAMPLES_PER_SERIAL_SAMPLE = 10;


PulseSensorPlayground pulseSensor;

void setup() {
 /*
    Use 115200 baud because that's what the Processing Sketch expects to read,
    and because that speed provides about 11 bytes per millisecond.

    If we used a slower baud rate, we'd likely write bytes faster than
    they can be transmitted, which would mess up the timing
    of readSensor() calls, which would make the pulse measurement
    not work properly.
 */
 Serial.begin(115200);

 // ----- Abrir Wifi y MQTT
 setup_wifi();
 setup_mqtt();

 pulseSensor.analogInput(PULSE_INPUT);
 pulseSensor.blinkOnPulse(PULSE_BLINK);
 pulseSensor.fadeOnPulse(PULSE_FADE);

 pulseSensor.setSerial(Serial);
 pulseSensor.setOutputType(OUTPUT_TYPE);
 pulseSensor.setThreshold(THRESHOLD);

 samplesUntilReport = SAMPLES_PER_SERIAL_SAMPLE;

 if (!pulseSensor.begin()) {
   for(;;) {
     digitalWrite(PULSE_BLINK, LOW);
     delay(50);
     digitalWrite(PULSE_BLINK, HIGH);
     delay(50);
   }
 }
}

void loop() {
 conectarMQTT();

 if (pulseSensor.sawNewSample()) {
   if (--samplesUntilReport == (byte) 0) {
     samplesUntilReport = SAMPLES_PER_SERIAL_SAMPLE;
     if (pulseSensor.sawStartOfBeat()) {
       BPM = pulseSensor.getBeatsPerMinute();
       snprintf (sTopicoOutBPM, MSG_BUFFER_SIZE, "{\"BPM\":%d}",BPM);
     }

     Serial.println(BPM);
   }
 }
}

