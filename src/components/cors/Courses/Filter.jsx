const Filter = ({ filterData, setCategory, Category }) => {

    function clickHandler(title) {
        setCategory(title);
    }

    return (
        <div className="filter-container">
            {/* Add "All Categories" option */}
            <button 
                onClick={() => clickHandler('All Categories')} 
                className={`btn ${Category === 'All Categories' ? 'btn-active' : ''}`}
            >
                All Categories
            </button>

            {/* Map over each category */}
            {filterData.map((data) => (
                <button 
                    key={data.id}
                    onClick={() => clickHandler(data.name)} 
                    className={`btn ${Category === data.name ? 'btn-active' : ''}`}
                >
                    {data.name}
                </button>
            ))}
        </div>
    );
}

export default Filter;
