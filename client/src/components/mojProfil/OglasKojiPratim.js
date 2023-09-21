import React, { useContext } from "react";
import { StareStvariContext } from "../../context";
import { RemoveRedEyeOutlined, FavoriteBorder,Close,MailOutline } from "@mui/icons-material";
import "../../scss/mojProfil/_mojOglas.scss"
import {Link} from 'react-router-dom'

export default function OglasKojiPratim() {
  const value = useContext(StareStvariContext);
  const buttonsBottom = {
    bottom: "6px",
    transition: "all .3s",
  };
  const buttonsBottomOff = {
    transition: "all .3s",
  };

  const container =
    value.windowWidth >= 992 && value.mojProfilVisible ? "" : "container";



  return (
    <>
      <div className={value.windowWidth >= 992&&
       value.mojProfilVisible ?
       "col-xl-12":"col-xl-7"}>
        <div className="card">
          <div className="box">
            <a href="#">
              <img
                src="https://images.pexels.com/photos/12434670/pexels-photo-12434670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                  <a href="#">Mount Fuji</a>{" "}
                </div>
                <div className="price">200 din</div>
              </div>
              {/* <div className="citty">Krusevac</div> */}

              <div className="description">
                Mount Fuji is the tallest in Japan...
              </div>
            </div>
          </div>
          <div className="box">
            <div className="infoViewsBtns">
              <div className="views">
                <RemoveRedEyeOutlined /> <span>4</span>
              </div>
              <div className="favorite">
                <FavoriteBorder /> <span>3</span>
              </div>
              <div
                className="btnsOptions"
            
              >
                <Link to="/konverzacija" className="btnOption"><MailOutline/>Pošalji poruku</Link>           
                <button className="btnOption obrisiOglas"><Close/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
