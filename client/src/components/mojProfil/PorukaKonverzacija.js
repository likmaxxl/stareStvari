import React, { useState,useRef,useContext, useEffect  } from "react";
import {StareStvariContext} from '../../context'
import {
  ArrowBackIos,
  RemoveRedEye,
  FavoriteBorder,
  MoreVert,
  Send,
  InsertEmoticon,
  Close
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../../scss/mojProfil/_porukaKonverzacija.scss";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function PorukaKonverzacija() {
  const value=useContext(StareStvariContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**OTVORI/ZATVORI KONVERZACIJU***/


const [hideConversation,setHideConversation]=useState(true)
const showHideConversationClick=(e)=>{
  e.preventDefault()
  setHideConversation(!hideConversation)

}
const konverzacijaRef = useRef(null);

  return (
    <>
      <div className="porukaKonverzacija">
        <div className="container">
          <Link to="/moje-poruke" className="backButton">
            <ArrowBackIos />
            Poruke
          </Link>
          <div className="emailKorisnikaOcena">
            <div className="emailKorisnika">text123@gmail.com</div>
            <div className="oceniBlokiraj">
              <Link to="/">Ocenite</Link>
              <div className="blokiraOpcije">
                <button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVert />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Blokiraj</MenuItem>
                  <MenuItem onClick={handleClose}>Prijavi prevaru</MenuItem>
                  <MenuItem onClick={handleClose}>Obriši konverzaciju</MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          <div className="detaljiOglasa">
            <Link to="/">
              <div className="naslovOglasaSlika">
                <img
                  src="https://images.pexels.com/photos/14437082/pexels-photo-14437082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <span> pozlaceni escajg</span>
              </div>
            </Link>
            <div className="cenaOglasa">55 din</div>
            <div className="pregledaOglasa">
              <span>
                <RemoveRedEye />
              </span>{" "}
              <span>142</span>
            </div>
            <div className="pratiocaOglasa">
              <span>
                <FavoriteBorder />
              </span>
              <span>4</span>
            </div>
            <div className="datumPostavkeOglasa">21.5.2022</div>
            <div className="mestoKorisnika">Krusevac</div>
          </div>
        </div>
        <div className={value.mojProfilVisible?"konverzacijaPor porukaKonverzacijaRight":"konverzacijaPor"}>
          <div className="container">

          <div className="openCloseConversationMessage" onClick={showHideConversationClick}>
              <div className="openCloseIcon">
               {hideConversation? <Close/> :  <button className="openConversation">Otvori Konverzaciju</button>}
         
              </div>
            </div>
          <div ref={konverzacijaRef} className={hideConversation?"readMessage":"readMessage hideMessageConversation"}>
       
            <div className="readDate">22.1.2022</div>
            <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>

            <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>  <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>  <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>  <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>  <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>  <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>  <div className="visitorMessage">
              <div className="visitorBox">
                <span>koja je zadnja cena</span>
                <span>12.55</span>
              </div>
            </div>

            <div className="userMessage">
              <div className="userBox">
                <span>50e</span>
                <span>12.55</span>
              </div>
            </div>
          </div>
          <div className="writeMessage">
            <div className="emoji">
              <InsertEmoticon/>
            </div>
            <textarea name="writeMessage" id=""></textarea>
<button><Send/></button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
