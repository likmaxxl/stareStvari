import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { StareStvariContext } from "../../context";
import "../../scss/_postaviOglasPage.scss";
import { AutoComplete } from "../AutoComplete";
import DragDrop from "./DragDrop";
import axios from "axios";
import { useParams } from "react-router-dom";
import { uid } from "uid";

export default function PostaviOglasForm() {
  const value = useContext(StareStvariContext);

  /***DATUM TRENUTNI (TO CE BITI DATUM POSTAVLJANJA OGLASA)**/

  const [mesecCurrent, setMesec] = useState();
  const [datumCurrent, setDatum] = useState();

  const trenutniDatumPostavkeOglasa = () => {
    const monthNames = [
      "Januar",
      "Februar",
      "Mart",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Avgust",
      "Septembar",
      "Oktobar",
      "Novembar",
      "Decembar",
    ];

    const current = new Date();
    // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    setDatum(current.getDate());
    setMesec(monthNames[current.getMonth()]);
  };

  useEffect(() => {
    trenutniDatumPostavkeOglasa();
  }, []);

  let userId = useParams();
  console.log(userId);

  const [postaviOglasPolja, setPostaviOglasPolja] = useState({
    id: "",
    izabranaKategorija: "",
    uploadedImages: [],
    naslovOglasa: "",
    ponudaPotraznja: "nudim",
    hitno: false,
    zamena: false,
    valuta: "din",
    textOglasa: "",
    grad: "",
    imeKorisnika: value.user && value.user.email,
    telefon:"",
    pregleda: 0,
    mesec: "",
    datum: "",
    cena:0,
  });

  const [errorPostaviOglas, setErrorPostaviOglas] = useState({
    errKategorija: false,
    errNaslov: false,
    errMesto: false,
  });

  const izaberiKategorijuChange = (e, v) => {
    setPostaviOglasPolja({
      ...postaviOglasPolja,
      izabranaKategorija: v,
      id: uid(),
    });
  };

  const dragDropImgonChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    console.log(imageList);
    setPostaviOglasPolja({ ...postaviOglasPolja, uploadedImages: imageList });
  };

  //On change funkcija za Naslov,CheckButtons,RadioButtons,Cena
  const textRadioCheckChange = (e) => {
    const { value, name, type, checked } = e.target;
   
    if (type === "checkbox") {
      setPostaviOglasPolja({
        ...postaviOglasPolja,
        [name]: checked,
      });
    } else {
     console.log(postaviOglasPolja);
      setPostaviOglasPolja({
        ...postaviOglasPolja,
        [name]: value&&type === "number"?parseInt(value):value
      });
    }
  };

  //Izaberi GRAD i postavka datume
  const izaberiGradChange = (e, v) => {
    console.log(v);
    setPostaviOglasPolja({
      ...postaviOglasPolja,
      grad: v,
      mesec: mesecCurrent,
      datum: datumCurrent,
    });
    console.log(postaviOglasPolja.grad);
  };

  const kategorijaRef = useRef(null);
  const naslovRef = useRef(null);

  //POSTAVI OGLAS DUGME NA DNU
  const [loading, setLoading] = useState();
  const [svaPoljaPostaviOglas, setSvaPoljaPostaviOglas] = useState();
  const postaviOglasBtnClick = async (e) => {
    e.preventDefault();
    setSvaPoljaPostaviOglas(postaviOglasPolja);

    console.log(postaviOglasPolja.izabranaKategorija);

    if (!postaviOglasPolja.izabranaKategorija) {
      setErrorPostaviOglas({ ...errorPostaviOglas, errKategorija: true });
      kategorijaRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (!postaviOglasPolja.naslovOglasa) {
      setErrorPostaviOglas({ ...errorPostaviOglas, errNaslov: true });
      naslovRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (!postaviOglasPolja.grad) {
      setErrorPostaviOglas({ ...errorPostaviOglas, errMesto: true });
    } else {
      setLoading(true);
      console.log(svaPoljaPostaviOglas);
      axios
        .post(`http://localhost:3001/postavi-oglas/${userId && userId.id}`, {
          postaviOglasPolja: postaviOglasPolja,
        })
        .then((response) => {
          console.log("Data posted successfully");
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
          setLoading(false);
        });

      trenutniDatumPostavkeOglasa();
      window.location.href = "http://localhost:3000/";
    }
  };

  console.log("loading............" + loading);

  //clear error message (IZABERI KATEGORIJU)
  useEffect(
    () => {
      if (postaviOglasPolja.izabranaKategorija) {
        setErrorPostaviOglas({ ...errorPostaviOglas, errKategorija: false });
      }
    },
    [
      postaviOglasPolja.izabranaKategorija &&
        postaviOglasPolja.izabranaKategorija,
    ],
    []
  );
  //clear error message (IZABERI NASLOV)
  useEffect(() => {
    if (postaviOglasPolja.naslovOglasa) {
      setErrorPostaviOglas({ ...errorPostaviOglas, errNaslov: false });
    }
  }, [postaviOglasPolja.naslovOglasa && postaviOglasPolja.naslovOglasa]);
  //clear error message (IZABERI GRAD)
  useEffect(() => {
    if (postaviOglasPolja.grad) {
      setErrorPostaviOglas({ ...errorPostaviOglas, errMesto: false });
    }
  }, [postaviOglasPolja.grad && postaviOglasPolja.grad]);

  return (
    <>
      <div className="postaviOglasPage">
        <div className="container">
          <div className="backBtn">
            <Link to="/" ref={kategorijaRef}>
              <span>{<ArrowBackIosIcon />}</span> Povratak na početnu stranu
            </Link>
          </div>
          <form action="" className="postaviOglasForm">
            <h1>Postavi Oglas</h1>
            <div className="kategorija" ref={naslovRef}>
              <AutoComplete
                autocomplete={value.vrstaOglasa}
                onChangeOption={izaberiKategorijuChange}
                label="Izaberi Kategoriju"
                errorMesasge={errorPostaviOglas.errKategorija}
                errText={
                  errorPostaviOglas.errKategorija &&
                  "*Niste izabrali kategoriju"
                }
                // izaberi={postaviOglasPolja.izabranaKategorija}
              />
            </div>

            <div className="uploadImage">
              <DragDrop
                uploadedImages={postaviOglasPolja.uploadedImages}
                images={postaviOglasPolja.uploadedImages}
                changeFunction={dragDropImgonChange}
              />
            </div>

            <div className="naslovOglasaRadioBtns">
              <TextField
                name="naslovOglasa"
                id="outlined-basic"
                label="Naslov Oglasa"
                variant="outlined"
                onChange={textRadioCheckChange}
                error={errorPostaviOglas.errNaslov}
                helperText={
                  errorPostaviOglas.errNaslov && "*Niste uneli naslov oglasa"
                }
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  onChange={textRadioCheckChange}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="hitno"
                  name="ponudaPotraznja"
                >
                  <FormControlLabel
                    onChange={textRadioCheckChange}
                    name="hitno"
                    checked={postaviOglasPolja.hitno}
                    control={<Checkbox />}
                    label="Hitno"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="cenaDinEur">
              <TextField
                id="outlined-basic"
                label="Cena"
                variant="outlined"
                type="number"
                name="cena"
                onChange={textRadioCheckChange}
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={postaviOglasPolja.valuta}
                  onChange={textRadioCheckChange}
                  name="valuta"
                >
                  <FormControlLabel
                    value="din"
                    control={<Radio />}
                    label="Din"
                  />
                  <FormControlLabel
                    value="eur"
                    control={<Radio />}
                    label="Eur"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="selectFixnoZamena">
              <FormControlLabel
                onChange={textRadioCheckChange}
                name="fixno"
                checked={postaviOglasPolja.fixno}
                control={<Checkbox />}
                label="Fixno"
              />
              <FormControlLabel
                onChange={textRadioCheckChange}
                name="zamena"
                checked={postaviOglasPolja.zamena}
                control={<Checkbox />}
                label="Može zamena"
              />
            </div>

            <div className="textOglasa">
              <TextField
                label="Text Oglasa"
                id="filled-textarea"
                multiline
                variant="filled"
                rows={value.windowWidth < 768 ? 5 : 11}
                name="textOglasa"
                value={postaviOglasPolja.textOglasa}
                onChange={textRadioCheckChange}
              />
            </div>

            <div className="licniPodaci">
              <div className="userInfo">
                {" "}
                Lični podaci (<span>{value.user && value.user.email}</span>)
              </div>
              <div className="mestoGrad">
                <AutoComplete
                  onChangeOption={izaberiGradChange}
                  autocomplete={value.sviGradovi}
                  label="Izaberi Mesto"
                  errorMesasge={errorPostaviOglas.errMesto}
                  errText={
                    errorPostaviOglas.errMesto && "*Niste izabrali mesto"
                  }
                />
              </div>
              <div className="imeKorisnikaTelefon">
                <TextField
                  id="outlined-basic"
                  label="Ime korisnika"
                  variant="outlined"
                  value={postaviOglasPolja.imeKorisnika}
                  onChange={textRadioCheckChange}
                  name="imeKorisnika"
                  disabled
                />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Telefon opciono"
                  variant="outlined"
                  type="number"
                  value={postaviOglasPolja.telefon}
                  onChange={textRadioCheckChange}
                  name="telefon"
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="postaviOglasBtn"
              onClick={postaviOglasBtnClick}
            >
              {loading ? (
                <>
                  Postavljanje...
                  <CircularProgress />
                </>
              ) : (
                "Postavi oglas"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
