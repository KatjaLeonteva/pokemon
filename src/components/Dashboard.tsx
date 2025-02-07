import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/api';
import DataTable from './DataTable';
import Summary from './Summary';
import DashboardCard from './DashboardCard';
import Spinner from "./Spinner";
import SupertypesChart from './SupertypesChart';
import TypesChart from "./TypesChart";
import { Card } from '../services/types.ts';

function Dashboard() {
  const [data, setData] = useState<{ cards: Card[] | [], globalTotalSets: number | null }>({
      cards: [],
      globalTotalSets: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then((res) => {
        setData(res);
        setLoading(false);
    });
  }, []);



  return (
    <div className='h-screen flex flex-col container mx-auto'>
        {loading ? (
            <div className="flex-1 flex items-center justify-center w-full">
                <Spinner />
            </div>
        ) : (
            <>
        <header className="w-full p-4 shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-xl">Pokémon Card Collection</h1>
                <a href="/">
                    <img className="w-10 h-10 rounded-full" src="src/assets/ash-avatar.jpg" alt="Rounded avatar"/>
                </a>
            </div>
        </header>
        <div className="flex flex-1 overflow-hidden">


            <aside className="w-1/5 p-4 -ml-4">
                <DashboardCard className="h-full">
                    <Summary cards={data.cards} globalTotalSets={data.globalTotalSets}/>
                </DashboardCard>
            </aside>
                    <main className="flex-1 p-4 -mx-4 overflow-y-auto">
                <div className="grid grid-rows-2 gap-4 h-full">
                    {/* Row 1: Charts */}
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardCard title="Cards by supertype">
                            <SupertypesChart/>
                        </DashboardCard>
                        <DashboardCard title="Pokémon cards by type">
                            <TypesChart/>
                        </DashboardCard>
                        <DashboardCard title="Strongest cards">
                            Lorem ipsum
                        </DashboardCard>
                    </div>

                    {/* Row 2: Table */}
                    <DashboardCard className="row-span-1 flex-1 overflow-auto">
                        <DataTable cards={data.cards}/>
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
