import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/api';
import { getSetsCount } from '../services/utils.ts';
import * as echarts from 'echarts';

import DataTable from './DataTable';
import Summary from './Summary';
import FilterBar from './FilterBar';
import DashboardCard from './DashboardCard';
import Spinner from "./Spinner";
import BarChart from './BarChart';
import Treemap from './Treemap';
import Scatterplot from './Scatterplot';

import { Card, SetInfo } from '../services/types.ts';

function Dashboard() {
  const [data, setData] = useState<{ cards: Card[] | [], globalSets: SetInfo[] | [] }>({
      cards: [],
      globalSets: [],
  });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<string | null>(null);
  const [filters, setFilters] = useState({
      energyType: 'All',
      rarity: 'All',
      legality: 'All'
  });

  const handleFilterChange = (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    fetchDashboardData().then((res) => {
        setData(res);
        setLoading(false);
    });

    // Fetch & register echarts theme
    fetch('/assets/essos.json')
        .then(response => response.json())
        .then(themeJson => {
            echarts.registerTheme("essos", themeJson);
            setTheme("essos");
        });
  }, []);

  const filteredCards = data.cards.filter((card) => (
     (filters.energyType === "All" || card.types?.includes(filters.energyType)) &&
     (filters.rarity === 'All' || card.rarity?.includes(filters.rarity)) &&
     (filters.legality === "All" || card.legalities?.[filters.legality as keyof typeof card.legalities] === "Legal")
  ));


  return (
    <div className='h-screen flex flex-col font-mono px-4 pb-4 mx-auto'>
        {loading ? (
            <div className="flex-1 flex items-center justify-center w-full">
                <Spinner />
            </div>
        ) : (
            <>
        <header className="w-full py-4 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold flex items-end"><img src="/assets/logo.svg" alt="Pokémon" className="h-10 mr-2" /> Card Collection</h1>
                <a href="/" className="flex items-center gap-1">
                    <img className="w-6 h-6 rounded-full" src="/assets/ash-avatar.jpg" alt="Rounded avatar"/>
                    Ash Ketchum
                </a>
            </div>
        </header>
        <div className="flex overflow-hidden gap-4">

            <aside className="flex">
                <DashboardCard className="flex flex-col h-full gap-8">
                    <Summary cards={data.cards}/>
                    <FilterBar filters={filters} onChange={handleFilterChange}/>

                    <footer className="w-full mt-auto text-xs text-gray-500">
                        <p>
                            Source <a href="https://docs.pokemontcg.io/" target="_blank" className="text-blue-500 hover:underline">Pokémon
                            TCG API</a>
                        </p>
                        <p>Created by <a href="https://github.com/KatjaLeonteva/pokemon" target="_blank"
                                         className="text-blue-500 hover:underline">Ekaterina Leonteva</a></p>
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                    </footer>
                </DashboardCard>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div className="grid grid-rows-2 gap-4 h-full">
                    {/* Row 1: Charts */}
                    <div className="grid grid-cols-4 gap-4">
                        <DashboardCard title="Cards by supertype">
                            <p className="text-sm text-gray-600">Click on category to drilldown</p>
                            <BarChart cards={filteredCards} theme={theme} />
                        </DashboardCard>
                        <DashboardCard title="Top 10 sets">
                            <p className="text-sm text-gray-600">Total sets owned {getSetsCount(data.cards)} of {data.globalSets.length}</p>
                            <Treemap cards={data.cards} globalSets={data.globalSets} theme={theme}/>
                        </DashboardCard>
                        <DashboardCard className="col-span-2" title="Power distribution">
                            <Scatterplot cards={filteredCards} theme={theme}/>
                        </DashboardCard>
                    </div>

                    {/* Row 2: Table */}
                    <DashboardCard className="row-span-1 flex-1 overflow-auto" title="Collection details">
                        <p className="text-sm text-gray-600">Showing {filteredCards.length} unique cards of total {data.cards.length}</p>
                        <DataTable cards={filteredCards}/>
                    </DashboardCard>
                </div>
                    </main>

        </div>
            </>
        )}
    </div>
  )
}

export default Dashboard
