# Ejemplos

Plexe trae cinco escenarios de ejemplo que sirven para verificar la instalación y para entender cómo se arma una simulación. Pero el trabajo real empieza cuando hay que modificarlos para responder una pregunta propia.

Esta sección documenta los casos que se implementaron efectivamente en el laboratorio: qué se modificó, con qué objetivo, dónde se toca el código o la configuración, y qué se mide para obtener un resultado interpretable. Cada caso es autocontenido y se puede reproducir de forma independiente, aunque varios se construyen sobre los anteriores.

El punto de partida es siempre el escenario `platooning`, descrito en la sección [Arquitectura](arquitectura.md).

??? abstract "Casos implementados"

    1. Cambios en la potencia de transmisión de los autos
    2. Uso del FER para simular pérdida artificial de paquetes
    3. Creación de un nuevo perfil de aceleración y velocidad del líder
    4. Uso de más de un pelotón
    5. Introducción de retardo estocástico de comunicación
    6. Implementación de un event-triggered control sobre el envío de frames
    7. Simulaciones con ETC y retardo en conjunto

---

## Caso 1 · Potencia de transmisión

**Qué se hizo.** Variar la potencia de transmisión de la radio 802.11p de los vehículos del pelotón, barriendo varios valores en simulaciones sucesivas.

**Para qué.** La potencia determina el alcance efectivo de la comunicación. Al reducirla, los vehículos más alejados dentro del pelotón dejan de recibir los mensajes del líder de forma confiable, y el controlador cooperativo empieza a operar con información incompleta. El objetivo es encontrar a partir de qué punto la degradación de la red se traduce en degradación del control, y si el pelotón mantiene la estabilidad.

**Cómo se implementa.** La potencia se fija como parámetro de la interfaz de red (`nic`) de cada nodo desde `omnetpp.ini`, sin tocar código C++. Como el efecto depende también de la sensibilidad del receptor y del modelo de propagación, ambos deben quedar fijos para que la potencia sea la única variable.

```ini
# PENDIENTE: parámetro de potencia de transmisión y valores del barrido
```

**Cómo se mide.** Tres indicadores en conjunto: la tasa de recepción de mensajes por vehículo, que muestra el efecto en la red; el error de espaciamiento respecto de la distancia objetivo, que muestra el efecto en el control; y la distancia real entre vehículos a lo largo del tiempo, que muestra si hubo riesgo de colisión.

---

## Caso 2 · Pérdida artificial de paquetes con FER

**Qué se hizo.** Introducir una tasa de error de trama (*Frame Error Rate*) configurable, que descarta mensajes recibidos con una probabilidad fija antes de entregarlos a la capa superior.

**Para qué.** Es la contraparte metodológica del caso 1. Con potencia, la pérdida depende de la distancia, del modelo de propagación y de la posición del vehículo en el pelotón, o sea que la variable independiente no está bajo control directo. Con FER, la pérdida se fija como un número y es idéntica para todos los vehículos. Eso permite responder la pregunta pura: cuánta pérdida tolera el controlador, sin que la geometría del escenario contamine el resultado.

**Cómo se implementa.** Se descarta la trama recibida con probabilidad configurable, en el punto del camino de recepción donde el mensaje ya llegó íntegro pero todavía no fue procesado por la aplicación. La probabilidad se expone como parámetro para poder barrerla desde `omnetpp.ini`.

```ini
# PENDIENTE: parámetro de FER y valores del barrido
```

**Cómo se mide.** Error de espaciamiento en función del FER, y el valor de FER a partir del cual el pelotón deja de ser estable. Conviene contrastar el resultado con el del caso 1: si ambos coinciden al traducir potencia a pérdida efectiva, el modelo es consistente.

---

## Caso 3 · Nuevo perfil de aceleración y velocidad del líder

**Qué se hizo.** Definir una trayectoria propia para el vehículo líder, en lugar de usar los perfiles que trae Plexe (aceleración sinusoidal y frenada de emergencia).

**Para qué.** El líder es la entrada del sistema: todo el pelotón reacciona a lo que él hace. Los perfiles incluidos sirven para demostraciones, pero no necesariamente someten al controlador a la maniobra que interesa estudiar. Un perfil propio permite provocar condiciones específicas, como una aceleración sostenida, una secuencia de maniobras encadenadas, o un patrón que reproduzca datos reales de conducción.

**Cómo se implementa.** Plexe organiza el comportamiento del líder en clases de escenario. Hay dos caminos: crear una clase nueva que herede de la clase base de escenario e imponga la aceleración deseada en cada paso de simulación, o alimentar el perfil desde un archivo externo y hacer que el líder lo siga punto por punto. El primero da control analítico, el segundo permite reproducir trayectorias medidas.

```ini
# PENDIENTE: selección del escenario nuevo y sus parámetros
```

**Cómo se mide.** Velocidad y aceleración del líder superpuestas a las de los seguidores, para ver la propagación de la maniobra a lo largo del pelotón, y el error de espaciamiento durante los transitorios, que es donde el controlador se pone a prueba.

---

## Caso 4 · Más de un pelotón

**Qué se hizo.** Simular dos o más pelotones circulando simultáneamente en el mismo escenario.

**Para qué.** El canal inalámbrico es compartido. Con un solo pelotón, la ocupación del canal es baja y la comunicación casi nunca es el cuello de botella. Al agregar un segundo pelotón, ambos compiten por el medio: aumentan las colisiones de paquetes y los tiempos de espera, y aparece un efecto que no existe en el caso aislado. Es la situación que se dará en una carretera real.

**Cómo se implementa.** Se aumenta el número de vehículos y se les asigna identificador de pelotón y formación por separado, de modo que cada uno reconozca a su propio líder y descarte los mensajes del otro grupo. Cada pelotón puede llevar además su propio controlador y su propio perfil de líder, lo que permite comparar configuraciones dentro de una misma simulación.

```ini
# PENDIENTE: configuración de dos pelotones y asignación de líderes
```

**Cómo se mide.** Ocupación del canal y tasa de colisiones de paquetes como indicadores de red, y estabilidad de cada pelotón por separado como indicador de control. La comparación relevante es contra la misma configuración con un solo pelotón.

---

## Caso 5 · Retardo estocástico de comunicación

**Qué se hizo.** Introducir una latencia aleatoria en la entrega de los mensajes, muestreada de una distribución de probabilidad en lugar de ser un valor fijo.

**Para qué.** Los controladores cooperativos usan la información del líder para anticiparse, así que son directamente sensibles al retardo: si el dato llega tarde, la acción de control se calcula sobre un estado que ya cambió. Un retardo constante es fácil de compensar y no representa una red real, donde la latencia varía mensaje a mensaje. Un retardo estocástico obliga al controlador a operar con incertidumbre temporal, que es la condición realista.

**Cómo se implementa.** Cada mensaje recibe un retardo extra muestreado de una distribución configurable antes de ser entregado. La distribución y sus parámetros se exponen en `omnetpp.ini` para poder barrer el retardo medio y su dispersión de forma independiente.

```ini
# PENDIENTE: distribución del retardo y valores del barrido
```

**Cómo se mide.** Error de espaciamiento en función del retardo medio, y determinación del retardo máximo tolerable antes de perder la estabilidad. Hay que fijarse en la relación entre el retardo y el intervalo de envío de mensajes: cuando el retardo se acerca al período de envío, la información llega esencialmente obsoleta.

---

## Caso 6 · Event-triggered control sobre el envío de frames

**Qué se hizo.** Reemplazar el envío periódico de mensajes por un envío condicionado: el vehículo transmite solo cuando una condición de disparo, evaluada localmente, se cumple.

**Para qué.** En el esquema periódico habitual, todos los vehículos transmiten a intervalo fijo, esté pasando algo o no. Eso desperdicia canal cuando el pelotón circula estable, y es justamente cuando hay maniobras que se necesitaría más información. El control disparado por eventos invierte la lógica: la transmisión se gasta cuando aporta. El objetivo es reducir la carga de canal sin degradar el desempeño del control, y cuantificar ese intercambio.

**Cómo se implementa.** Cada vehículo evalúa en cada paso una función de error entre el estado que tiene y el que comunicó por última vez. Si ese error supera un umbral, transmite y reinicia la referencia. El umbral es el parámetro que gobierna todo el comportamiento: muy alto deja de comunicar y el control se degrada, muy bajo degenera en el caso periódico. Suele ser necesario imponer además un tiempo mínimo entre transmisiones para evitar ráfagas.

```ini
# PENDIENTE: parámetros de la condición de disparo y del umbral
```

**Cómo se mide.** Cuatro indicadores, y los dos primeros son los que dan sentido al caso: el número total de mensajes enviados, que mide el ahorro; el tiempo entre eventos consecutivos y su distribución, que muestra cómo se reparte el esfuerzo de comunicación en el tiempo; el error de espaciamiento, que verifica que el control no se degradó; y la comparación directa contra el esquema periódico con el mismo desempeño de control, que es la que permite afirmar cuánto se ahorró.

---

## Caso 7 · ETC y retardo en conjunto

**Qué se hizo.** Combinar los casos 5 y 6, activando simultáneamente el control disparado por eventos y el retardo estocástico de comunicación.

**Para qué.** Los dos efectos no se suman de forma independiente, y ahí está el interés. El mecanismo de disparo decide cuándo transmitir a partir del error entre el estado propio y el último comunicado, pero si los mensajes llegan con retardo variable, esa referencia está desactualizada en el receptor. El resultado es que el disparo puede ocurrir tarde, o dispararse de más al intentar corregir información vieja. Evaluar cada mecanismo por separado no permite anticipar el comportamiento conjunto.

**Cómo se implementa.** Se activan ambos mecanismos y se barren las dos variables en conjunto: el umbral de disparo y el retardo medio. Como es un barrido en dos dimensiones, el número de simulaciones crece rápido, así que conviene lanzarlo mediante un script que recorra la grilla de combinaciones sin intervención manual.

```ini
# PENDIENTE: configuración conjunta y definición de la grilla del barrido
```

**Cómo se mide.** El resultado natural es una superficie en dos dimensiones: desempeño en función del umbral y del retardo. Lo que interesa localizar es la frontera de estabilidad, es decir la curva que separa las combinaciones viables de las que hacen inestable al pelotón, y comprobar si el ahorro de comunicación que el ETC lograba sin retardo se mantiene cuando el retardo aparece.
