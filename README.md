# 🚀 Cuentos Mágicos IA

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC) ![Gemini AI](https://img.shields.io/badge/Gemini-3.0-8E75B2) ![ElevenLabs](https://img.shields.io/badge/ElevenLabs-V2-orange)

**Cuentos Mágicos IA** es una aplicación web increíblemente estética diseñada para crear experiencias narrativas únicas para niños. Utilizando la potencia de **Google Gemini 3** para la generación de historias y **ElevenLabs** para una narración de voz ultra-realista con acento latino.

## ✨ Características Principales

### 🎨 UI/UX "Mind-blowing"

- **Glassmorphism Premium**: Interfaz flotante con efectos de desenfoque (`backdrop-blur-xl`) y bordes sutiles.
- **Temas Dinámicos**:
  - 🌙 **Modo Galaxia**: Fondo oscuro profundo con estrellas animadas y gradientes violetas.
  - ☁️ **Modo Nubes**: Tonos pasteles suaves y flotantes para un día relajado.
- **Animaciones Suaves**: Micro-interacciones con `framer-motion` en botones, transiciones de tarjetas y carga.

### 🤖 Inteligencia Artificial Avanzada

- **Generación de Historias**: Conectado a **Gemini 2.5 Flash** (Gemini 3 Tech) para crear cuentos creativos, seguros y personalizados en segundos.
- **Narración de Voz Pro**: Integración con **ElevenLabs Multilingual v2** utilizando voces optimizadas (Bill) para una narración cálida y con perfecto acento latino.

### 🛠️ Componentes Pro

- **Input de Edad Custom**: Sistema de entrada numérico personalizado sin los antiestéticos controles nativos del navegador.
- **Iconografía Temática**: Iconos dinámicos de `lucide-react` para cada temática (Cohetes, Dinosaurios, Castillos, etc.).

---

## 🚀 Cómo Instalar

Sigue estos pasos para desplegar el proyecto en tu máquina local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ai-cuentos-infantiles.git
cd ai-cuentos-infantiles
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade tus claves de API:

```env
# Google AI Studio (Gemini)
GEMINI_API_KEY=tu_clave_de_gemini_aqui

# ElevenLabs (Voice Synthesis)
ELEVENLABS_API_KEY=tu_clave_de_elevenlabs_aqui
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador y ¡empieza a crear magia!

---

## 🛠️ Tecnologías

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **AI Core**: Google Generative AI SDK & ElevenLabs API

---

Desarrollado con ❤️ por **Mateo Lopez Pagani**.
