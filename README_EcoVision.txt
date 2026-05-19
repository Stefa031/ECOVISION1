EcoVision - ESP32 DevKit final

1. Încarcă EcoVision_ESP32_Final.ino pe ESP32 DevKit.
2. Arduino trebuie să trimită către ESP32 pe UART o linie CSV:

temp,hum,mq8,mq135,mq7,dust,batteryV,batteryP,pressure,accX,accY,accZ,gyroZ,totalLight,movementMode,frontDistance,backDistance

Exemplu:
23.5,48,320,410,280,12.4,11.80,82,1013.2,0.01,0.02,0.98,0.12,850,1,24.5,30.0

3. Test în browser:
http://IP_ESP/data

4. Comenzi:
http://IP_ESP/control?cmd=forward
http://IP_ESP/control?cmd=backward
http://IP_ESP/control?cmd=left
http://IP_ESP/control?cmd=right
http://IP_ESP/control?cmd=stop

5. În site-ul de pe GitHub, în Admin:
- IP robot = IP-ul ESP32 DevKit
- IP cameră = IP-ul ESP32-CAM
