import './searchbar.css'

function SearchBar({onChange}: {onChange: (term: string) => void}) {
    return(
        <div className='search-container'>
            <input type="text" placeholder='Keresés...' className='search-input' onChange={(e) => {onChange(e.target.value)}} />
        </div>
    );
}

export default SearchBar;