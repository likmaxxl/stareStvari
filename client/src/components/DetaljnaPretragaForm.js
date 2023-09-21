import React, { useState, useContext } from "react";
import { StareStvariContext } from "../context";
import {
  TextField,
  Autocomplete,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function DetaljnaPretragaForm() {
  const value = useContext(StareStvariContext);

  const [otvoriDetalje, setOtvoriDetalje] = useState(false);
  const [clickedOtvoriDetalje, setClickedOtvoriDetalje] = useState(false);
  const otvoriDetaljeFunction = (e) => {
    e.preventDefault();
    setOtvoriDetalje(!otvoriDetalje);
    setClickedOtvoriDetalje(true);
  };
  console.log(otvoriDetalje);

  return (
    <>
      <div className="detaljnaPretragaForm">
        <div className="openCloseDetalji">
          <button
            className={
              otvoriDetalje ? "hotButton activeOtvoriPretraguBtn" : "hotButton"
            }
            onClick={otvoriDetaljeFunction}
          >
            {otvoriDetalje ? "Zatvori " : "Otvori "}detaljnu pretragu{" "}
            <span>
              <SearchIcon />
            </span>
          </button>
        </div>
        <div className="detaljnaPretragaAnimeBox">
          <div
            className={
              clickedOtvoriDetalje
                ? otvoriDetalje
                  ? "detaljiInputsBox animated bounceInDown"
                  : "animated bounceOutUp detaljiInputsBox"
                : "displayNoneSearchForm"
            }
          >
            <div className="flexBox">
              <div className="pretragaPoNaslovu">
                <TextField
                  onChange={value.onChangePretragaInputs}
                  name="naslovOglasa"
                  value={value.naslovOglasa}
                  id="outlined-basic"
                  label="Naslov Oglasa"
                  variant="outlined"
                  autoComplete='off'
                />
              </div>
              <div className="vrstaOglasa">
                <Autocomplete
                  limitTags={1}
                  onChange={value.vrstaOglasaOnChange}
                  multiple
                  id="checkboxes-tags-demo"
                  options={value.vrstaOglasa}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vrsta Oglasa"
                      placeholder="Unesite reč za pretragu"
                    />
                  )}
                />
              </div>
            </div>
            <div className="flexBox">
              <div className="detaljiCena">
                <TextField
                  id="outlined-basic"
                  label="Cena od"
                  variant="outlined"
                  type="number"
                  name="cenaOd"
                  value={value.pretragaPopunjenaPolja.cenaOd}
                  onChange={value.onChangePretragaInputs}
                />
                <TextField
                  id="outlined-basic"
                  label="Cena do"
                  variant="outlined"
                  type="number"
                  name="cenaDo"
                  value={value.pretragaPopunjenaPolja.cenaDo}
                  onChange={value.onChangePretragaInputs}
                />
              </div>
              <div className="formRadio">
                <RadioGroup
                  onChange={value.onChangePretragaInputs}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="din"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="din"
                    control={<Radio />}
                    name="valuta"
                    label="Din"
                  />
                  <FormControlLabel
                    value="eur"
                    control={<Radio />}
                    name="valuta"
                    label="Eur"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="flexBox">
              <div className="izaberiRegion">
                <Autocomplete
                  onChange={value.izaberiRegionOnChange}
                  limitTags={1}
                  multiple
                  id="checkboxes-tags-demo1"
                  options={value.velikeRegije}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Izaberi Region"
                      placeholder="Unesite reč za pretragu"
                    />
                  )}
                />
              </div>
              <div className="izaberiMesto">
                <Autocomplete
                  onChange={value.izaberiMestoOnChange}
                  disablePortal
                  id="combo-box-demo2"
                  options={
                    value.gradoviRegiona && value.gradoviRegiona.length > 0
                      ? value.gradoviRegiona
                      : value.sviGradovi
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Izaberi Mesto" />
                  )}
                />
              </div>
            </div>
            <div className="dugmePretrage">
                <button className="pretraziBtn" onClick={value.pretragaOglasaClick}>Pretraži    <span>
              <SearchIcon />
            </span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
