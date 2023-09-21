import React from "react";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PretragaPoruke from "../../components/mojProfil/PretragaPoruke";
import Poruka from './Poruka'
import "../../scss/mojProfil/_mojePoruke.scss";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';


export default function MojePoruke() {

  return (
    <> 
      <div className="mojePorukeWrap">  
        <div className="container">
          <h1>Moje Poruke <span><LocalPostOfficeIcon/></span></h1>
          <div className="searchBar">
            <PretragaPoruke />
          </div>
          <div className="checkAllMessages">
            <div className="checkAll"> <Checkbox label="Izaberi sve" /></div>
            <div className="deleteBtn"><DeleteIcon/></div>
          </div>
          <div className="poruke">
            <Poruka/>
            <Poruka/>
            <Poruka/>
          </div>
        </div>
      </div>
    </>
  );
}
