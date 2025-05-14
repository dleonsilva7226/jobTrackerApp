const Body: React.FC = () => {
    return (
        <>
        <div className="flex flex-col h-screen bg-gray-300 p-8">
            <div className="grid grid-cols-5 rows-start gap-1">
                {["Job Title", "Company", "Status", "Day Applied", "Notes"].map((label) => (
                <div key={label} className="flex justify-center items-center h-12 border-2 border-gray-400 bg-white rounded-lg">
                    {label}
                </div>
                ))}
                
            </div>
        </div>
        </>
    )

}

export default Body;