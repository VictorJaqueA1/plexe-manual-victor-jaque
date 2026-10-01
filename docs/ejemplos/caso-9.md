# Caso 9 · ETC y retardo en conjunto

**Qué se hizo.** Combinar los casos 7 y 8, activando simultáneamente el control disparado por eventos y el retardo estocástico de comunicación.

**Para qué.** Los dos efectos no se suman de forma independiente, y ahí está el interés. El mecanismo de disparo decide cuándo transmitir a partir del error entre el estado propio y el último comunicado, pero si los mensajes llegan con retardo variable, esa referencia está desactualizada en el receptor. El resultado es que el disparo puede ocurrir tarde, o dispararse de más al intentar corregir información vieja. Evaluar cada mecanismo por separado no permite anticipar el comportamiento conjunto.

**Cómo se implementa.** Se activan ambos mecanismos y se barren las dos variables en conjunto: el umbral de disparo y el retardo medio. Como es un barrido en dos dimensiones, el número de simulaciones crece rápido, así que conviene lanzarlo mediante un script que recorra la grilla de combinaciones sin intervención manual.

```ini
# PENDIENTE: configuración conjunta y definición de la grilla del barrido
```

**Cómo se mide.** El resultado natural es una superficie en dos dimensiones: desempeño en función del umbral y del retardo. Lo que interesa localizar es la frontera de estabilidad, es decir la curva que separa las combinaciones viables de las que hacen inestable al pelotón, y comprobar si el ahorro de comunicación que el ETC lograba sin retardo se mantiene cuando el retardo aparece.
