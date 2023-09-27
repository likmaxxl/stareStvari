import React, { useContext,useState } from "react";
import "../scss/_mojProfilMenu.scss";
import { StareStvariContext } from "../context";
import { Link } from "react-router-dom";
import {
  Folder,
  Forum,
  ThumbUp,
  Favorite,
  ManageAccounts,
  Logout,
  Close
} from "@mui/icons-material";

export default function MojProfilMenu() {
  const value = useContext(StareStvariContext);

  const logOutCloseMenuMobile = (e) => {
    value.izlogujSeBtnClick(e);
    value.logOut();
  };




  return (
    <>
      <div
        className={
          value.mojProfilVisible
            ? "mojProfilWrap bounceInRight"
            : "mojProfilWrap"
        }
      >
        <div className="mojProfilAllContent">
          <div className="mojProfilBckgrImg"></div>
          <div className="mojProfilHeader">
            <h1>MOJ PROFIL</h1>
            <div className="mojProfilHeader_logo">
              <img src="../../images/mojProfileLogo.png" alt="" />
            </div>
          </div>
          <div className="mojProfilMain">
            <ul>
              <li>
                <Link to={`/moji-oglasi/${value.user&&value.user.id}`} onClick={value.linkClickCloseNav}>
                  <span>
                    <Folder />
                  </span>{" "}
                  Moji oglasi <span>{value.mojiOglasi&&value.mojiOglasi.length>0?value.mojiOglasi.length:0}</span>
                </Link>
              </li>
              <li>
                <Link to="/moje-poruke" onClick={value.linkClickCloseNav}>
                  <span>
                    <Forum />
                  </span>{" "}
                  Poruke <span>2</span>
                </Link>
              </li>
              <li>
                <Link to="/ocene" onClick={value.linkClickCloseNav}>
                  {" "}
                  <span>
                    <ThumbUp />
                  </span>{" "}
                  Ocene <span>1520</span>
                </Link>
              </li>
              <li>
                <Link to="/pratim" onClick={value.linkClickCloseNav}>
                  {" "}
                  <span>
                    <Favorite />
                  </span>{" "}
                  Oglasi koje pratim <span>1</span>
                </Link>
              </li>
              <li>
                <Link to="/" onClick={value.linkClickCloseNav}>
                  {" "}
                  <span>
                    <ManageAccounts />
                  </span>{" "}
                  Podešavanje naloga
                </Link>
              </li>
              <li onClick={logOutCloseMenuMobile}>
                <Link to="#" onClick={value.linkClickCloseNav}>
                  {" "}
                  <span>
                    <Logout />
                  </span>{" "}
                  Izlogujte se
                </Link>
              </li>
            </ul>
            <div className="closeMojProfileBtn" onClick={value.mojProfileHideBtn}>
              Zatvori <span><Close/></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
