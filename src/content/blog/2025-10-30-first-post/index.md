---
title: 'De perf a eBPF: evolución del análisis de rendimiento en Linux'
slug: 'first-post'
description: 'Cómo perf se convirtió en la base del análisis de rendimiento en Linux y cómo eBPF amplía sus capacidades. Un recorrido desde la caracterización de carga de trabajo hasta la observabilidad moderna.'
tags: ["Linux", "perf", "eBPF", "Optimización", "Observabilidad", "Seguridad" ]
pubDate: '2025-10-30'
coverImage: './blog-placeholder-1.jpg'
---

## Cómo medir y optimizar el rendimiento en Linux con _perf_ (y por qué _eBPF_ es el futuro)

Cuando realicé mi trabajo de grado en ingeniería electrónica, usé una herramienta en desarrollo llamada **perf** para medir el consumo de recursos computacionales de un sistema basado en Linux y caracterizar su carga de trabajo. La última conclusión a la que llegué sugería un trabajo futuro usando una tecnología llama eBPF, bienvenido al futuro. Pero antes:

---

### 🧠 ¿Qué es _perf_ y para qué se usa?

**perf** es un subsistema de Linux que permite recolectar datos de desempeño como: latencias, llamadas al sistema, consumo de CPU, fallos de caché, entre otros. Es especialmente útil para identificar cuellos de botella en aplicaciones críticas o sistemas embebidos donde cada ciclo de CPU cuenta.

**Características principales:**
- Recopila información sobre el uso de CPU, memoria, disco y red.
- **Modos de funcionamiento:**
  - **perf**: muestra una lista con los comandos más usados y su descripción.
  - **perf stat**: cuenta eventos y muestra estadísticas generales como ciclos de CPU, instrucciones ejecutadas o fallos de página.
  - **perf record**: toma muestras de desempeño y guarda la información en perf.data para análisis detallado con perf report o perf script.
  - **perf top**: para monitorización del sistema en tiempo real.
  - **perf list**: muestra todos los puntos en los que perf puede obtener datos, por ejemplo _perf list hw_ muestra los eventos de hardware que se pueden monitorear y _perf list sw_ los eventos de software. 
- **Perfilado de pila (stack traces):** permite reconstruir los caminos de ejecución de una aplicación (call graphs) y detectar cuellos de botella en funciones específicas.
- **Fuentes de eventos:** **perf** obtiene información de contadores de hardware, eventos de software y tracepoints definidos en el kernel.

> 💡 Consejo técnico: para obtener perfiles precisos, es fundamental compilar el código con _-fno-omit-frame-pointer_, de modo que las trazas de pila sean completas.


---

### 🔍 Ejemplos de uso de _perf_
**Ejemplo básico:**
Muestra en tiempo real los procesos que consumen más CPU.
```bash
sudo perf top
```
**Ejemplo de análisis de rendimiento (_profiling_) completo**:

```bash
perf record -e cycles,instructions ./mi_programa
sudo perf report
```

En éste caso, estamos ejecutando _mi_programa_ mientras se almacena información sobre los ciclos de CPU consumidos y las instrucciones ejecutadas por _mi_programa_ hasta que presionamos Ctrl+C. Esta información se guarda en un archivo llamado perf.data en el directorio actual, el cual se puede analizar con perf report. Al usar el análisis completo se pueden generar archivos muy grandes que generan consumo de CPU y memoria además esta herramienta limita el alcance de los tipos de datos que se pueden recopilar y los formatos. Aquí es donde entra en juego eBPF.

---

### ⚙️ De perf a eBPF

eBPF es una tecnología que permite ejecutar programas en el nivel privilegiado del kernel sin necesidad de agregar módulos ni cambiar el código fuente del núcleo. Para hacer una analogía, eBPF es al kernel algo similar a lo que es JavaScript para la web, permite extender las funcionalidades del núcleo de Línux. Los programas eBPF se controlan por eventos y se ejecutan cuando el kernel o una aplicación pasa por un determinado punto llamado _hook_ éstos puntos incluyen llamadas al sistema, todos los puntos donde se puede recoger información con **perf**, eventos de red y muchos más.

Hoy perf se complementa y en algunos casos se integra con eBPF, una tecnología que permite ejecutar código seguro en el kernel de Linux, ideal para monitorización, _tracing_ y _profiling_ avanzado sin recompilar ni detener el sistema.


### 🚀 Lo que viene: tutoriales y ejemplos con _eBPF_

Estoy preparando un **blog** con una serie de artículos y tutoriales prácticos bilingües sobre **eBPF** donde exploraremos:

- Qué es y cómo usar **eBPF**.
- Cómo crear programas **eBPF** simples.
- Casos de uso de **eBPF**.

El objetivo es **hacer accesible eBPF en español**, con ejemplos y explicaciones claras que sirvan a la comunidad.
Si te interesa éste tema te invito a explorar los próximos artículos. 

---

### 📚 Bibliografía y recursos recomendados

- **Brendan Gregg — _perf Examples_**  
    [https://www.brendangregg.com/perf.html](https://www.brendangregg.com/perf.html)  
    
- **eBPF Foundation — _What is eBPF?_**  
    [https://ebpf.io/what-is-ebpf/](https://ebpf.io/what-is-ebpf/)  

---

