import React, { useEffect,useContext,useState } from 'react'
import {useParams,Link} from 'react-router-dom'
import {StareStvariContext} from '../context'
import '../scss/_kliknutiOglasData.scss'

export default function TrenutniOglas() {
    const nameId=useParams() 
    const value = useContext(StareStvariContext);
    const [kliknutiOglas,setKliknutiOglas]=useState()//current clicked ads data
    console.log(value.sviOglasi);
    console.log(nameId);


useEffect(()=>{
    const currentItem = value.sviOglasi&&value.sviOglasi.find(item => item.id === nameId.id);
    setKliknutiOglas(currentItem);
},[])

  return (
    <>
    <div className="kliknutiOglasPage">
        <div className="kliknutiOglasKategorija">
            <Link to="">Kategorija</Link> <span> ID oglasa:46466454</span>
            <br/>
            Datum postavke: 18.5.2022
            </div> 

    <h1>{kliknutiOglas&&kliknutiOglas.naslovOglasa}</h1>
    </div>

    </>
 
  )
}
