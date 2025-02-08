import { Card } from "../services/types.ts";

const legalitiesAbbr: Record<string, string> = {
    standard: "STD",
    expanded: "EXP",
    unlimited: "UNL",
};

function DataTable({cards}: {cards: Card[]}) {
   return (
    <table className="w-full mt-4">
        <thead>
        <tr>
            <th>Name</th>
            <th>Types</th>
            <th>Supertype</th>
            <th>Subtypes</th>
            <th>Set</th>
            <th>Rarity</th>
            <th>{legalitiesAbbr.standard}</th>
            <th>{legalitiesAbbr.expanded}</th>
            <th>{legalitiesAbbr.unlimited}</th>
            <th>Count</th>
        </tr>
        </thead>
        <tbody>
            {
                cards.map((card: Card) => (
                    <tr className="odd:bg-gray-100" key={card.id}>
                        <td>{card.name}</td>
                        <td>{card.types?.join(", ")}</td>
                        <td>{card.supertype}</td>
                        <td>{card.subtypes?.join(", ")}</td>
                        <td><img src={card.setInfo?.images.symbol} alt={card.setInfo?.name}
                                 className="inline-block w-4"/> {card.setInfo?.name}</td>
                        <td>{card.rarity}</td>
                        <td>{card.legalities?.standard}</td>
                        <td>{card.legalities?.expanded}</td>
                        <td>{card.legalities?.unlimited}</td>
                        <td className="text-right">{card.count}</td>
                    </tr>
                ))
            }
        </tbody>

    </table>
   )
}

export default DataTable
