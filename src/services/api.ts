import { Card, SetInfo } from './types';

export async function fetchDashboardData() {
    try {
        // Load local data
        const localResponse = await fetch('src/assets/ash_collection.json')
        const localData = await localResponse.json();

        // Fetch external Pokémon TCG API data (sets)
        const apiResponse = await fetch('https://api.pokemontcg.io/v2/sets');
        const apiData = await apiResponse.json();

        // Merge local collection with API set data
        const data = mergeData(localData, apiData.data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error)
        return [];
    }
}

function mergeData(localCards: Card[], setsData: SetInfo[]): Card[] {
    const setMap = new Map(setsData.map((set) => [set.id, set]));

    return localCards.map((card) => {
        // Extract setId from card id (e.g., "base3-53" → "base3")
        const setId = card.id.split("-")[0];

        return {
            ...card,
            setId,
            setInfo: setMap.get(setId) || null,
        };
    });
}
