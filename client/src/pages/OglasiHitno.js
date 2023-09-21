import React, { useContext } from "react";
import { OglasGrid } from "../components/OglasGrid";
import { StareStvariContext } from "../context";
import { DetaljnaPretragaForm } from "../components/DetaljnaPretragaForm";
import { PretragaDrugaVisestranicna } from "../components/PretragaDrugaVisestranicna";
import "../scss/_oglasiHitnoPage.scss";

export default function OglasiHitno() {
  const value = useContext(StareStvariContext);
  const sviOglasiBaza = value.sviOglasi;
  const sviOglasiHitno = sviOglasiBaza&&sviOglasiBaza.filter((all) => all.hitno == true);


  return (
    <>
      <section className="hotDeals">
        <div className="container">
          <div className="header">
            <div className="oldLetters">
              <p> Pažljivo pogledajte</p>
              <img src="images/icon_bettwen.png" alt="icon" />
            </div>
            <h3>
              <span className="neon">
                H<span className="flicker-slow">I</span>T
                <span className="flicker-fast">N</span>O
              </span>
            </h3>
          </div>
          <PretragaDrugaVisestranicna />
          <div className="pretragaDetalji">
            <DetaljnaPretragaForm />
          </div>
          <div className="oglasiHitno">
            <div className="row">
              {sviOglasiHitno ?
                sviOglasiHitno.map((all) => {
                  return <OglasGrid {...all} key={all.id} />;
                }):"Loading"}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
