import React, { useContext,useEffect,useState } from "react";
import { StareStvariContext } from "../context";
import axios from 'axios'
import {OglasGrid} from "../components/OglasGrid";
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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import  {PretragaDrugaVisestranicna} from '../components/PretragaDrugaVisestranicna'
import  {DetaljnaPretragaForm} from '../components/DetaljnaPretragaForm'
import '../scss/_home.scss'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function Home() {
  const value = useContext(StareStvariContext);

//   const [f,setF]=useState()


//   useEffect(()=>{
// axios.get('https://starestvariloginsignup-default-rtdb.firebaseio.com/sviPodaci.json')
// .then(response=>{
//   // console.log(response.data);
// const responseArray=[]

// for (let key in response.data.sviOglasi) {
//   responseArray.push({...response.data.sviOglasi[key],id:key})
// }
//   setF(responseArray)
// })
// .catch((err)=>{
//   console.log(err);
// })


//   },[])
// console.log(f);
// console.log(value.allDataFromDatabase);
  return (
    <>
  
      <section id="cover">
        <div className="coverBackground">
          <form action="" onChange={value.onChangePretragaInputs}>
            <h2>Pretraži Oglase</h2>
            <p>Ne moraju sva polja da se popune</p>
            <div className="formBox">
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={value.vrstaOglasa}
                getOptionLabel={(option) => option}
                onChange={value.onChangePretragaInputs}
                renderInput={(params) => (
                  <TextField {...params} label="Vrsta Oglasa" name="vrstaOglasa"/>
                )}
              /> */}

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

              <TextField
           
                id="outlined-basic"
                label="Cena od"
                variant="outlined"
                type="number"
                name="cenaOd"
                value={value.pretragaPopunjenaPolja.cenaOd}
              />
              <TextField
                id="outlined-basic"
                label="Cena do"
                variant="outlined"
                type="number"
                name="cenaDo"
                value={value.pretragaPopunjenaPolja.cenaDo}
              />
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
            <div className="formBox">
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo1"
                options={value.velikeRegije}
                renderInput={(params) => (
                  <TextField {...params} label="Izaberi Region" />
                )}
              /> */}
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
            <div className="pretragaPoNaslovu">
              <TextField onChange={value.onChangePretragaInputs} name="naslovOglasa"
              value={value.naslovOglasa} id="outlined-basic" label="Naslov Oglasa" variant="outlined" />
              </div>
            <div className="submitBtn">
              <Button
                variant="contained"
                endIcon={<SearchOutlinedIcon />}
                onClick={value.pretragaOglasaClick}
              >
                Pretraga
              </Button>
            </div>
          </form>
        </div>
        {/* <video autoPlay loop muted id="myVideo">
         
          <source
            src="https://player.vimeo.com/external/493750333.sd.mp4?s=428ed5505cab4ae3ab5c4f7491fabc021440eba8&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video> */}
  {/* <img src="https://images.pexels.com/photos/4913340/pexels-photo-4913340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
  {/* <img src="https://images.pexels.com/photos/951531/pexels-photo-951531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
      </section>

      <section className="adsBanner">
        <div className="container">
          <div className="adsBannerBanner">
            Ako imate jednu ili više stvari za prodaju,nema boljeg mesta od {" "}
            <a href="#">starestvari.rs</a> ,ovo je pravo mesto za prodaju i
            kupovinu antikviteta.
          </div>
        </div>
      </section>
  
<section className="homeDrugaPretraga">

<PretragaDrugaVisestranicna/>
<DetaljnaPretragaForm/>
</section>

  <section className="sviOglasi">
<div className="container">
  <div className="row">
 {  value.sviOglasi&&value.sviOglasi.length>0?value.sviOglasi.map((sviOglasi)=>{       
         return <OglasGrid key={sviOglasi.id}
         {...sviOglasi} />    
    }):"Loading"} 
 
  </div>
</div>
  </section>
    </>
  );
}
