import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StareStvariContext } from "../context";
import { OglasGrid } from "../components/OglasGrid";

export default function KategorijaPage() {
  let { kategorija } = useParams();
  const value = useContext(StareStvariContext);
  console.log(value.sviOglasi);
  const [sviOglasi, setSviOglasi] = useState();

  useEffect(() => {
    const sviOglasi =
      value.sviOglasi &&
      value.sviOglasi
        .filter((all) => all.izabranaKategorija === kategorija)
        .map((all) => {
          return all;
        });
    console.log(sviOglasi);
    setSviOglasi(sviOglasi);
  }, []);
  return (
    <>
      <div className="kategorijaPage">
        <div className="container">
          <div className="row">
            {sviOglasi &&
              sviOglasi.map((all) => {
                return <OglasGrid key={all.id} {...all} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
