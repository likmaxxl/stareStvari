import React, { useState } from "react";
import Ocena from "../../components/mojProfil/Ocena";
import "../../scss/mojProfil/_ocene.scss";

export default function Ocene() {
  const [currentClickedLink, setCurrentClickedLink] = useState("1");
  const sortOceneBtns = (e) => {
    e.preventDefault();
    const currentEl = e.target.getAttribute("data-index");
    setCurrentClickedLink(currentEl);
  };


  return (
    <>
      <div className="oceneProfil">
        <div className="container">
          <div className="oceneHeader">
            <h1>Ocene korisnika</h1>
            <div className="emalKorisnikaIcons">
              <div className="email">
                <span>test@gmail.com</span>
              </div>
              <div className="oceneIcons">
                <div className="icon">
                  <img src="../../../images/like.png" alt="" /> <span>20</span>
                </div>
                <div className="icon">
                  <img src="../../../images/dislike.png" alt="" />
                  <span>2</span>
                </div>
              </div>
            </div>

            <div className="oceneNavi">
              <ul>
                <li
                  data-index="1"
                  className={
                    currentClickedLink === "1" && "selectedOcenaNavi"
                  }
                  onClick={sortOceneBtns}
                >
                  Sve ocene
                </li>
                <li
                  className={
                    currentClickedLink === "2" && "selectedOcenaNavi"
                  }
                  data-index="2"
                  onClick={sortOceneBtns}
                >
                  Pozitivne
                </li>
                <li
                  className={
                    currentClickedLink === "3" && "selectedOcenaNavi"
                  }
                  data-index="3"
                  onClick={sortOceneBtns}
                >
                  Negativne
                </li>
              </ul>
            </div>
          </div>
          <div className="ocenaMojeOcene">
            <Ocena />
            <Ocena />
            <Ocena />
          </div>
        </div>
      </div>
    </>
  );
}
