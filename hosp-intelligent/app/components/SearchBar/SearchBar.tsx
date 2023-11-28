import { useState } from 'react'

const SearchBar = ( {onSearch} : {onSearch:any} ) => {
    const [query, setQuery] = useState('')

    const handleChange = (e : any) => {
        setQuery(e.target.value)
        onSearch(e.target.value)
    }  

    return (
    <input
        type='text'
        placeholder="Buscar por nombre"
        className='w-full font-primary text-md rounded-lg
        px-4 py-3 text-black my-4 border border-gra bg-gray-50
        shadow-lg outline-none'
        value={query}
        onChange={handleChange}
    />
    )
}

export default SearchBar