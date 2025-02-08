import { Card } from "./types.ts";

interface DataItem {
    value: number;
    groupId: string;
}

interface DrilldownData {
    dataGroupId: string;
    data: [string, number][];
}

export function getTotalCardCount(cards: Card[]): number {
    return cards.reduce((sum, card) => sum + card.count, 0);
}

export function getSetsCount(cards: Card[]): number {
    return new Set(cards.map((card) => card.setId)).size;
}

export function countCardsBySet(cards: Card[]): { name: string; value: number }[] {
    const setCounts = new Map<string, number>();

    for (const card of cards) {
        const name = card.setId || "Unknown";
        const count = card.count;

        setCounts.set(name, (setCounts.get(name) || 0) + count);
    }

    return [...setCounts.entries()].map(([name, value]) => ({ name, value }));
}

export function generateDrilldownData(cards: Card[]): {
    topLevelData: DataItem[];
    drilldownData: DrilldownData[];
} {
    const supertypeCounts = new Map<string, number>();
    const drilldownMap = new Map<string, Map<string, number>>();

    for (const card of cards) {
        const supertype = card.supertype;
        let drilldownCategory: string;

        if (supertype === "Energy") {
            // Check if the card has "Basic" subtype
            const isBasicEnergy = card.subtypes?.includes("Basic");

            if (isBasicEnergy) {
                // Extract type from the card name (e.g., "Fire Energy" → "Fire")
                const match = card.name.match(/^(\w+)\s+Energy$/);
                drilldownCategory = match ? match[1] : "Unknown";
            } else {
                // Use subtype (e.g., "Special Energy")
                drilldownCategory = card.subtypes?.[0] ?? "Unknown";
            }
        } else {
            // For non-energy cards, use the normal type classification
            drilldownCategory = card.types?.[0] ?? "N/A";
        }

        const count = card?.count;

        // Count cards by supertype
        supertypeCounts.set(supertype, (supertypeCounts.get(supertype) || 0) + count);

        // Count each drilldown category separately
            if (!drilldownMap.has(supertype)) {
                drilldownMap.set(supertype, new Map());
            }
            const typeCounts = drilldownMap.get(supertype)!;
            typeCounts.set(drilldownCategory, (typeCounts.get(drilldownCategory) || 0) + count);
    }

    // Convert top-level data to ECharts format
    const topLevelData: DataItem[] = [...supertypeCounts.entries()].map(([supertype, value]) => ({
        value,
        groupId: supertype
    }));

    // Convert drilldown data to ECharts format
    const drilldownData: DrilldownData[] = [...drilldownMap.entries()].map(([supertype, typeCounts]) => ({
        dataGroupId: supertype,
        data: [...typeCounts.entries()]
    }));

    return { topLevelData, drilldownData };

}

export function generateScatterplotData(cards: Card[]) {
    return cards
        // Only Pokémon have HP & Attacks
        .filter(card => card.supertype === "Pokémon")
        .map(card => ({
            name: card.name,
            // Convert HP to number
            hp: parseInt(card.hp || "0"),
            // Sum of all attacks energy cost
            energyCost: card.attacks ? card.attacks.reduce((sum, attack) => sum + attack.convertedEnergyCost, 0) : 0,
            image: card.images?.small || ""
        }));
}
