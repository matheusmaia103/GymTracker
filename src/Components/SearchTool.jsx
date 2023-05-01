import React from 'react'
import { Searchli } from '../styles/searchStyles';

const SearchTool = ({data, setTargetM}) => {
  return (
    <Searchli onCliclk={setTargetM(data.name)}>
      <img src={data.gif} alt={data.search} style={{maxWidth: '70px'}}/>
      {data.name}
    </Searchli>
  )
}

export default SearchTool
