import React, { useContext,useState } from "react";
import { StareStvariContext } from "../../context";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import MojOglasObrisiAlert from './MojOglasObrisiAlert'
import {Link} from 'react-router-dom'
import { RemoveRedEyeOutlined,FavoriteBorder
} from "@mui/icons-material";

import "../../scss/mojProfil/_mojOglas.scss";

export default function MojOglas({mesec,datum,naslovOglasa,cena,textOglasa,pregleda,uploadedImages,handleClose,handleClickOpen,open,id}) {
  const value = useContext(StareStvariContext);
    console.log(value.sviOglasi);
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  //   console.log(value.mojiOglasi);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const buttonsBottom={
    bottom:"6px",
    transition:"all .3s"
  }
  const buttonsBottomOff={
    transition:"all .3s"
  }



  return (
    <>
    <MojOglasObrisiAlert open={open} handleClose={handleClose}/>
      <div className={value.mojProfilVisible?'col-xl-12':'col-xl-6'}>
        <div className="card">
          <div className="box">
            <a href="#">
              <img
                src={uploadedImages&&uploadedImages.length>0?uploadedImages[0].data_url:'../../images/nema_slike.jpg' }
                alt=""
              />
            </a>
            <div className="info">
              <div className="top">
                <div className="date">{datum} {mesec}</div>
                {/* <div className="infoView">
                
                <div className="views">
                  <RemoveRedEyeOutlinedIcon /> <span>4</span>
                </div>
              </div> */}
              </div>
              <div className="priceTitle">
                <div className="title">
                  {" "}
                  <Link to={`/trenutni-oglas/${naslovOglasa}/${id}`}>{naslovOglasa}</Link>{" "}
                </div>
                <div className="price">{cena} din</div>
              </div>
              {/* <div className="citty">Krusevac</div> */}
            
                <div className="description">
                  {textOglasa.substring(0, 10).concat('...')}
            
                </div>
            
            </div>
          </div>
          <div className="box">
            <div className="infoViewsBtns">
              <div className="views">

                <RemoveRedEyeOutlined /> <span>{pregleda}</span>
              </div>
            <div className="favorite">
            <FavoriteBorder/> <span>3</span>

            </div>
              <div className="btnsOptions" style={
                value.windowWidth>=992&&
                value.windowWidth<=1270&&
                value.mojProfilVisible?
                buttonsBottom:buttonsBottomOff}>
                <button className="btnOption">Obnovi</button>
                <button className="btnOption izmeniOglas">Izmeni</button>
                <button className="btnOption obrisiOglas" data-index={id} onClick={handleClickOpen}>Obriši</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
