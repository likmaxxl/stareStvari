import React, { useState, useContext, useEffect } from "react";
import { ImportExport } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import { Link, useParams } from "react-router-dom";
import MojOglas from "../../components/mojProfil/MojOglas";
import { StareStvariContext } from "../../context";
import axios from "axios";
import "../../scss/mojProfil/_mojiOglasiPage.scss";

export default function MojiOglasi() {
  const params = useParams();

  // const [par,setPar]=useState('64beadaa15ffbb97d9b6cdc5')
  console.log(params.id);
  const value = useContext(StareStvariContext);
  const sortMenu = ["jeftinije", "skuplje", "novije", "popularnije"];
  const [showSortirajMenu, setShowSortirajMenu] = useState(false);
  const sortirajClick = (e) => {
    e.preventDefault();
    setShowSortirajMenu(!showSortirajMenu);
  };

  const mojiOglasiReduceSize = {
    width: "54%",
  };
  const mojiOglasiSizeUp = {
    transition: "all .3s",
  };

  const container =
    value.windowWidth >= 992 && value.mojProfilVisible ? "" : "container";

  const [open, setOpen] = useState(false);

  const [idOglas, setIdOglasa] = useState();

  const [mojiOglasi, setMojiOglasi] = useState(
    value.mojiOglasi && value.mojiOglasi
  );

  //OPEN  POPUP DA LI STE SIGURNI DA ZELITE DA BRISETE
  const handleClickOpen = (e) => {
    setOpen(true);
    const oglasId = e.target.getAttribute("data-index");

    setIdOglasa(oglasId);
    console.log(value.mojiOglasi);

    const kliknutiOglas = value.mojiOglasi.filter((all) => all.id === oglasId);
    console.log(kliknutiOglas);
  };

  //POTVRDA BRISANJA ILI ODLAGANJE
  const handleClose = async (e) => {
    let dataIndexObrisi = e.target.getAttribute("data-index");
    console.log(dataIndexObrisi);

    if (dataIndexObrisi === "da") {
      value.potvrdaBrisanja();
      setOpen(false);
      try {
        const response = await axios.delete(
          `http://localhost:3001/moji-oglasi/${params.id}/${idOglas}`
        );

        console.log(`Uspesno je obrisan ID: ${idOglas}`);
        const updatedItems = mojiOglasi.filter((item) => item.id !== idOglas);

        setMojiOglasi(updatedItems);
      } catch (error) {
        console.log("Greska prilikom brisanja");
        // setMessage('Greška prilikom brisanja objekta.');
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };
  console.log(mojiOglasi);

  //GET KORISNIKOVI OGLASI IZ BAZE
  // const [mojiOglasi,setMojiOglasi]=useState()
  // const id=useParams()

  // useEffect(()=>{
  //   axios.get(`http://localhost:3001/moji-oglasi/${id&&id.id}`)
  //   .then(response => {
  //    const users = response.data;
  //    setMojiOglasi(users.data&&users.data)
  //   })

  // },[])

  // console.log(mojiOglasi&&mojiOglasi[0].mojiOglasi);

  return (
    <>
      <div
        className="mojiOglasiWrap"
        style={
          value.windowWidth >= 992 && value.mojProfilVisible
            ? mojiOglasiReduceSize
            : mojiOglasiSizeUp
        }
      >
        <div className={container}>
          <div className="mojiOglasiHeader">
            <h3>
              Moji oglasi:<span> {value.user ? value.user.email : ""}</span>
            </h3>
            <div className="mojOglasiOcene">
              <Link to="/">
                Ocene:
                <span>
                  <img src="../../images/like.png" alt="Pozitivne" />
                </span>
                <span> 3</span>
                <span>
                  <img src="../../images/dislike.png" alt="Negativne" />
                </span>
                <span>1</span>
              </Link>
            </div>
          </div>

          <div className="mojiOglasiSortLength">
            <div className="sortLength length">
              Ukupno Oglasa: {mojiOglasi ? mojiOglasi.length : "0"}
            </div>
            <div className="sortLength sort" onClick={sortirajClick}>
              <span>
                Sortiraj
                <ImportExport />
              </span>
              <div className="sortMenu">
                <ul className={showSortirajMenu ? "slideInDown" : ""}>
                  {sortMenu.map((all, index) => {
                    return <li key={index}>{all}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="mojProfilOglasi">
            <div className="row">
              {mojiOglasi && mojiOglasi.length > 0 ? (
                mojiOglasi &&
                mojiOglasi
                  .filter((n) => n)
                  .map((all) => {
                    return (
                      <MojOglas
                        key={all.id}
                        {...all}
                        handleClickOpen={handleClickOpen}
                        open={open}
                        handleClose={handleClose}
                      />
                    );
                  })
              ) : (
                <Alert severity="info">Nemate postavljenih oglasa!</Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
