
#define D2 4   //aquí va el sensor de temperatura

int buzzer = 5;
int smokeA0 = A0;
int sensorThres = 600;
int hayHumo = 0;

// ----- Definiciones del sensor de temperatura DHT11
#include "DHT.h"
#define DHTPIN D2  // Posicion equivalente a D2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// ----- Incluir librerias para Wifi y conectar a broker
#include <ESP8266WiFi.h>
#include <PubSubClient.h> 

// ----- Definiciones de ESP8266MQTT
const char* ssid = "Tec-IoT";    // Nombre del internet Tec-IoT
const char* password = "spotless.magnetic.bridge";     // Contrasena del internet spotless.magnetic.bridge

const char* mqtt_server = "broker.mqtt-dashboard.com";    // Link del server

// Topicos
const char* topico_salidaTemp = "TempHospitAI";
const char* topico_salidaHumo = "HumoHospitAI";

// Cantidad de characteres en los topico
char sTopicoOutTemp[50];
char sTopicoOutHumo[50];

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

     client.subscribe(topico_salidaTemp);
     client.subscribe(topico_salidaHumo);
   
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
  
   Serial.print("Publish message: "); Serial.println(sTopicoOutTemp);
   client.publish(topico_salidaTemp, sTopicoOutTemp);

   Serial.print("Publish message: "); Serial.println(sTopicoOutHumo);
   client.publish(topico_salidaHumo, sTopicoOutHumo);

 }
}


// =================================================================
// ----- Funcion que lee temperatura y humedad con el sensor DHT11
void medirTemperatura() {
 float h = dht.readHumidity();
 float t = dht.readTemperature();
   
 if (isnan(h) || isnan(t)) {
   Serial.print("Falló al leer el sensor DHT\n");
   if(isnan(h)){
     Serial.print("Falló al leer h");
   }
   if(isnan(t)){
     Serial.print("Falló al leer t");
   }

   return;
 }

 Serial.print("Humedad: "); Serial.print(h);
 Serial.print(", Temperatura: "); Serial.print(t);
 Serial.print("(C), ");
 Serial.print("\n");
   
 // Cuando se use MQTT para formar el JSON de temperatura y humedad
 snprintf (sTopicoOutTemp, MSG_BUFFER_SIZE, "{\"temperatura\":%5.2f,\"humedad\":%5.2f}",t,h);
}

void setup() {
pinMode(buzzer, OUTPUT);
pinMode(smokeA0, INPUT);
Serial.begin(9600);

 // ----- Abrir Wifi y MQTT
 setup_wifi();
 setup_mqtt();

 dht.begin();
}

void loop() {
 conectarMQTT();
 int analogSensor = analogRead(smokeA0);

 if (analogSensor > sensorThres){
   hayHumo = 1;
   tone(buzzer, 1000, 200);
 } else {
   hayHumo = 0;
   noTone(buzzer);
 }

 snprintf (sTopicoOutHumo, MSG_BUFFER_SIZE, "{\"humo\":%d}", hayHumo);
 medirTemperatura();
 delay(4000);
}