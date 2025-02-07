import {Card} from "./types.ts";

export function getTotalCardCount(cards: Card[]): number {
    return cards.reduce((sum, card) => sum + card.count, 0);
}

export function getSetsCount(cards: Card[]): number {
    return new Set(cards.map((card) => card.setId)).size;
}
