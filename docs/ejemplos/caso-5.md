# Caso 5 · Nuevo perfil de aceleración y velocidad del líder

**Qué se hizo.** Definir una trayectoria propia para el vehículo líder, en lugar de usar los perfiles que trae Plexe (aceleración sinusoidal y frenada de emergencia).

**Para qué.** El líder es la entrada del sistema: todo el pelotón reacciona a lo que él hace. Los perfiles incluidos sirven para demostraciones, pero no necesariamente someten al controlador a la maniobra que interesa estudiar. Un perfil propio permite provocar condiciones específicas, como una aceleración sostenida, una secuencia de maniobras encadenadas, o un patrón que reproduzca datos reales de conducción.

**Cómo se implementa.** Plexe organiza el comportamiento del líder en clases de escenario. Hay dos caminos: crear una clase nueva que herede de la clase base de escenario e imponga la aceleración deseada en cada paso de simulación, o alimentar el perfil desde un archivo externo y hacer que el líder lo siga punto por punto. El primero da control analítico, el segundo permite reproducir trayectorias medidas.

```ini
# PENDIENTE: selección del escenario nuevo y sus parámetros
```

**Cómo se mide.** Velocidad y aceleración del líder superpuestas a las de los seguidores, para ver la propagación de la maniobra a lo largo del pelotón, y el error de espaciamiento durante los transitorios, que es donde el controlador se pone a prueba.
