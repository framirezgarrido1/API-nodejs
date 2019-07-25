# API para controlar dispositivos mediante MQTT

Esta aplicación basada en Node.js permite recibir y enviar información a traves del protocolo MQTT, para controlar dispositivos
conetados a internet por medio de alguna placa de desarrollo.


# index.js
Controla las llamadas a la API para publicar los estados de los pines digitales en las placas de desarrollo.

Ejemplo: http://localhost:3000/light/01/on

device = {
  	id: '1',
  	topic: 'esp32/status/',
  	status: '1',
  	name: 'light-0001'
  };
    
Publicación por MQTT: client.publish('esp32/status/', 'light-01-on')

# status.js
Controla la llamada a la API que regresa los estados guardados en la base de datos.

# update_status.js
Recibe los estados publicados por medio del protocolo MQTT y los guarda en la base de datos.
