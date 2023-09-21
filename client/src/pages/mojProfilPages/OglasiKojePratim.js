import React, { useContext } from "react";
import OglasKojiPratim from "../../components/mojProfil/OglasKojiPratim";
import '../../scss/mojProfil/_oglasiKojePratim.scss'
import {StareStvariContext} from '../../context'


export default function OglasiKojePratim() {
    const value = useContext(StareStvariContext);

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
              <OglasKojiPratim/>
              <OglasKojiPratim/>
              <OglasKojiPratim/>
          </div>
        </div>
      </div>
    </>
  );
}
