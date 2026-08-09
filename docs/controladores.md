# Controladores

Plexe incluye varios controladores longitudinales cooperativos listos para usar.

## Ejemplo: configuración de CACC en `omnetpp.ini`

=== "CACC"

    ```ini
    *.node[*].scenario.controller = "CACC"
    *.node[*].scenario.caccC1 = 0.5
    *.node[*].scenario.caccXi = 1
    *.node[*].scenario.caccOmegaN = 0.2 Hz
    ```

=== "PLOEG"

    ```ini
    *.node[*].scenario.controller = "PLOEG"
    *.node[*].scenario.ploegH = 0.5 s
    *.node[*].scenario.ploegKp = 0.2
    *.node[*].scenario.ploegKd = 0.7
    ```

=== "CONSENSUS"

    ```ini
    *.node[*].scenario.controller = "CONSENSUS"
    ```

!!! note "Copiar código"
    Pasa el cursor sobre cualquier bloque de código y aparece un botón para copiar al portapapeles.

*Sección en construcción — se documentará cada controlador en detalle.*
