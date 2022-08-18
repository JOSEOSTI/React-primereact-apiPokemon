import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { useParams } from 'react-router-dom';
import { PokemonApiServices } from '../../services/pokemon.services';
import "./styles.css"
const DetailPokemon = () => {
    const id = useParams();
    const idpokemon = id.id;
    const [detailPokemon, setDetailPokemon] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await PokemonApiServices.getPokemonById(idpokemon);
        const result = data.data;
        let dataP = []
        dataP.push(result)
        setDetailPokemon(dataP)
    }
    const header = (img) => {
        return <img alt="Card" src={img.front_default}style={{objectFit:"cover"}} className="img-pokemon" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />

    };

    const footer = (data) => {
        return <div className="flex align-items-center flex-wrap">
            <Chip label={"Weight: " + data.weight + " KG"} style={{ backgroundColor: "gray" , width:"30%" , height:"30px" , fontSize:11}} className="mr-2 mb-2" />
            <Chip label={"Height: " + data.height + " M"} style={{ backgroundColor: "gray" , width:"30%" , height:"30px" , fontSize:11}} className="mr-2 mb-2" />
            <Chip label={"Base_exp: " + data.base_experience} style={{ backgroundColor: "gray" , width:"30%" , height:"30px" , fontSize:11}} className="mr-2 mb-2" />
        </div>

    }
    return (
        <div className='card-body'>
            <div className='card-detail'>
                {
                    detailPokemon.map((data) => {
                        return (
                            <div>

                                <Card title={data.name} style={{ backgroundColor: "#E84623" }}  >
                                    <p className="m-0" style={{ lineHeight: '1.5' }}>Nro {data.id}</p>
                                </Card>
                                <Card style={{ backgroundColor: "#0A0403" }} footer={footer(data)} header={header(data.sprites)}>
                                </Card>
                            </div>

                        )
                    })
                }
            </div>


        </div>

    )
}
export default DetailPokemon;