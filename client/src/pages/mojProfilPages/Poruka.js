import React from "react";
import Checkbox from "@mui/material/Checkbox";
import "../../scss/mojProfil/_mojaPoruka.scss";
import { Link } from "react-router-dom";

export default function Poruka() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <div className="poruka">
        <div className="porukaEmailCheckBox">
          <Checkbox {...label} />
          <Link to="/konverzacija">
            {" "}
            <div className="porukaEmail">malikalkhafaji@gmail.com</div>{" "}
          </Link>
        </div>
        <Link to="/konverzacija">
          <div className="porukaNaslovOglasa">iphone 6</div>
          <div className="porukaTtextOglasa">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
            excepturi debitis fugit minima quasi facere molestias magni dolorem
            reiciendis rerum!
          </div>
          <div className="porukaDatum">23.11.2022</div>
        </Link>
      </div>
    </>
  );
}
