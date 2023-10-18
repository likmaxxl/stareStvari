import React, { useContext, useRef, useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { StareStvariContext } from "../context";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Alert from "react-bootstrap/Alert";
import axios from "axios";



import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { BookSharp } from "@mui/icons-material";

export default function SignupPage() {
  const formRef = useRef();//useRef("form")
  const value = useContext(StareStvariContext);

  console.log(value.postaviOglasPolja);

  const [registracijaDetails, setRegistracijaDetails] = useState({
    regEmail: "",
    regName: "",
    regPassword: "",
    regRepeatPassword: "",
    googleUserDataSub: "",
    registrationDate: "",
    mojiOglasi:"",
    negativneOcene: 0,
    pozitivneOcene: 0,
    poruke: [],
    oglasiKojePratim:[],
    lastLogin: "",
  });
  const [regPassValidate, setRegPassValidate] = useState(true);
  const [submitedRegister, setSubmitetRegister] = useState(false);
  const [axiosError,setAxiosError]=useState()

  const registarOnChange = (e) => {
  
    // if(allDataGetFromDb){
    //   console.log(JSON.parse(allDataGetFromDb[0].mojiOglasi));
    // }
    
console.log(formRef.current);

    if (e.target.name === "regPassword") {
      formRef.current.isFormValid(false);
      console.log(e.target.value);
      if (e.target.value != "") {
        var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const testPattern = pattern.test(e.target.value);
        setRegPassValidate(testPattern);
      } else {
        setRegPassValidate(true);
      }
    }

    if (ValidatorForm.hasValidationRule("isPasswordMatch")) {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    }

    setRegistracijaDetails({
      ...registracijaDetails,
      [e.target.name]: e.target.value,
    });

    axios.get("http://localhost:3001/svi-korisnici").then(function (response) {
      // console.log(response.data.data);
      setAllDataGetFromDb(response.data.data);
    })
    .catch((err) => setAxiosError(err));

  };




  //REGISTAR ON CLICK

  const today = new Date();
  let date =
    today.getDate() +
    "." +
    (today.getMonth() + 1) +
    "." +
    today.getFullYear() +
    ". " +
    today.getHours() +
    ":" +
    today.getMinutes();
  const timeOfRegistration = date;
  const [allDataGetFromDb, setAllDataGetFromDb] = useState();
  const [duplicateEmail, setDuplicateEmail] = useState();
  const [errorAuth, setErrorAuth] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(allDataGetFromDb&&allDataGetFromDb);

  console.log(duplicateEmail && duplicateEmail);
  const registerSubmit = (e) => {
    
    e.preventDefault();
    var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const testPattern = pattern.test(registracijaDetails.regPassword);

    if (testPattern) {
      if (duplicateEmail&&duplicateEmail.length === 0 && duplicateEmail!="undefined") {
        setLoading(true);
        setErrorAuth("ok");

        axios
          .post("http://localhost:3001/addUser", {
            regEmail: registracijaDetails.regEmail,
            regName: registracijaDetails.regName,
            regPassword: registracijaDetails.regPassword,
            regRepeatPassword: registracijaDetails.regRepeatPassword,
            googleUserDataSub: registracijaDetails.googleUserDataSub,
            registrationDate: timeOfRegistration,
            lastLogin: "",
            mojiOglasi:[],
            poruke:"",
            oglasiKojePratim:[],
            pozitivneOcene: 0,
            negativneOcene: 0,
            
          })
          .then((response) => {
            console.log(response);
         
          })
         







  //   axios.post('http://localhost:3001/send_email',{
  //     regEmail:registracijaDetails.regEmail,
  //     regName:registracijaDetails.regName,
  //     regPassword:registracijaDetails.regPassword
  //   })
  // .then(res=>{
  // console.log('send!');
  // })
  // .catch(()=>{
  // console.log('MessageNotrSEnd');
  // }) TREBA!!!!!


        setRegistracijaDetails({
          ...registracijaDetails,
          regEmail: "",
          regName: "",
          regPassword: "",
          regRepeatPassword: "",
          googleUserDataSub: "",
        });
      
        window.location.href="http://localhost:3000/login";

        setLoading(false);
      } else {
        // alert('there is a same email adress you can not sign up')
        if(axiosError&&axiosError.message==="Network Error"){
          setErrorAuth('Greška! Proverite vašu internet konekciju i osvežite stranicu.')
        }
        if(axiosError&&axiosError.message==="Request failed with status code 400"){
          setErrorAuth('Greška! Neispravan zahtev.')
        }
        else{
          setErrorAuth(
            "Korisnik " +
              registracijaDetails.regEmail +
              " je već registrovan.Pokušajte sa drugom email adresom."
          );
        }
    
      }
    }


  };









  const handlePaste = event => {

    if(!registracijaDetails.regEmail){
  
      setRegistracijaDetails({
        ...registracijaDetails,
        regEmail:event.clipboardData.getData('text')
      })
    }
   
  };

  //proverava da li vec postoji email adresa u bazi podataka
  useEffect(() => {
    if (allDataGetFromDb) {
      let filteredUsers =
        allDataGetFromDb &&
        allDataGetFromDb.filter((user) => {
          return user.regEmail === registracijaDetails.regEmail;
        });
      setDuplicateEmail(filteredUsers);
      console.log(filteredUsers);
    }
    console.log(allDataGetFromDb);
  }, [registracijaDetails.regEmail]);

  console.log(registracijaDetails.regEmail);
  // custom rule will have name 'isPasswordMatch'
  if (!ValidatorForm.hasValidationRule("isPasswordMatch")) {
    ValidatorForm.addValidationRule("isPasswordMatch", (values) => {
      if (values !== registracijaDetails.regPassword) {
        return false;
      }
      return true;
    });
  }

  return (
    <>
      <div id="signUp">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-md-12 col-lg-9 col-xl-12">
              <div className="backBtn">
                <Link to="/">
                  <span>{<ArrowBackIosIcon />}</span> Povratak na početnu stranu
                </Link>
              </div>
              <div className="AppForm">
                <div className="row">
                  <div className="coll col-md-12 col-xl-6 d-flex justify-content-center align-items-center">
                    <div className="AppFormLeft">
                      <h1 className="text-center">Registrujte se</h1>
                      {errorAuth && (
                        <Alert
                          variant={errorAuth == "ok" ? "primary" : "danger"}
                        >
                          {errorAuth == "ok" ? (
                            <p>
                              Uspesno ste se registrovali! Možete da se
                              ulogujete klikom na{" "}
                              <Link to="/login">ovaj link</Link>
                            </p>
                          ) : (
                            errorAuth
                          )}
                        </Alert>
                      )}
                      <ValidatorForm onSubmit={registerSubmit} ref={formRef}>
                        {/* {ValidatorForm.hasValidationRule('isPasswordMatch') ? 'true' : 'false'} */}

                        <TextValidator
                     
                          label="E-mail adresa"
                          onChange={registarOnChange}
                          name="regEmail"
                          value={registracijaDetails.regEmail}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            "ovo polje je obavezno",
                            "email nije validan",
                          ]}
                          autoComplete="off"
                          onPaste={handlePaste}
                        />
                        <br />
                        
                        <TextValidator
                          label="Ime"
                          onChange={registarOnChange}
                          name="regName"
                          value={registracijaDetails.regName}
                          validators={["required"]}
                          errorMessages={["ovo polje je obavezno"]}
                        />
                        <br />
                        <TextValidator
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={value.signupShowHidePassClick}
                                  edge="end"
                                >
                                  {value.signupShowHidePassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          type={
                            value.signupShowHidePassword ? "text" : "password"
                          }
                          label="Lozinka"
                          onChange={registarOnChange}
                          name="regPassword"
                          value={registracijaDetails.regPassword}
                          validators={["required"]}
                          errorMessages={["ovo polje je obavezno"]}
                          error={regPassValidate === true ? false : true}
                        />
                        {regPassValidate === true ? (
                          ""
                        ) : (
                          <p className="regExValidate">
                            Lozinka mora da sadrži minimum 8 karaktera od toga
                            mora da ima minimum 1 broj i minimum 1 slovo
                          </p>
                        )}
                        <br />

                        <TextValidator
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={value.signupShowHideConfirmClick}
                                  edge="end"
                                >
                                  {value.signupShowHideConfirm ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          type={
                            value.signupShowHideConfirm ? "text" : "password"
                          }
                          label="Ponovi Lozinku"
                          onChange={registarOnChange}
                          name="regRepeatPassword"
                          value={registracijaDetails.regRepeatPassword}
                          validators={["isPasswordMatch", "required"]}
                          errorMessages={[
                            "lozinke se ne podudaraju",
                            "ovo polje je obavezno",
                          ]}
                        />

                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                          value="Send"
                          disabled={submitedRegister}
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: " 17px",
                            letterSpacing: "1.1px",
                            background: "#993816",
                            fontWeight: "600",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "7px 0px",
                            textDecoration: "none",
                            cursor: "pointer",
                            width: "90%",
                            borderRadius: "4px",
                            border: "solid 1px #993816",
                            margin: "0 auto",
                            transition: "all .3s",

                            "&:hover": {
                              transition: "all .3s",
                              background: "white",
                              color: "#993816",
                            },
                          }}
                        >
                          {(submitedRegister && "Logovanje") ||
                            (!submitedRegister && "Registrujte se")}
                        </Button>
                      </ValidatorForm>

                      <p className="mt-5 registerFree">
                        Već ste registrovani?
                        <Link className="register" to="/login">
                          Ulogujte se
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 coll col-xl-6">
                    <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-4 text-white">
                      <h2 className="position-relative">Dobrodošli</h2>
                      <p>
                        Najveći web sajt za prodaju antikviteta, starina, retkih
                        i zaboravljenih stvari. Registrujte se besplatno i
                        započnite svoju prodaju.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
