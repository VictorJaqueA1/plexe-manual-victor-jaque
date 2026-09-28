# Caso 7 · Event-triggered control sobre el envío de frames

**Qué se hizo.** Reemplazar el envío periódico de mensajes por un envío condicionado: el vehículo transmite solo cuando una condición de disparo, evaluada localmente, se cumple.

**Para qué.** En el esquema periódico habitual, todos los vehículos transmiten a intervalo fijo, esté pasando algo o no. Eso desperdicia canal cuando el pelotón circula estable, y es justamente cuando hay maniobras que se necesitaría más información. El control disparado por eventos invierte la lógica: la transmisión se gasta cuando aporta. El objetivo es reducir la carga de canal sin degradar el desempeño del control, y cuantificar ese intercambio.

**Cómo se implementa.** Cada vehículo evalúa en cada paso una función de error entre el estado que tiene y el que comunicó por última vez. Si ese error supera un umbral, transmite y reinicia la referencia. El umbral es el parámetro que gobierna todo el comportamiento: muy alto deja de comunicar y el control se degrada, muy bajo degenera en el caso periódico. Suele ser necesario imponer además un tiempo mínimo entre transmisiones para evitar ráfagas.

```ini
# PENDIENTE: parámetros de la condición de disparo y del umbral
```

**Cómo se mide.** Cuatro indicadores, y los dos primeros son los que dan sentido al caso: el número total de mensajes enviados, que mide el ahorro; el tiempo entre eventos consecutivos y su distribución, que muestra cómo se reparte el esfuerzo de comunicación en el tiempo; el error de espaciamiento, que verifica que el control no se degradó; y la comparación directa contra el esquema periódico con el mismo desempeño de control, que es la que permite afirmar cuánto se ahorró.
