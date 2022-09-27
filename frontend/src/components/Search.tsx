import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'


import MasonryLayout from './MasonryLayour';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';
interface IProps {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  
}
const Search = ({searchTerm, setSearchTerm}: IProps) => {
  const [pins, setPins] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true) ;
      const query = searchQuery(searchTerm.toLowerCase()) ;
      client.fetch(query).then((data) => {
        setPins(data) ; 
        setLoading(false) ; 
      })
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data) ; 
        setLoading(false) ; 
      })
    }

  },[searchTerm])

  return (
    <div>
      {loading && <Spinner message='Searching for pin chill out brah...'/>}
      {pins?.length !== 0 && <MasonryLayout pins={pins}/> }
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className='mt-10 text-center text-xxl '>
            No pin found brah
        </div>
      ) }
    </div>
  )
}

export default Search
