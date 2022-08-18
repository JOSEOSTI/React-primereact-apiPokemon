import React from 'react'
import TablePokemon from '../../components/table-pokemon'
import Menu from '../menu'
import "./style.css"
const Home = () => {
  return (
    <div>
      <Menu />
      <div className='table-pokemon'>
        <TablePokemon />
      </div>
    </div>
  )
}

export default Home