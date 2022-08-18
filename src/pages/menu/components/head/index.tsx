import React from 'react'
import { Menubar } from 'primereact/menubar';
import "primereact/resources/themes/md-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import "./style.css"
import logo from "../imgs/logo.png"
const Navpokemon = () => {

    const items = [
        
        {
            
        }
    ];
    const start = <img alt="logo" src={logo} onError={(e :any ) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    
  return (
    <div>
    <div className="card">
        <Menubar  model={items} start={start}  />
    </div>
</div>
  )
}

export default Navpokemon