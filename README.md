# Ash’s Pokémon Card Collection Assignment

The dashboard is aimed to help Ash to explore and understand his Pokémon card collection. 

## Tech
- **React + TypeScript + Vite** → provides a fast, minimal, and type-safe setup. React for component-based UI development. TypeScript for type safety and better code maintainability. Vite for fast builds, HMR (Hot Module Replacement), and an optimized ESM-based dev server.
- **Tailwind CSS** → a utility-first CSS framework that makes styling faster and more maintainable. Enables responsive, reusable, and modern UI styling without writing custom CSS files. Treeshaking removes unused styles, reducing final bundle size. 
- **Echarts** → a data visualization library. Supports interactive charts with smooth animations. Optimized for large datasets, making it ideal for dashboard analytics. Works well with React to dynamically update charts based on data. [Essos theme](https://echarts.apache.org/en/theme-builder.html) for styling that features a vibrant yellow palette, reminiscent of Pikachu's iconic color scheme.

## Setup instructions

### Open the Dashboard
To see the deployed project please visit:  
🔗 [Live demo](https://katjaleonteva.github.io/pokemon/)

### To run the project locally

Before starting, ensure you have installed Node.js and npm.

1. Clone the repository
```
git clone https://github.com/KatjaLeonteva/pokemon.git
cd pokemon
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

## Approach and trade-offs

### Goals
A dashboard analyzing Ash's card collection can be useful for multiple purposes depending on what insights we extract from the data.
Possible use cases are:
1. Building different types of decks: know which cards are available and how they fit into a deck strategy  (e.g. type balance, synergy).
2. Identifying strong cards for competitive play: if Ash wants to play in tournaments he needs to know which cards are powerful and legal.
3. Collection progress and set completion: if Ash is collecting full sets he needs to know which cards are missing.
4. Deciding which cards to sell or replace: some cards increase in value and others are not useful for current deck strategy.

The assignment does not explicitly state Ash’s goal, but it mentions that he participates in Pokémon card trials.
I assume this means he is actively using his collection for gameplay rather than just collecting for value.
Therefore, the primary use cases likely are 1 and 2.

### Navigating the dashboard
For this purpose, the best type of dashboard is analytical, allowing users to see the big picture while also being able to explore detailed insights.

The dashboard includes following sections:  
📊 Summary → High-level statistics such as total number of cards, duplicates, sets count.  
📈 Charts → Visual breakdown of collection across different attributes using engaging interactive visualizations.  
📅 Table → A detailed sortable, filterable view of cards for in-depth analysis.  
🔎 Interactions → Apply filters to dynamically narrow down the dataset.

### Choice of charts

1. Understand the collection’s composition (how many Pokémon, Trainer, and Energy cards): Bar chart with drilldown
- Horizontal orientation for better readability of labels
- On click on Pokémon and Energy bar chart enables users to drill down from card supertypes to specific types (Grass, Water, etc.)
- Bars sorted by value, longest bar on the top
- Removed unnecessary grid lines (data-ink ratio rule)

2. Check card distribution across different sets (which sets are most represented in the collection): Treemap
- Show only top 10 sets (by number of cards owned) as total amount of sets owned is 121 and chart becomes cluttered
- Show context in subtitle (10 sets out of how many? how many exist in total?). Originally this information was in Summary section, but I decided to move it closer to related chart
- On hover show tooltip with collection name, cards owned and total cards
- (unimplemented) Color coding by collection completeness (sequential palette)

3. Identify the strongest cards (HP, Damage, Abilities) vs support vs energy: Scatterplot
- On hover show card image with attacks and abilities details
- To analyze card strength, HP should be compared with damage and abilities and categorized into Powerful (high HP + high damage) and Support (utility effects or Trainers).
But attack values are inconsistent due to multipliers ("10×", "20+"), conditions, or text-based effects.
Due to time constraints, HP vs. Converted Energy Cost was used instead, but this makes the chart less representative as many items overlap.

4. Legality for tournament play (rule formats) and card rarity - Table
- Filters apply dynamically to both the table and charts, therefore they are located in Summary section and not next to table
- (unimplemented) Multi-select in filters

### Project structure
The project is a single-page application with one main route.
The project follows a modular structure, with components, services, and styles separated for better organization and maintainability.

```
/public
│── /assets          # Images, ECharts theme
│── /data            # Local JSON data
/src
│── /components      # UI components (Charts, Tables, Cards)
│── /services        # API calls, external data fetching and processing
│── App.tsx          # Main App Component
│── main.tsx         # Entry point
│── vite.config.ts   # Vite Configuration
```

1. Get local data (`ash_collection.json`), show loading indicator while data is being retrieved.
2. Fetch external data (Pokémon TCG API) to enrich local data (e.g., adding sets information). Merge external data with local data before rendering UI.
3. Pre-process dataset: keep only unique cards (by card id) and add column with number of owned cards.
4. Compute derived values for charts and tables such as cards count, sets count, etc.
5. Update charts and tables based on user interactions (filters, selections).
6. State management is handled by React hooks `useState` and `useEffect`. No external state management (Redux, Zustand, etc.) is used as project complexity is low.
7. Filtered and processed data is computed in the parent component `Dashboard.tsx` and passed down as props to child components. Calculation logic is kept in separate utility functions to keep components clean.

### Trade-offs
- Chart readability: more advanced charts (e.g. treemaps, scatterplots) provide deeper insights but may be harder to interpret for casual users.
- Normally treemap is good for spotting the most and least represented categories quickly. But for this dataset values are very close to each other, making it difficult to distinguish differences between sets. With more time, I would experiment with alternative visualizations or KPIs to better represent card distribution across sets.
- Static vs. dynamic data: the dataset is enriched with set data from an external API during initial load. This increases startup time, and an alternative would be asynchronous loading, where charts update progressively. This would improve initial responsiveness but might introduce a loading state for charts.
- There is no single API endpoint that gives the total number of existing Pokémon TCG cards. Since Pokémon TCG does not change frequently, I decided to hardcode `globalTotalCards` value based on the latest API data to save time on loading.
- Currently, the chart components mix data processing and visualization logic in the same file. This means they both prepare the data and render the chart, which works for small projects but can cause issues as the project grows. A better approach would be to separate data processing into a separate file or service, keeping the chart components focused on rendering.

## Unimplemented features
### Product features
- Deck recommendations: suggest optimal decks based on available cards, considering playstyle preferences such as Aggro (fast attackers), Control (disruptive strategies), Spread Damage (multi-target attacks), and Tank/Stall (high-HP survival decks).
E.g. filter collection by archetype, recommend missing cards, etc.
- Card price tracking: show card values over time (requires external data source), suggest which duplicates are worth selling.
- Evolution tracking: identify which cards can evolve into or from others, helping with deck-building and collection progress.

### Technical features
- Cross-filtering: selections in table dynamically adjust other visualizations.
- Responsive design: optimize for mobile and tablet screens to improve usability.
- Accessibility: improve keyboard navigation and screen reader support.
- Error handling: show  user-friendly messages when API call fail.

