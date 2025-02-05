export async function fetchDashboardData() {    
    try {
        const response = await fetch('src/assets/ash_collection.json')
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error)
        return [];
    }
}