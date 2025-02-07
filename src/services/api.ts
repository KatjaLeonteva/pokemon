import { Card, SetInfo } from './types';

export async function fetchDashboardData() {
    try {
        // Load local data
        const localResponse = await fetch('src/assets/ash_collection.json')
        const localData = await localResponse.json();

        // Fetch external Pokémon TCG API data (sets)
        const apiResponse = await fetch('https://api.pokemontcg.io/v2/sets');
        const apiData = await apiResponse.json();

        const globalTotalSets = apiData.data.length;

        // Merge local collection with API set data
        let data = mergeData(localData, apiData.data);
        data = removeDuplicates(data);
        return { cards: data, globalTotalSets };
    } catch (error) {
        console.error('Error fetching data:', error)
        return { cards: [], globalTotalSets: null };
    }
}

function mergeData(localCards: Card[], setsData: SetInfo[]): Card[] {
    const setMap = new Map(setsData.map((set) => [set.id, set]));

    return localCards.map((card) => {
        // Extract setId from card id (e.g., "base3-53" -> "base3")
        const setId = card.id.split("-")[0];

        return {
            ...card,
            setId,
            setInfo: setMap.get(setId) || null,
        };
    });
}

function removeDuplicates(cards: Card[]): Card[] {
    const cardMap = new Map<string, Card & { count: number }>();

    for (const card of cards) {
        if (cardMap.has(card.id)) {
            cardMap.get(card.id)!.count += 1;
        } else {
            cardMap.set(card.id, { ...card, count: 1 });
        }
    }
    return Array.from(cardMap.values());
}
