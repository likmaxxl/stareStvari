import React, { useContext } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Favorite from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FormControlLabel from "@mui/material/FormControlLabel";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import "../scss/_oglasGrid.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StareStvariContext } from "../context";
import {Link} from 'react-router-dom'

export function OglasGrid(sviOglasi) {
  const value = useContext(StareStvariContext);
  // const {datum,mesec,grad,naslovOglasa,cena,valuta,textOglasa,pregleda,hitno,uploadedImages
  // }=all
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
// console.log(value.userOglasiKojePratim);
// console.log(sviOglasi);
  return (
    <>
      <div className="col-xxl-6">
        <div className="card">
          <a href="#">
            <img
              src={
                sviOglasi.uploadedImages && sviOglasi.uploadedImages.length > 0
                  ? sviOglasi.uploadedImages[0].data_url
                  : "../../images/nema_slike.jpg"
              }
              alt="slika"
            />
          </a>
          <div className="info">
            <div className="date">
              {sviOglasi.datum + ". " + sviOglasi.mesec}
            </div>
            <div className="top">
              <div className="infoView">
                <div className="followBtns">
                  {/* <FormControlLabel
                  onClick={value.pratiOglas}
                    label="Prati"
                    control={
                      <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      />
                    }
                    
                  /> */}
                {/* {
       value.userOglasiKojePratim&&value.userOglasiKojePratim.some(objekat => objekat.id === sviOglasi.id)?"Pratim":"Ne "
    } */}
    {
      //  value.userOglasiKojePratim&&value.userOglasiKojePratim.some(objekat => objekat.id === sviOglasi.id)?"Pratim":"Ne "
 
    }
                  <div className="pratiOglas">
                    
                      <>
                     
                        {/* <span>Prati</span> */}
                        {/* <Checkbox
                          id={sviOglasi._id}
                          onChange={value.userOglasiKojePratim&&value.userOglasiKojePratim.some(objekat => objekat.id === sviOglasi.id)?value.obrisiIzListePratim:value.pratiOglas}
                          icon={ value.userOglasiKojePratim&&value.userOglasiKojePratim.some(objekat => objekat.id === sviOglasi.id)?<Favorite/>:<FavoriteBorder/>}
                          checkedIcon={ value.userOglasiKojePratim&&value.userOglasiKojePratim.some(objekat => objekat.id === sviOglasi.id)?<FavoriteBorder/>:<Favorite/>}            
                          disabled={
                            value.user &&
                            value.user.email === sviOglasi.imeKorisnika||value.loading
                          }
                        /> */}
                      </>
               <button disabled={value.loadingPrati} id={sviOglasi._id} onClick={value.pratiOglas}>prati
                {/* {value.userOglasiKojePratim&&value.userOglasiKojePratim.some(objekat => objekat.id === sviOglasi.id)?'Obrisi':'Zaprati'} */}
               </button>
                  </div>
            {/* <h1>{value.loading&&'LOADING...'}</h1> */}
                  <Button
                    id="basic-button"
                    aria-controls={value.open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={value.open ? "true" : undefined}
                    onClick={value.handleClick}
                    endIcon={<ShareIcon />}
                  >
                    <span>Share</span>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={value.anchorEl}
                    open={value.open}
                    onClose={value.handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={value.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={value.handleClose}>My account</MenuItem>
                    <MenuItem onClick={value.handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
                <div className="views">
                  <RemoveRedEyeOutlinedIcon /> <span>{sviOglasi.pregleda}</span>
                </div>
              </div>
            </div>
            <div className="priceTitle">
              <div className="title">
                {" "}
                <Link to={`trenutni-oglas/${sviOglasi.naslovOglasa}/${sviOglasi.id}`}>{sviOglasi.naslovOglasa}</Link>{" "}
              </div>
              <div className="price">
                {sviOglasi.cena}
                {sviOglasi.valuta}
              </div>
            </div>
            <div className="citty">{sviOglasi.grad}</div>
            {value.windowWidth > 768 ? (
              <div className="description">{sviOglasi.textOglasa}</div>
            ) : (
              ""
            )}
          </div>

          {sviOglasi.hitno ? (
            <div className="hitnoBanner">
              <span className="neon">
                H<span className="flicker-slow">I</span>T
                <span className="flicker-fast">N</span>O
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
