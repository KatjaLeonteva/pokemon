export interface Card {
    id: string;
    count: number;
    name: string;
    supertype: string;
    subtypes: string[];
    level?: string;
    hp?: string;
    types?: string[];
    evolvesFrom?: string;
    evolvesTo?: string[];
    rules?: string[];
    ancientTrait?: AncientTrait;
    abilities?: Ability[];
    attacks?: Attack[];
    weaknesses?: Weakness[];
    resistances?: Resistance[];
    retreatCost?: string[];
    convertedRetreatCost?: number;
    number: string;
    artist?: string;
    rarity?: string;
    flavorText?: string;
    nationalPokedexNumbers?: number[];
    legalities?: Legalities;
    regulationMark?: string;
    images: {
        small: string;
        large: string;
    };
    setId: string;
    setInfo?: SetInfo | null;
}

export interface AncientTrait  {
    name: string;
    text: string;
}

export interface Ability  {
    name: string;
    text: string;
    type: string;
}

export interface Attack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

export interface Weakness {
    type: string;
    value: string;
}

export interface Resistance {
    type: string;
    value: string;
}

export interface Legalities {
    standard?: "Legal" | "Banned";
    expanded?: "Legal" | "Banned";
    unlimited?: "Legal" | "Banned";
}

export interface SetInfo {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legalities;
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
        symbol: string;
        logo: string;
    }
}
