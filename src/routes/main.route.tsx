import React from 'react'
import {
    Routes,
    Route,
    HashRouter
  } from "react-router-dom";
import DetailPokemon from '../components/detail-pokemon';
import Home from '../pages/home';

const App = () => {
  return (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/pokemon/detail/:id' element={<DetailPokemon />} />
        </Routes>
    </HashRouter>
  )
}

export default App;