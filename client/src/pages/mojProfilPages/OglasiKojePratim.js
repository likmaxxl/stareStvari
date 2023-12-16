import React, { useContext,useEffect,useState } from "react";
import OglasKojiPratim from "../../components/mojProfil/OglasKojiPratim";
import '../../scss/mojProfil/_oglasiKojePratim.scss'
import {StareStvariContext} from '../../context'


export default function OglasiKojePratim() {
    const value = useContext(StareStvariContext);

//GET OGLASI KOJE PRATIM
const [currentUser,setCurrentUser]=useState()

useEffect(()=>{

  let current = value.allDataFromDatabase.filter(all => {
    return all.regEmail === value.user.email;
  });

  setCurrentUser(current)
  console.log(current);
},[value.heartCheck,value.userOglasiKojePratim&&value.userOglasiKojePratim])

console.log(currentUser);

    const container =
    value.windowWidth >= 992 && value.mojProfilVisible ? "" : "container";

const reducePratimOglaseContainer={
    width: '659px',
    marginLeft: '90px',
    transition:'all .3s'
}

const fullWIdthPratimOglaseContainer={
    transition:'all .3s'
}
  return (
    <>
      <div className="pratimOglase" style={
      value.windowWidth >= 992&&
      value.mojProfilVisible?
      reducePratimOglaseContainer:fullWIdthPratimOglaseContainer
    }
      
      >

        <div className={container}>
            <h1>Oglasi koji pratim</h1>
          <div className="row">
            {
              currentUser&&currentUser[0].oglasiKojePratim.length>0?currentUser[0].oglasiKojePratim.map((all)=>{
                return <OglasKojiPratim {...all}/>
              }):<p>Trenutno ne pratite ni jedan oglas.</p>
            }
              
              {/* {
              value.userOglasiKojePratim&&value.userOglasiKojePratim.length>0?value.userOglasiKojePratim.map((all)=>{
                return <OglasKojiPratim {...all}/>
              }):<p>Trenutno ne pratite ni jedan oglas.</p>
            } */}
          </div>
        </div>
      </div>
    </>
  );
}
