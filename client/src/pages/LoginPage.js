import React, { useContext } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import "../scss/_logIn-signup-Form.scss";
import "../scss/_global.scss";
import Button from "@mui/material/Button";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "react-bootstrap/Alert";
import GoogleButton from "react-google-button";

import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { StareStvariContext } from "../context";

export default function LoginPage() {
  const value = useContext(StareStvariContext);

  return (
    <>
      <div id="logInPage">
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
                      <h1 className="text-center">Ulogujte se</h1>
                      {value.errorAuthLogIn === true ? (
                        <Alert variant="danger">
                          <Alert.Heading>Pogrešni podaci!</Alert.Heading>
                          <p>
                            Pogrešno korisničko ime ili lozinka, molimo
                            pokušajte ponovo, ili se registrujte klikom{" "}
                            <span
                              onClick={value.clearLoginFields}
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                            >
                              ovde
                            </span>
                          </p>
                        </Alert>
                      ) : (
                        ""
                      )}
                      {value.errorAuthLogIn === 'ok' ? (
                        <Alert variant="success">
                          <Alert.Heading>Uspešno ste se ulogovali.</Alert.Heading>    
                        </Alert>
                      ) : (
                        ""
                      )}
                 
                      <ValidatorForm onSubmit={value.loginSubmit}>
                        <TextValidator
                          color="primary"
                          label="Unesite E-mail adresu"
                          onChange={value.loginOnChange}
                          name="loginEmail"
                          value={value.loginDetails.loginEmail}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            "ovo polje je obavezno",
                            "email nije validan",
                          ]}
                        />
                        <br />
                        <TextValidator
                          type="password"
                          label="Lozinka"
                          onChange={value.loginOnChange}
                          name="loginPassword"
                          value={value.loginDetails.loginPassword}
                          validators={["required"]}
                          errorMessages={["ovo polje je obavezno"]}
                          error={value.passwordValidate === true ? false : true}
                        />

                        {value.passwordValidate === true ? (
                          ""
                        ) : (
                          <p className="regExValidate">
                            Lozinka mora da sadrži minimum 8 karaktera od toga
                            mora da ima minimum 1 broj i minimum 1 slovo
                          </p>
                        )}
                        <br />
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="rememberMe"
                                onChange={value.loginOnChange}
                                checked={value.loginDetails.rememberMe}
                                sx={{
                                  color: "#993816",
                                  "&.Mui-checked": {
                                    color: "#993816",
                                  },
                                }}
                              />
                            }
                            label="Upamti me"
                          />
                        </FormGroup>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                          disabled={value.submited}
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
                          {(value.submited && "Logovanje") ||
                            (!value.submited && "Ulogujte se")}
                        </Button>
                      </ValidatorForm>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="lostPassword">
                            <a href="#">Lozinka zaboravljena? </a>
                          </div>
                        </div>
                      </div>
                      <GoogleButton
                        label="Ulogujte se putem G-maila "
                        style={{
                          width: "270px",
                          fontWeight: "600",
                          letterSpacing: ".9px",
                          fontSize: "13px",
                        }}
                        onClick={() => value.login()}
                        onMouseEnter={value.googleSingIn_hoverEnter}
                        onMouseLeave={value.googleSingIn_hoverOut}
                      />
                      {/* <div className="logsBtns">
                        <a href="#" className="logInBtn loginBtn--facebook" onClick={handlefacebookLogin}>
                          Ulogujte se putem Facebooka
                        </a>
                      </div> */}
                      <p className="mt-5 registerFree">
                        Nemaš nalog?
                        <Link className="register" to="/registracija">
                          Registrujte se besplatno
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 coll col-xl-6">
                    <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-4 text-white">
                      <h2 className="position-relative">Dobrodošli</h2>
                      <p>
                        Najbolji web sajt za prodaju antikviteta, starina,
                        retkih i zaboravljenih stvari. Registrujte se besplatno
                        i započnite svoju prodaju.
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
