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
                <h2 className="font-semibold">Cards owned</h2>
                <p className="text-2xl font-bold">{totalCards}</p>
                <p className="text-sm">Total cards {globalTotalCards}</p>
            </div>
            <div>
                <h2 className="font-semibold">Unique cards</h2>
                <p className="text-2xl font-bold">{cards.length}</p>
                <p className="text-sm">Duplicates rate {duplicatesRate}%</p>
            </div>
        </div>
    )
}

export default Summary
