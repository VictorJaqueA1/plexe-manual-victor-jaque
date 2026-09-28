# Caso 6 · Retardo estocástico de comunicación

**Qué se hizo.** Introducir una latencia aleatoria en la entrega de los mensajes, muestreada de una distribución de probabilidad en lugar de ser un valor fijo.

**Para qué.** Los controladores cooperativos usan la información del líder para anticiparse, así que son directamente sensibles al retardo: si el dato llega tarde, la acción de control se calcula sobre un estado que ya cambió. Un retardo constante es fácil de compensar y no representa una red real, donde la latencia varía mensaje a mensaje. Un retardo estocástico obliga al controlador a operar con incertidumbre temporal, que es la condición realista.

**Cómo se implementa.** Cada mensaje recibe un retardo extra muestreado de una distribución configurable antes de ser entregado. La distribución y sus parámetros se exponen en `omnetpp.ini` para poder barrer el retardo medio y su dispersión de forma independiente.

```ini
# PENDIENTE: distribución del retardo y valores del barrido
```

**Cómo se mide.** Error de espaciamiento en función del retardo medio, y determinación del retardo máximo tolerable antes de perder la estabilidad. Hay que fijarse en la relación entre el retardo y el intervalo de envío de mensajes: cuando el retardo se acerca al período de envío, la información llega esencialmente obsoleta.
