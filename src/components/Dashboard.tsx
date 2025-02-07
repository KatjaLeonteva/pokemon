import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/api';
import DataTable from './DataTable';
import Summary from './Summary';
import Card from './Card';
import SupertypesChart from './SupertypesChart.tsx';
import TypesChart from "./TypesChart.tsx";

function Dashboard() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);



  return (
    <div className='container m-auto'>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-xl">Pokémon Card Collection</h1>
        <a href="/">
          <img className="w-10 h-10 rounded-full" src="src/assets/ash-avatar.jpg" alt="Rounded avatar" />
        </a>
      </header>
      <main className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
            <>
                <Summary data={data} />
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <Card>
                        <div className="text-sm">Cards by supertype</div>
                        <SupertypesChart/>
                    </Card>
                    <Card>
                        <div className="text-sm">Pokémon cards by type</div>
                        <TypesChart />
                    </Card>
                    <Card>
                        Lorem ipsum
                    </Card>
                </div>
                <Card>
                    <DataTable data={data} />
                </Card>
            </>
        )}
      </main>
    </div>
  )
}

export default Dashboard
