# Caso 1 · Potencia de transmisión

**Qué se hizo.** Variar la potencia de transmisión de la radio 802.11p de los vehículos del pelotón, barriendo varios valores en simulaciones sucesivas.

**Para qué.** La potencia determina el alcance efectivo de la comunicación. Al reducirla, los vehículos más alejados dentro del pelotón dejan de recibir los mensajes del líder de forma confiable, y el controlador cooperativo empieza a operar con información incompleta. El objetivo es encontrar a partir de qué punto la degradación de la red se traduce en degradación del control, y si el pelotón mantiene la estabilidad.

**Cómo se implementa.** La potencia se fija como parámetro de la interfaz de red (`nic`) de cada nodo desde `omnetpp.ini`, sin tocar código C++. Como el efecto depende también de la sensibilidad del receptor y del modelo de propagación, ambos deben quedar fijos para que la potencia sea la única variable.

```ini
# PENDIENTE: parámetro de potencia de transmisión y valores del barrido
```

**Cómo se mide.** Tres indicadores en conjunto: la tasa de recepción de mensajes por vehículo, que muestra el efecto en la red; el error de espaciamiento respecto de la distancia objetivo, que muestra el efecto en el control; y la distancia real entre vehículos a lo largo del tiempo, que muestra si hubo riesgo de colisión.
