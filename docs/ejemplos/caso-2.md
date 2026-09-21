# Caso 2 · Pérdida artificial de paquetes con FER

**Qué se hizo.** Introducir una tasa de error de trama (*Frame Error Rate*) configurable, que descarta mensajes recibidos con una probabilidad fija antes de entregarlos a la capa superior.

**Para qué.** Es la contraparte metodológica del caso 1. Con potencia, la pérdida depende de la distancia, del modelo de propagación y de la posición del vehículo en el pelotón, o sea que la variable independiente no está bajo control directo. Con FER, la pérdida se fija como un número y es idéntica para todos los vehículos. Eso permite responder la pregunta pura: cuánta pérdida tolera el controlador, sin que la geometría del escenario contamine el resultado.

**Cómo se implementa.** Se descarta la trama recibida con probabilidad configurable, en el punto del camino de recepción donde el mensaje ya llegó íntegro pero todavía no fue procesado por la aplicación. La probabilidad se expone como parámetro para poder barrerla desde `omnetpp.ini`.

```ini
# PENDIENTE: parámetro de FER y valores del barrido
```

**Cómo se mide.** Error de espaciamiento en función del FER, y el valor de FER a partir del cual el pelotón deja de ser estable. Conviene contrastar el resultado con el del caso 1: si ambos coinciden al traducir potencia a pérdida efectiva, el modelo es consistente.
