import React,{useContext} from 'react'
import { StareStvariContext } from "../context";
import '../scss/_drugaNavigacijaVisestranicna.scss'

export  function PretragaDrugaVisestranicna() {

    const value = useContext(StareStvariContext);
  return (
 <>
 <div className="hotDealsNavigation">
            <button
              onClick={value.hitnoOnClickNavigacija}
              className={
                value.trenutniKliknutiElement === "Svi Oglasi"
                  ? "hotButton activeClassHotDeals"
                  : "hotButton"
              }
            >
              Svi Oglasi
            </button>
            <button
              onClick={value.hitnoOnClickNavigacija}
              className={
                value.trenutniKliknutiElement === "Najnoviji"
                  ? "hotButton activeClassHotDeals"
                  : "hotButton"
              }
            >
              Najnoviji
            </button>
            <button
              onClick={value.hitnoOnClickNavigacija}
              className={
                value.trenutniKliknutiElement === "Bez cene"
                  ? "hotButton activeClassHotDeals"
                  : "hotButton"
              }
            >
              Bez cene
            </button>
            <button
              onClick={value.hitnoOnClickNavigacija}
              className={
                value.trenutniKliknutiElement === "Stariji od mesec dana"
                  ? "hotButton activeClassHotDeals"
                  : "hotButton"
              }
            >
              Stariji od mesec dana
            </button>
          </div>
 </>
  )
}
