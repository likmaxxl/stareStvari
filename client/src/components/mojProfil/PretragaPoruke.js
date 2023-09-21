import React from "react";
import "../../scss/mojProfil/_pretragaPoruke.scss";
import SearchIcon from "@mui/icons-material/Search";

export default function PretragaPoruke() {
  return (
    <>
      <div className="searchInputWrapper">
        <div className="search-wrapper">
          <SearchIcon className="search-icon searchInputIcon" />
          <input type="text" className="search" placeholder="Pretraži poruke . . ." />
          <button className="search-button">Pretraži</button>
        </div>
        <p>Unesie email od korisnika ili naslov oglasa.</p>
      </div>
    </>
  );
}
