import React, { useContext,useState } from "react";
import { StareStvariContext } from "../../context";
import { RemoveRedEyeOutlined, FavoriteBorder,Close,MailOutline } from "@mui/icons-material";
import "../../scss/mojProfil/_mojOglas.scss"
import {Link,useParams } from 'react-router-dom'
import axios from 'axios'


export default function OglasKojiPratim({cena,valuta,naslovOglasa,pregleda,textOglasa,uploadedImages,_id}) {
  const value = useContext(StareStvariContext);
  const buttonsBottom = {
    bottom: "6px",
    transition: "all .3s",
  };
  const buttonsBottomOff = {
    transition: "all .3s",
  };
  const params = useParams();
  const container =
    value.windowWidth >= 992 && value.mojProfilVisible ? "" : "container";



  //obrisi iz liste pracenja
  const [trenutniOglasKojiPratim,setTrenutniOglasKojiPratim]=useState()
  const obrisiIzListePratim=(e)=>{
console.log(params.id);
    let oglasKojiPratimId=e.target.getAttribute('data-value')
    setTrenutniOglasKojiPratim(oglasKojiPratimId)
    axios.delete(`http://localhost:3001/pratim/${params.id}/${oglasKojiPratimId}`)
    .then(response => console.log('Delete successful'))
    .catch(error => {
        // setErrorMessage(error.message);
        console.error('There was an error!', error);
    });

}


  return (
    <>
      <div className={value.windowWidth >= 992&&
       value.mojProfilVisible ?
       "col-xl-12":"col-xl-7"}>
        <div className="card">
          <div className="box">
            <a href="#">
              <img
                src={uploadedImages[0].data_url}
                alt=""
              />
            </a>
            <div className="info">
              <div className="top">
                <div className="date">15 Jan 2022</div>
                {/* <div className="infoView">
                
                <div className="views">
                  <RemoveRedEyeOutlinedIcon /> <span>4</span>
                </div>
              </div> */}
              </div>
              <div className="priceTitle">
                <div className="title">
                  {" "}
                  <a href="#">{naslovOglasa}</a>{" "}
                </div>
              
                <div className="price">{cena} {valuta}</div>
              </div>
              {/* <div className="citty">Krusevac</div> */}

              <div className="description">
               {textOglasa}
              </div>
            </div>
          </div>
          <div className="box">
            <div className="infoViewsBtns">
              <div className="views">
                <RemoveRedEyeOutlined /> <span>{pregleda}</span>
              </div>
              <div className="favorite">
                <FavoriteBorder /> <span>3</span>
              </div>
              <div
                className="btnsOptions"
            
              >
                <Link to="/konverzacija" className="btnOption"><MailOutline/>Pošalji poruku</Link>           
                <button className="btnOption obrisiOglas" data-value={_id} onClick={obrisiIzListePratim}><Close data-value={_id} onClick={obrisiIzListePratim}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
