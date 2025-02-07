function DataTable({data}: any) {
   return (
    <table className="min-w-full table-auto">
        <thead>
        <tr>
            <th>Name</th>
            <th>Types</th>
            <th>Supertype</th>
            <th>Subtypes</th>
            <th>Set</th>
            <th>Rarity</th>
            <th>Standard</th>
            <th>Expanded</th>
            <th>Unlimited</th>
        </tr>
        </thead>
        <tbody>
            {
                data.map((item: any) => (
                    <tr className="odd:bg-gray-100">
                        <td>{item.name}</td>
                        <td>{item.types?.join(", ")}</td>
                        <td>{item.supertype}</td>
                        <td>{item.subtypes?.join(", ")}</td>
                        <td>{item.setInfo?.name}</td>
                        <td>{item.rarity}</td>
                        <td>{item.legalities?.standard}</td>
                        <td>{item.legalities?.expanded}</td>
                        <td>{item.legalities?.unlimited}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
   )
}

export default DataTable
