# Suburbia Skate App

![suburbia](https://github.com/user-attachments/assets/9534cc9c-d60b-4116-ac35-12f39b5b069e)

## About

**Suburbia Skate** is an engaging web application crafted for skateboard enthusiasts and the broader skating community. The project combines modern web technologies to create a dynamic and highly interactive user experience. The platform allows users to explore skateboarding-related content, whether it’s for learning skateboarding tricks, finding skate areas, or simply connecting with the skating community.

It’s designed to embody the creative and free-spirited nature of skateboarding while ensuring a polished digital experience for visitors and users.

---

## Description

Suburbia Skate provides a space to explore, connect, and enjoy skateboarding culture, all online. The application's adaptable structure and finely tuned UI ensure it maintains compatibility across devices, allowing users to interact smoothly with its content. Written with maintainability and performance in mind, it leverages modern tools in web development, offering both a seamless developer and user experience.

The core purpose is not just delivering content but also creating a unique and visually pleasing platform to showcase the skateboarding lifestyle.

---

## Tech Stack

The application has been built using a modern and reliable tech stack to ensure scalability, performance, and developer efficiency.

### Frontend

- **[TypeScript](https://www.typescriptlang.org/):** To ensure type safety and better development practices.
- **[React](https://reactjs.org/) (v19.0.0):** A powerful library for building interactive user interfaces.
- **[Next.js](https://nextjs.org/) (v15.1.6):** A React-based framework for server-side rendering (SSR) and static site generation.
- **[Tailwind CSS](https://tailwindcss.com/) (v3.4.1):** For styling, enabling rapid and highly customizable design.

### State Management

- **[Zustand](https://docs.pmnd.rs/zustand/introduction) (v5.0.3):** A state management library for managing and updating application states.

### 3D & Animations

- **[Three.js](https://threejs.org/) (v0.173.0):** A library to add captivating 3D visualization and objects.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (v9.0.0):** Integrates Three.js seamlessly into React applications.
- **[gsap](https://greensock.com/gsap/) (v3.12.7):** Used to create polished and performant animations.
- **[React Drei](https://docs.pmnd.rs/drei/introduction) (v9.x):** Tools for extending Three.js capabilities in React apps.

### Backend/Headless CMS

- **[Prismic CMS](https://prismic.io/):** Used for managing content with its powerful REST API.
  - Libraries used: 
    - **[@prismicio/react](https://prismic.io/docs/technologies/react)** (v3.0.0) 
    - **[@prismicio/client](https://prismic.io/docs/technologies/client)** (v7.16.0)
    - **[@prismicio/next](https://prismic.io/docs/technologies/nextjs)** (v2.0.0)

### Other Tools & Libraries
- **[Fluid Tailwind](https://fluid.training/#/):** For dynamic, responsive styling capabilities.
- **[Prettier](https://prettier.io/):** For consistent code formatting.
- **[ESLint](https://eslint.org/):** Ensuring code quality and linting support.

> **Note:** The application is managed using npm as a package manager.

---

## Features

1. **Dynamic Content Rendering:**
   - Leveraging **Prismic CMS** for easily managing and delivering dynamic content via APIs.

2. **Interactive and Immersive Design:**
   - Built with **React**, **Tailwind CSS**, and **GSAP/Three.js** for a visually captivating user experience.
   - Supports complex animations and 3D interactions for an immersive design.

3. **Optimized Performance:**
   - Uses **Next.js** for server-side rendering and optimized static site generation, improving load times and SEO.

4. **Responsive and Accessible:**
   - Designed using **Tailwind CSS** and modern design principles for fully responsive layouts across devices.

5. **State Management with Efficiency:**
   - State updates and management powered by **Zustand**, ensuring lightweight and efficient state handling.

6. **Developer Focused:**
   - Structured with **TypeScript** for type-safe, maintainable code.
   - Configured with **Prettier** and **ESLint** for a clean and standardized codebase.

7. **3D Integration:**
   - Harnesses the power of **Three.js** and **React Three Fiber** to provide striking 3D visuals.

---

## Installation & Running

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v7+ recommended)

### Setup

1. Clone the repository:
```shell script
git clone <repository_url>
   cd suburbia-skate
```

2. Install dependencies:
```shell script
npm install
```

3. Start the development server:
```shell script
npm run dev
```

4. Open `http://localhost:3000` in your browser to access the application.

---

Feel free to dive into the codebase and contribute to make Suburbia Skate better. If you're a skateboarding enthusiast or developer with an eye for creative and immersive web experiences, this is the perfect project for you!
