function DataTable({data}: any) {
   return (
    <div className="max-h-full overflow-y-auto">
    <table className="min-w-full table-auto">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Subtypes</th>
                <th>HP</th>
                <th>Rarity</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((item: any) => (
                    <tr key={item.id} className="odd:bg-gray-100">
                        <td>{item.name}</td>
                        <td>{item.supertype}</td>
                        <td>{item.subtypes?.join(", ") || "—"}</td>
                        <td>{item.hp}</td>
                        <td>{item.rarity}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </div>
   )
}

export default DataTable