import React from 'react'
import { Exercise } from '../styles/searchStyles';

const SearchTool = ({data, setTargetM}) => {
  return (
    <Exercise onCliclk={setTargetM(data.name)}>
      <img src={data.gif} alt={data.search} style={{maxWidth: '70px'}}/>
      {data.name}
    </Exercise>
  )
}

export default SearchTool
