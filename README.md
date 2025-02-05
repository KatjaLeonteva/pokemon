# Ash’s Pokémon Card Collection Assignment

The dahsboard is aimed to help Ash to explore and understand his Pokémon card collection. 

## Tech
- **React + TypeScript + Vite** → provides a fast, minimal, and type-safe setup. React for component-based UI development. TypeScript for type safety and better code maintainability. Vite for fast builds, HMR (Hot Module Replacement), and an optimized ESM-based dev server.
- **Tailwind CSS** → a utility-first CSS framework that makes styling faster and more maintainable. Enables responsive, reusable, and modern UI styling without writing custom CSS files. Treeshaking removes unused styles, reducing final bundle size.
- **Echarts** → a data visualization library. Supports interactive charts with smooth animations. Optimized for large datasets, making it ideal for dashboard analytics. Works well with React to dynamically update charts based on data.

## Setup instructions

### Open the Dashboard
To see the deployed project please visit:  
🔗 [Live demo](https://github.com/)

### To run project locally

Before starting, ensure you have installed Node.js and npm.

1. Clone the repository
```
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies
```
npm install
```

3a. Start the development server
```
npm run dev
```

3b. Or generate an optimized production build and run it on a local server
```
npm run build
npm run preview
```

The app will be available at http://localhost:5173/  
*(Port may vary depending on system availability)*

### Project structure
```
/src
│── /assets          # Local JSON data, images
│── /components      # UI components (Charts, Tables, Cards)
│── /charts          # ECharts components
│── /services        # API calls & data fetching logic
│── /styles          # Global styles (Tailwind)
│── App.tsx          # Main App Component
│── main.tsx         # Entry point
│── vite.config.ts   # Vite Configuration
```
## Approach and trade-offs

### Navigating the dashboard
📊 Summary → See key statistics.  
📈 Charts → Interactive charts display important metrics.  
📑 Table → Browse detailed view of the collection with sorting and filtering options.  

### Approach
Lorem ipsum

### Trade-offs
Lorem ipsum

## Unimplemented features
- Lorem ipsum
- Lorem ipsum
