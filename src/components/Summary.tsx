function Summary({data}: any) {

    return (
        <div>
            <div>
                <h2 className="font-semibold">Total cards</h2>
                <p className="text-2xl font-bold">{data.length}</p>
            </div>
        </div>
    )
}

export default Summary
