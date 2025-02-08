import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/api';
import { getSetsCount } from '../services/utils.ts';

import DataTable from './DataTable';
import Summary from './Summary';
import FilterBar from './FilterBar';
import DashboardCard from './DashboardCard';
import Spinner from "./Spinner";
import BarChart from './BarChart';
import Treemap from './Treemap';
import { Card, SetInfo } from '../services/types.ts';

function Dashboard() {
  const [data, setData] = useState<{ cards: Card[] | [], globalSets: SetInfo[] | [] }>({
      cards: [],
      globalSets: [],
  });
  const [loading, setLoading] = useState(true);

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
  }, []);

  const filteredCards = data.cards.filter((card) => (
     (filters.energyType === "All" || card.types?.includes(filters.energyType)) &&
     (filters.rarity === 'All' || card.rarity?.includes(filters.rarity)) &&
     (filters.legality === "All" || card.legalities?.[filters.legality as keyof typeof card.legalities] === "Legal")
  ));


  return (
    <div className='h-screen flex flex-col font-mono px-4 pb-4 container mx-auto'>
        {loading ? (
            <div className="flex-1 flex items-center justify-center w-full">
                <Spinner />
            </div>
        ) : (
            <>
        <header className="w-full py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl flex items-end"><img src="src/assets/logo.svg" alt="Pokémon" className="h-10 mr-2" /> Card Collection</h1>
                <a href="/" className="flex items-center gap-1">
                    <img className="w-6 h-6 rounded-full" src="src/assets/ash-avatar.jpg" alt="Rounded avatar"/>
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
                            Source <a href="https://docs.pokemontcg.io/" className="text-blue-500 hover:underline">Pokémon
                            TCG API</a>
                        </p>
                        <p>Created by <a href="https://github.com/KatjaLeonteva/pokemon"
                                         className="text-blue-500 hover:underline">Ekaterina Leonteva</a></p>
                        <p>Last updated: {new Date().toLocaleDateString()}</p>
                    </footer>
                </DashboardCard>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div className="grid grid-rows-2 gap-4 h-full">
                    {/* Row 1: Charts */}
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardCard title="Cards by supertype">
                            <p className="text-sm text-gray-600">Click on category to drilldown</p>
                            <BarChart cards={filteredCards} />
                        </DashboardCard>
                        <DashboardCard title="Top 10 sets">
                            <p className="text-sm text-gray-600">Total sets owned {getSetsCount(data.cards)} of {data.globalSets.length}</p>
                            <Treemap cards={data.cards} globalSets={data.globalSets}/>
                        </DashboardCard>
                        <DashboardCard title="Strongest cards">
                        Lorem ipsum
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
