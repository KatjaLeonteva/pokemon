function FilterBar({ filters, onChange }: { filters: any; onChange: (key: string, value: string) => void }) {

    return (
        <div className="flex flex-col space-y-4">
            <div>
                <label htmlFor="">Energy</label>
                <select className="w-full border border-gray-400 rounded-sm p-1" value={filters.energyType}
                        onChange={(e) => onChange("energyType", e.target.value)}>
                    <option value="All">All types</option>
                    <option value="Colorless">Colorless</option>
                    <option value="Darkness">Darkness</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Fire">Fire</option>
                    <option value="Grass">Grass</option>
                    <option value="Lightning">Lightning</option>
                    <option value="Metal">Metal</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Water">Water</option>
                </select>
            </div>
            <div>
                <label htmlFor="">Rarity</label>
                <select className="w-full border border-gray-400 rounded-sm p-2" value={filters.rarity}
                        onChange={(e) => onChange("rarity", e.target.value)}>
                    <option value="All">All rarities</option>
                    <option value="Common">Common</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Rare">Rare</option>
                </select>
            </div>
            <div>
                <label htmlFor="">Legalities</label>
                <select className="w-full border border-gray-400 rounded-sm p-2" value={filters.legality}
                        onChange={(e) => onChange("legality", e.target.value)}>
                    <option value="All">All legalities</option>
                    <option value="standard">Standard</option>
                    <option value="expanded">Expanded</option>
                    <option value="unlimited">Unlimited</option>
                </select>
            </div>
        </div>
    )
}

export default FilterBar
