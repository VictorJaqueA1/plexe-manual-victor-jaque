# Instalación

Esta guía cubre la instalación completa de Plexe y todas sus dependencias en **Ubuntu 24.04** (incluyendo WSL).

Si solo quieres probar Plexe rápidamente sin instalar nada, revisa la [ruta rápida](#ruta-rapida-instant-plexe) al final de esta página.

---

## Visión general

Plexe no es un programa único: es un ecosistema de cuatro componentes que se instalan en orden, porque cada uno depende del anterior:

| Orden | Componente | Versión | Qué hace |
|:-----:|------------|---------|----------|
| 1 | **OMNeT++** | 6.2 | Motor de simulación de redes |
| 2 | **SUMO** | ≤ 1.22.0 | Simulador de tráfico vehicular |
| 3 | **Veins** | 5.3.1 | Capa de comunicación vehicular (V2V) |
| 4 | **Plexe** | 3.2 | Extensión para platooning cooperativo |

!!! warning "Versión de SUMO"
    No instales una versión de SUMO superior a **1.22.0**. Las versiones más nuevas usan una API que no es compatible con Veins 5.3.1.

---

## Paso 0 — Dependencias del sistema

Instala todas las librerías y herramientas necesarias:

```bash
sudo apt install -y make diffutils pkg-config ccache clang lld gdb lldb \
  bison flex perl sed gawk \
  python3 python3-pip python3-venv python3-dev \
  libxml2-dev zlib1g-dev doxygen graphviz xdg-utils libdw-dev \
  qt6-base-dev qt6-base-dev-tools qmake6 libqt6svg6 qt6-wayland \
  libwebkit2gtk-4.1-0 r-base
```

---

## Paso 1 — OMNeT++ 6.2

OMNeT++ es el motor sobre el que corre todo lo demás.

### 1.1 Descargar

Descarga OMNeT++ 6.2 desde [omnetpp.org](https://omnetpp.org/) y descomprime en `~/src/`:

```bash
cd ~/src
tar xvf omnetpp-6.2-linux-x86_64.tgz
```

### 1.2 Configurar el entorno

```bash
cd ~/src/omnetpp-6.2
source setenv
```

!!! tip "setenv"
    El comando `source setenv` configura las variables de entorno necesarias (como `PATH`). Debes ejecutarlo **cada vez que abras una terminal nueva**, o agregarlo a tu `~/.bashrc` para que sea automático.

### 1.3 Compilar

```bash
./configure
make -j $(nproc)
```

`$(nproc)` usa todos los núcleos de tu CPU para compilar más rápido. La compilación puede tomar varios minutos.

### 1.4 Verificar

Ejecuta el IDE para confirmar que funciona:

```bash
omnetpp
```

---

## Paso 2 — SUMO ≤ 1.22.0

SUMO es el simulador de tráfico que genera el movimiento de los vehículos.

Instálalo siguiendo las instrucciones oficiales en [sumo.dlr.de](https://sumo.dlr.de/docs/Installing/index.html). Asegúrate de que la versión instalada sea **1.22.0 o inferior**.

Verifica la versión instalada:

```bash
sumo --version
```

---

## Paso 3 — Veins 5.3.1

Veins es la capa de comunicación vehicular que conecta OMNeT++ con SUMO.

### 3.1 Descargar y descomprimir

Descarga Veins 5.3.1 desde [veins.car2x.org](http://veins.car2x.org/) y descomprime en `~/src/`:

```bash
cd ~/src
tar xvf veins-5.3.1.tgz
```

### 3.2 Compilar

```bash
cd ~/src/veins-veins-5.3.1
./configure
make -j $(nproc)
```

---

## Paso 4 — Plexe 3.2

Plexe es la extensión que agrega la funcionalidad de platooning.

### 4.1 Descargar

Clona el repositorio desde GitHub:

```bash
cd ~/src
git clone -b plexe-3.2 https://github.com/michele-segata/plexe.git
```

### 4.2 Compilar

```bash
cd ~/src/plexe
./configure --with-veins=../veins-veins-5.3.1
make -j $(nproc)
```

El flag `--with-veins` le indica a Plexe dónde encontrar Veins. Ajusta la ruta si tu carpeta de Veins tiene otro nombre.

---

## Paso 5 — R y Python (para análisis de resultados)

Estos paquetes no son necesarios para correr simulaciones, pero sí para graficar y analizar los resultados.

### R

Abre R e instala los paquetes:

```r
install.packages(c("ggplot2", "data.table"))
```

### Python

```bash
pip install --user pandas scipy matplotlib
```

---

## Ruta rápida: Instant Plexe

Si no quieres instalar cada componente por separado, puedes descargar **Instant Plexe**: una máquina virtual (archivo `.ova`) con todo preinstalado y listo para usar.

1. Descarga el archivo `.ova` desde la [página de descargas de Plexe](https://plexe.car2x.org/download/).
2. Impórtalo en [VirtualBox](https://www.virtualbox.org/) (Archivo → Importar servicio virtualizado).
3. Inicia la máquina virtual. Todo está configurado.

!!! note "Versión disponible"
    Al momento de escribir este manual, Instant Plexe está disponible para la **versión 3.0** (con OMNeT++ 5.6.2, Veins 5.1, SUMO 1.7.0). Para la versión 3.2 se requiere instalación manual.

---

## Otros sistemas operativos

Este manual se centra en Ubuntu 24.04. Si necesitas instalar Plexe en **macOS** o **Windows**, consulta la [guía oficial de compilación](https://plexe.car2x.org/building/).
