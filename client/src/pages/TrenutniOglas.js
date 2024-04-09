import React, { useEffect, useContext, useState } from "react";
import { useParams, Link,useNavigate,useLocation } from "react-router-dom";
import { StareStvariContext } from "../context";
import "../scss/_kliknutiOglasData.scss";
import CarouselImages from "../components/CarouselImages";
import '../scss/_KategorijaPage.scss'
export default function TrenutniOglas() {
  const nameId = useParams();
  const value = useContext(StareStvariContext);
  const [kliknutiOglas, setKliknutiOglas] = useState(); //current clicked ads data
  console.log(value.sviOglasi);
  console.log(nameId);


 
const navigate = useNavigate();
const { pathname } = useLocation();
// navigate("/", { state: { previousPath: pathname } });
  return (
    <>
      <div className="kliknutiOglasPage">
      {/* <Link to='/' state={{ previousPath: pathname }}>{pathname}</Link> */}
        <div className="container">
        <div className="kliknutiOglasKategorija">
          <span>Kategorija: </span><Link to="/">Svi oglasi  </Link>/<Link to={`/${kliknutiOglas&&kliknutiOglas.izabranaKategorija}`}>{kliknutiOglas&&kliknutiOglas.izabranaKategorija}</Link> <span> ID oglasa:46466454</span>
          <br />
          Datum postavke: 18.5.2022
        </div>
        <div className="kliknutiOglasData">
          <div className="oglasInfo">
            <div className="box">
              <div className="oglasBtns">
              <button disabled={value.loadingPrati} id={kliknutiOglas&&kliknutiOglas._id} onClick={value.pratiOglas}>prati
               </button>
                <button>Podeli</button>
              </div>
              <div className="oglasImg">
                <div className="img">
                <CarouselImages/>      
                </div>
                <h1>{kliknutiOglas && kliknutiOglas.naslovOglasa}</h1>
                <div className="oglasCena">Cena:200 din</div>
              </div>
            </div>
            <div className="box">
              <div className="sendMsgBtn">
                {
                  value.user&&value.user.email?<Link to={`/konverzacija/${nameId&&nameId.id}`}>Posalji poruku</Link>:<button>Posalji poruku</button>
                }
                
              </div>
              <div className="oglasUserData userName">
                <span>icon</span> Ime Korisnika
              </div>
              <div className="oglasUserData clanOd">
                <span>icon</span> Clan od 12.12.2020.
              </div>
              <div className="oglasUserData mesto">
                <span>icon</span> Krusevac
              </div>
              <div className="userOcene">
                <div className="oglasUserData">
                  <span>icon</span> p
                </div>
                <div className="oglasUserData">
                  <span>icon</span> n
                </div>
              </div>
              <div className="oglasUserData mesto">
                <span>icon</span>svi korisnikovi oglasi
              </div>
              <div className="oglasUserData mesto">
                <span>icon</span> 062547898
              </div>
            </div>
          </div>
          <div className="oglasInfoText">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
            nihil, maiores beatae tempore quos fugiat optio harum itaque commodi
            adipisci obcaecati quas aliquam aperiam, praesentium saepe ratione
            pariatur quia possimus?
          </div>
        </div>
   
      </div>
      </div>
    </>
  );
}
