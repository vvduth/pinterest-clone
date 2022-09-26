import React, { Dispatch, SetStateAction } from 'react'
interface IProps {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  
}
const Search = ({searchTerm, setSearchTerm}: IProps) => {
  return (
    <div>
      
    </div>
  )
}

export default Search
