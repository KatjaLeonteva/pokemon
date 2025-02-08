import { Card } from "../services/types.ts";
import { getTotalCardCount } from "../services/utils.ts";

interface SummaryProps {
    cards: Card[];
}

function Summary({cards}: SummaryProps) {
    const globalTotalCards = 18686;
    const totalCards = getTotalCardCount(cards);
    const duplicatesRate = (((totalCards - cards.length) / totalCards) * 100).toFixed(0);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <p><span className="text-3xl font-bold">{totalCards}</span> cards owned</p>
                <p className="text-sm text-gray-600">Total cards {globalTotalCards}</p>
            </div>
            <div>
                <p><span className="text-3xl font-bold">{cards.length}</span> unique cards</p>
                <p className="text-sm text-gray-600">Duplicates rate {duplicatesRate}%</p>
            </div>
        </div>
    )
}

export default Summary
