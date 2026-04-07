# 🚀 Landings Pages - Pixel Forge Software

Repositorio centralizado para el desarrollo de **landing pages de tickets bajos**.

La estructura está pensada para escalar múltiples clientes de forma rápida, ordenada y reutilizable.

---

## 📁 Estructura del proyecto

Cada cliente/proyecto tiene su propia carpeta bajo el siguiente formato:

```
landing_nombre_del_negocio/
```

### Ejemplo:

```
landing_zapateria_paso_a_paso/
landing_barberia_lopez/
landing_gimnasio_fitness_center/
```

Dentro de cada carpeta se desarrolla de forma independiente la landing correspondiente.

---

## 🧱 Estructura interna recomendada

Cada landing debería seguir esta base:

```
landing_nombre_del_negocio/
│
├── index.html
├── /assets
│   ├── /img
│   ├── /icons
│   └── /fonts
│
├── /styles
│   └── styles.css
│
├── /scripts
│   └── main.js
│
└── README.md (opcional del cliente)
```

---

## ⚙️ Flujo de trabajo

1. Crear una nueva carpeta para el cliente:

```
landing_nombre_del_negocio
```

2. Cargar contenido base:

* Imágenes
* Textos
* Identidad visual

3. Desarrollar la landing respetando:

* Diseño responsive
* Optimización de carga
* Buenas prácticas SEO básicas

4. Testear:

* Mobile first
* Links (WhatsApp, redes, etc.)
* Formularios (si aplica)

5. Subir cambios:

```
git add .
git commit -m "Landing nombre_del_negocio terminada"
git push
```

---

## 🎯 Objetivo

Desarrollar landings simples, efectivas y rápidas de implementar, enfocadas en:

* Conversión (WhatsApp / contacto)
* Claridad de oferta
* Velocidad de entrega

---

## 📌 Consideraciones

* No sobrecomplicar: son proyectos de ticket bajo
* Priorizar velocidad + claridad sobre perfección
* Reutilizar componentes entre proyectos
* Mantener consistencia visual

---

## 📞 Integraciones comunes

* Botón de WhatsApp
* Google Maps
* Instagram/Facebook
* Botones de llamada

---

## 🧩 Escalabilidad

Este repositorio permite:

* Manejar múltiples clientes en paralelo
* Reutilizar código entre landings
* Mantener orden sin necesidad de múltiples repositorios

---

## 🏷️ Convención de nombres

Siempre usar:

```
landing_nombre_del_negocio
```

Ejemplo correcto:

```
landing_zapateria_paso_a_paso
```

Ejemplo incorrecto:

```
proyecto1
landingNueva
clienteJuan
```

---

## 👨‍💻 Equipo

Pixel Forge Software
