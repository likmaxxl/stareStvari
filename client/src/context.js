import { createContext, useState, useEffect } from "react";
import { sviProduktiPretraga } from "./json-files/SviProduktiZaPretragu";
import { SviGradovi } from "./json-files/SviGradovi";
import axios from "axios";
// import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; //google login
export const StareStvariContext = createContext("");

export const StareStvariProvider = (props) => {
  //MEDIA QUERY FUNCTION ON WINDOW WIDTH
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  /*********************GET ALL DATA FROM DATABASE MONGO DB */
  const [allDataFromDatabase, setAllDataFromDatabase] = useState();
  const [potvrdiBrisanje, setPotvrdiBrisanje] = useState(false);
  const [googleBtnHover, setGoogleBtnHover] = useState(false);
  const [heartCheck, setHeartCheck] = useState(false);
  //CUSTOM LOGIN SUBMIT BUTTON
  const [errorAuthLogIn, setErrorAuthLogIn] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    let allData = "";
    axios.get(`http://localhost:3001/svi-korisnici`).then((res) => {
      const persons = res.data.data;
      //  console.log(res.data);
      allData = res.data.data;
      setAllDataFromDatabase(allData);
      console.log("allData from database!");
    });
  }, [user, potvrdiBrisanje, googleBtnHover, errorAuthLogIn, heartCheck]);
  // console.log(allDataFromDatabase && allDataFromDatabase);
  /*********************END GET ALL DATA FROM DATABASE MONGO DB */

  /**GET SVI OGLASI IZ BAZE */
  const [sviOglasi, setSviOglasi] = useState();
  useEffect(() => {
    setLoading(true);
    let allData = "";
    axios.get(`http://localhost:3001/svi-oglasi`).then((res) => {
      allData = res.data;

      setLoading(false);
      setSviOglasi(allData && allData.data);
    });
  }, [potvrdiBrisanje, heartCheck]);
  //userOglasiKojePratim&&userOglasiKojePratim.length>0&&userOglasiKojePratim[0][0].id
  /**END GET SVI OGLASI IZ BAZE */

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  });
  //END MEDIA QUERY FUNCTION ON WINDOW WIDTH

  const [sviProdukti, setSviProdukti] = useState(sviProduktiPretraga.sort());
  const [svaMesta, setSvaMesta] = useState(SviGradovi); //KOMPLET SVA MESTA SA REGIJAMA
  const [vrstaOglasa, setVrstaOglasa] = useState(sviProduktiPretraga);

  /***INPUT POLJA VRSTA OGLASA, SVA MESTA I REGIJE FILTER BEZ DUPLIKATA */
  let sviProduktiBezDuplikata = [...new Set(sviProdukti)];

  //SVE VELIKE REGIJE
  const svaMestaVelikeRegije = svaMesta.map((all) => {
    return all.county;
  });
  let velikeRegijeBezDuplikata = [...new Set(svaMestaVelikeRegije)];
  const [velikeRegije, setVelikeRegije] = useState(
    velikeRegijeBezDuplikata.sort()
  );
  //SVI GRADOVI
  const svaMestaVelikeGradovi = svaMesta.map((all) => {
    return all.city;
  });
  let gradoviBezDuplikata = [...new Set(svaMestaVelikeGradovi)];
  const [sviGradovi, setSviGradovi] = useState(gradoviBezDuplikata);

  /**********PRETRAGA***********/
  const [pretragaPopunjenaPolja, setPretragaPopunjenaPolja] = useState({
    vrstaOglasa: "",
    cenaOd: "",
    cenaDo: "",
    valuta: "din",
    region: "",
    mesto: "",
    naslovOglasa: "",
  });

  const onChangePretragaInputs = (e) => {
    //CENA OD CENA DO DIN EUR
    const name = e.target.name;
    const value = e.target.value;
    setPretragaPopunjenaPolja({ ...pretragaPopunjenaPolja, [name]: value });
  };

  //VRSTA OGLASA
  const vrstaOglasaOnChange = (e, v) => {
    setPretragaPopunjenaPolja({ ...pretragaPopunjenaPolja, vrstaOglasa: v });
  };

  //IZABERI REGION

  const [gradoviRegiona, setGradoviRegiona] = useState("");
  const izaberiRegionOnChange = (e, v) => {
    setPretragaPopunjenaPolja({ ...pretragaPopunjenaPolja, region: v });
    //GRADOVI NA OSNOVU IZABRANOG REGIONA
    const filtriraniGradoviObjekti = svaMesta.filter((all) =>
      v.includes(all.county)
    );

    const filtriraniGradoviNazivi = filtriraniGradoviObjekti.map((all) => {
      return all.city;
    });
    setGradoviRegiona(filtriraniGradoviNazivi && filtriraniGradoviNazivi);
  };
  //IZABERI MESTO
  const izaberiMestoOnChange = (e, v) => {
    setPretragaPopunjenaPolja({ ...pretragaPopunjenaPolja, mesto: v });
  };

  //NASLOV OGLASA CHANGE
  const naslovOglasaOnChange = (e) => {
    // console.log(e.target);
  };

  useEffect(() => {
    const sviOglasiCopy = sviOglasi && [...sviOglasi];
    const filteredData =
      sviOglasiCopy &&
      sviOglasiCopy.filter(
        (item) =>
          pretragaPopunjenaPolja &&
          pretragaPopunjenaPolja.vrstaOglasa.some(
            (value) =>
              item.izabranaKategorija.includes(value) ||
              (item.cena >= pretragaPopunjenaPolja.cenaOd &&
                item.cena <= pretragaPopunjenaPolja.cenaDo)
          )
      );

    // console.log(pretragaPopunjenaPolja);
    // setSviOglasi(vrstaOglasa)
  }, [pretragaPopunjenaPolja.vrstaOglasa]);

  //KADA SE KLIKNE NA PRETRAGU DOBIJAMO INFORMACIJE IZ SVIH INPUT POLJA
  const [vrednostiIzInputPoljaPretrage, setVrednostiIzInputPoljaPretrage] =
    useState();

  const pretragaOglasaClick = (e) => {
    e.preventDefault();
    setVrednostiIzInputPoljaPretrage(pretragaPopunjenaPolja);

    //ovo radi ali nije bas najbolje
    // for (let index = 0; index < pretragaPopunjenaPolja.vrstaOglasa.length; index++) {
    //   const element = pretragaPopunjenaPolja.vrstaOglasa[index];
    //   const vrstaOglasa=sviOglasi.filter((all=>all.izabranaKategorija===element))
    //   console.log(vrstaOglasa);
    //   setSviOglasi(vrstaOglasa)
    // }
  };

  /**********KRAJ PRETRAGA***********/
  // console.log(vrednostiIzInputPoljaPretrage);

  /**********************SHARE ****************/
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    console.log("deleted");
  };

  /**********************END SHARE ****************/

  /*****************NAVIGACIJA ZA NAZNAKOM HITNO HOME PAGE*******************/
  const [trenutniKliknutiElement, setTrenutniKliknutiElement] =
    useState("Svi Oglasi");
  const hitnoOnClickNavigacija = (e) => {
    e.preventDefault();
    setTrenutniKliknutiElement(e.target.textContent);
  };

  /*****************KRAJ NAVIGACIJA ZA NAZNAKOM HITNO HOME PAGE*******************/

  /***********LOGIN SIGNUP AUTH**********/
  // const [googleLoginUserData,setGoogleLoginUserData]=useState({//google
  //   loginGoogleEmail:"",
  //   loginGoogleTime:"",
  //   googleUserDataSub:""
  // })

  const [logUserData, setLogUserData] = useState({
    regEmail: "",
    regName: "",
    regPassword: "",
    regRepeatPassword: "",
    googleUserDataSub: "",
    registrationDate: "",
    mojiOglasi: "",
    negativneOcene: 0,
    pozitivneOcene: 0,
    poruke: [],
    oglasiKojePratim: [],
    lastLogin: "",
    rememberMe: false,
  });

  //GOOGLE SIGN IN
  const timeOfLogin = new Date();
  // const login = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       const data = await axios.get(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer${response.access_token}`,
  //           },
  //         }
  //       );

  //       setLogUserData({
  //         ...logUserData,
  //         regEmail: data.data.email,
  //         regName: "",
  //         regPassword: "",
  //         regRepeatPassword: "",
  //         googleUserDataSub: data.data.sub,
  //         registrationDate: timeOfLogin,
  //         mojiOglasi:[],
  //         negativneOcene: 0,
  //         pozitivneOcene: 0,
  //         poruke: [],
  //         oglasiKojePratim:[],
  //         lastLogin: timeOfLogin,
  //         rememberMe: false
  //       });

  //     } catch (err) {
  //       console.log(err);
  //     }
  //     axios.post("http://localhost:3001/addUser", {
  //       regEmail:logUserData.regEmail,
  //       regName:"",
  //       regPassword:"" ,
  //       regRepeatPassword:"",
  //       googleUserDataSub: logUserData.googleUserDataSub,
  //       registrationDate: timeOfLogin,
  //       lastLogin: "",
  //       mojiOglasi:[],
  //       poruke:"",
  //       oglasiKojePratim:"",
  //       pozitivneOcene: 0,
  //       negativneOcene: 0,

  //     })
  //     .then((response) => {
  //       console.log(response);

  //     })
  //   },
  // });

  //google login put data to database

  //on hover
  const googleSingIn_hoverEnter = () => {
    setGoogleBtnHover(true);
  };

  const googleSingIn_hoverOut = () => {
    setGoogleBtnHover(false);
  };

  // useEffect(()=>{
  // console.log(allDataFromDatabase&&allDataFromDatabase);

  // if(logUserData.regEmail!="" && logUserData.googleUserDataSub!=""){

  // }

  // },[logUserData.regEmail])

  //LOGIN CUSTOM USERNAME AND PASSWORD
  const [loginDetails, setLoginDetails] = useState({
    loginEmail: "",
    loginPassword: "",
    rememberMe: false,
    loginTime: "",
  });

  const [filteredUser, setFilteredUser] = useState();

  const [submited, setSubmitet] = useState(false); //onChange
  const [submitedLoginDetails, setSubmitedLoginDetails] = useState(""); //login detalji na klik
  const [passwordValidate, setPasswordValidate] = useState(true);

  const loginOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setLoginDetails({ ...loginDetails, [e.target.name]: e.target.checked });
    } else {
      setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    }
    if (e.target.name == "loginPassword") {
      if (e.target.value != "") {
        var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const testPattern = pattern.test(e.target.value);
        setPasswordValidate(testPattern);
      } else {
        setPasswordValidate(true);
      }
    }
  };

  //get data from database and filter if the data from login input fields same as database (onchange hendler)
  useEffect(() => {
    if (allDataFromDatabase) {
      let filteredData = allDataFromDatabase.filter(
        (all) =>
          all.regEmail === loginDetails.loginEmail &&
          all.regPassword === loginDetails.loginPassword
      );
      setFilteredUser(filteredData);
    }
    // console.log(user);
    const userDataLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataLocalStorage) {
      let filteredData =
        allDataFromDatabase &&
        allDataFromDatabase.filter(
          (all) => all.email === userDataLocalStorage.email
        );

      setErrorAuthLogIn("ok");
      setFilteredUser(filteredData);
    }
  }, [loginDetails.loginEmail, loginDetails.loginPassword]);

  /**********SVI PODACI TRENUTNOG KORISNIKA I SVI OGLASI KORISNIKA */

  const [currentUserData, setCurrentUserData] = useState();
  const [mojiOglasi, setMojiOglasi] = useState([]);
  useEffect(() => {
    if (allDataFromDatabase && user && user.email) {
      let filteredData =
        allDataFromDatabase &&
        allDataFromDatabase.filter((all) => all.regEmail === user.email);
      if (allDataFromDatabase && allDataFromDatabase.length > 0) {
        setCurrentUserData(filteredData && filteredData);
        setMojiOglasi(filteredData && filteredData[0].mojiOglasi);
      }
    }
  }, [allDataFromDatabase, potvrdiBrisanje]);
  // console.log(allDataFromDatabase&&allDataFromDatabase);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
    if (loginDetails.loginPassword && passwordValidate === true) {
      let loginTime = new Date();
      setLogUserData({
        ...loginDetails,
        userDataEmail: loginDetails.loginEmail,
        userDataPassword: loginDetails.loginPassword,
        googleUserDataSub: "",
        lastLogin: timeOfLogin,
      });

      if (filteredUser && filteredUser.length > 0) {
        setLoading(true);
        setErrorAuthLogIn("ok");

        const user = {
          email: loginDetails.loginEmail,
          id: filteredUser && filteredUser.length > 0 && filteredUser[0]._id,
        };

        //post login current time to the database
        // axios.post('http://localhost:3001/sviKorisnici/',{
        //   lastLogin:"ss"
        // })
        // .then(res=>{
        // console.log('send');
        // })
        // .catch(()=>{
        // console.log('MessageNotrSEnd');
        // })

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        setLoading(false);
      } else {
        setErrorAuthLogIn(true);
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (JSON.parse(localStorage.getItem("user")) === null) {
      setUser(null);
    } else {
      setUser(user);
    }
  }, []);

  //bootstrap alert kod pogresnih podataka i klik funkcija koja brise iz input fields
  const clearLoginFields = (e) => {
    e.preventDefault();
    setLoginDetails({
      ...loginDetails,
      loginEmail: "",
      loginPassword: "",
    });
    setErrorAuthLogIn(false);
    navigate("/registracija");
  };

  /********************END SIGN IN***********/

  //GOOGLE SIGN IN
  // const timeOfLogin = new Date();
  const [googleLogData, setGoogleLogData] = useState({
    regEmail: "",
    regName: "",
    regPassword: "",
    regRepeatPassword: "",
    googleUserDataSub: "",
    registrationDate: "",
    mojiOglasi: [],
    negativneOcene: 0,
    pozitivneOcene: 0,
    poruke: [],
    oglasiKojePratim: [],
    lastLogin: "",
    rememberMe: false,
  });

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setLoading(true);
        const data = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer${response.access_token}`,
            },
          }
        );

        setGoogleLogData({
          ...googleLogData,
          regEmail: data.data.email,
          regName: "",
          regPassword: "",
          regRepeatPassword: "",
          googleUserDataSub: data.data.sub,
          registrationDate: timeOfLogin,
          mojiOglasi: [],
          negativneOcene: 0,
          pozitivneOcene: 0,
          poruke: [],
          oglasiKojePratim: [],
          lastLogin: timeOfLogin,
          rememberMe: false,
        });

        let filteredEmail =
          allDataFromDatabase &&
          allDataFromDatabase.filter((all) => {
            return all.regEmail === data.data.email;
          });

        const user = {
          email: data.data.email,
          id: filteredEmail && filteredEmail.length > 0 && filteredEmail[0]._id,
        };

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setErrorAuthLogIn("ok");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    setLoading(true);
    if (googleLogData.regEmail) {
      let filteredEmail =
        allDataFromDatabase &&
        allDataFromDatabase.filter((all) => {
          return all.regEmail === googleLogData.regEmail;
        });

      if (filteredEmail.length === 0) {
        axios
          .post("http://localhost:3001/addUser", {
            regEmail: googleLogData.regEmail && googleLogData.regEmail,
            regName: "",
            regPassword: "",
            regRepeatPassword: "",
            googleUserDataSub: googleLogData.googleUserDataSub,
            registrationDate: timeOfLogin,
            lastLogin: "",
            mojiOglasi: [],
            poruke: "",
            oglasiKojePratim: [],
            pozitivneOcene: 0,
            negativneOcene: 0,
          })
          .then((response) => {
            console.log(response);
          });
        setLoading(false);

        window.location.replace("http://localhost:3000/");
      } else {
        // alert('korisnik vec postoji')
      }
    }
  }, [googleLogData.regEmail && googleLogData.regEmail]);

  let path = window.location.pathname;
  useEffect(() => {
    setLoading(true);
    if (user) {
      let filteredEmail =
        allDataFromDatabase &&
        allDataFromDatabase.filter((all) => {
          return all.regEmail === user.email;
        });

      const user1 = {
        email: user && user.email,
        id: filteredEmail && filteredEmail.length > 0 && filteredEmail[0]._id,
      };
      setUser(user1);
      if (user1 && user1.id) {
        localStorage.setItem("user", JSON.stringify(user1));
      }
      console.log(filteredEmail && filteredEmail.mojiOglasi);
    }

    setLoading(false);
    console.log(errorAuthLogIn);
  }, [allDataFromDatabase && allDataFromDatabase.length, path]);

  /**POTVRDA BRISANJA OGLASA (DRUGA FN DA BI SE AUTOMATSKI OCITALO STANJE IZ BAZE) */

  const potvrdaBrisanja = () => {
    setPotvrdiBrisanje(!potvrdiBrisanje);
  };
  /**END POTVRDA BRISANJA OGLASA  */

  /************SHOW/HIDE PASSWORD LOGIN/SIGNUP PAGE*************/
  const [signupShowHidePassword, setShowHidePassword] = useState(false);
  const [signupShowHideConfirm, setShowHideConfirm] = useState(false);

  const [loginShowHidePassword, setLoginShowHidePassword] = useState(false);

  const signupShowHidePassClick = (e) => {
    e.preventDefault();
    setShowHidePassword(!signupShowHidePassword);
  };
  const signupShowHideConfirmClick = (e) => {
    e.preventDefault();
    setShowHideConfirm(!signupShowHideConfirm);
  };

  const loginShowHideClick = (e) => {
    e.preventDefault();
    setLoginShowHidePassword(!loginShowHidePassword);
  };
  /************KRAJ SHOW/HIDE PASSWORD LOGIN/SIGNUP PAGE*************/

  /*****************************MOJ PROFIL SHOW***************/
  const [openMobileNavBtn, setOpenMobileNavBtn] = useState(false);
  const [clickmenuBtn, setClickMenuBtn] = useState(false);

  const [mojProfilVisible, setMojProfilVisible] = useState(false);
  const mojProfilOpenFn = (e) => {
    e.preventDefault();
    setMojProfilVisible(!mojProfilVisible);
    setOpenMobileNavBtn(false);
  };
  //MOJ PROFILE HIDE
  const mojProfileHideBtn = () => {
    setMojProfilVisible(false);
  };

  /***MOJ PROFILE HIDE NA MANJIM REZOLUCIJAMA OD 768PX kada korisnici kliknu na link (Moje proruke,Moji Oglasi....) navigacija se zatvara*/
  const linkClickCloseNav = () => {
    if (windowWidth < 768) {
      setMojProfilVisible(false);
    }
  };

  const clickOpenCloseMobileNav = (e) => {
    e.preventDefault();
    setOpenMobileNavBtn(!openMobileNavBtn);
    setClickMenuBtn(true);
    setMojProfilVisible(false);
  };

  const izlogujSeBtnClick = (e) => {
    e.preventDefault();
    setErrorAuthLogIn(false);
    setFilteredUser("");
    setOpenMobileNavBtn(false);
    setClickMenuBtn(false);
    setMojProfilVisible(false);
    setLoginDetails({
      ...loginDetails,
      loginEmail: "",
      loginPassword: "",
    });
    setUser(null);
    localStorage.clear();
    // window.location.reload(false);
  };

  /*****************************END MOJ PROFIL SHOW***************/

  /************************DODAJ/OBRISI U LISTU PRACENJA */

  // console.log(user);
  const [currentUserAllData, setCurrentUserAllData] = useState();
  const pratiOglas = async (e) => {
    // e.preventDefault();
    setHeartCheck(!heartCheck);

    let getIdFromCurrentAds = e.target.getAttribute("id");

    let checkedAds = sviOglasi.filter((all) => {
      return all._id === getIdFromCurrentAds;
    });
    console.log(checkedAds);

   let sviOglasiIzListePratim=currentUserAllData&&currentUserAllData[0].oglasiKojePratim.map((all)=>{
    return all
   })

   const duplicates = sviOglasiIzListePratim.filter(item1 =>
    checkedAds.some(item2 => item2._id === item1._id)
  );
  console.log('Duplicates:', duplicates);

if(!duplicates){
  alert('nema')
}else{
  alert('ima')
}



    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3001/pratim/${user.id}`,
        {
          oglasiKojePratim: checkedAds,
        }
      );

      console.log("Uspešan POST zahtev. Odgovor:", response);
      alert(response.data);
      // Ovde zsmožete manipulisati odgovorom ili ažurirati stanje vaše aplikacije
    } catch (error) {
      setHeartCheck(false);
      console.log("Došlo je do greške prilikom slanja POST zahteva:", error);
    }
    finally {
      setLoading(false); // Postavljanje indikatora učitavanja na false nakon završetka zahteva, bez obzira na ishod
      console.log('zavrseno');
    }
  };
  //   console.log(heartCheck);
  // console.log(loading);
  // console.log(allDataFromDatabase&&allDataFromDatabase);
  // console.log(user);
  // console.log(userOglasiKojePratim&&userOglasiKojePratim);

 
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        console.log(user);
        try {
          const response = await axios.get(
            `http://localhost:3001/oglasi-koje-pratim/${user && user.id}`
          );
          setCurrentUserAllData(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData()
  }, [user, heartCheck,loading]);
  console.log(`LOADING......${loading}`);
  console.log(currentUserAllData && currentUserAllData[0].oglasiKojePratim);

  //OBRISI IZ LISTE
  const [trenutniOglasKojiPratim, setTrenutniOglasKojiPratim] = useState();
  const obrisiIzListePratim = async (e) => {
    // console.log(params.id);
    let oglasKojiPratimId = e.target.getAttribute("id");

    setTrenutniOglasKojiPratim(oglasKojiPratimId);
    setLoading(true);
    await axios
      .delete(
        `http://localhost:3001/pratim/${user && user.id}/${oglasKojiPratimId}`
      )

      .then((response) => {
        console.log("Delete successful");
        setHeartCheck(false);
        setLoading(false);
      })
      .catch((error) => {
        // setErrorMessage(error.message);
        console.error("There was an error!", error);
      });
  };

  /************************END DODAJ/OBRISI U LISTU PRACENJA */

  return (
    <>
      <StareStvariContext.Provider
        value={{
          //SVI PODACI IZ BAZE PODATKA
          allDataFromDatabase,
          //WINDOW WIDTH MEDIA QUERY
          windowWidth,
          // PRETRAGA POCETNA STRANA
          vrstaOglasa,
          velikeRegije,
          sviGradovi,
          gradoviRegiona,
          onChangePretragaInputs,
          pretragaPopunjenaPolja,
          vrstaOglasaOnChange,
          izaberiRegionOnChange,
          izaberiMestoOnChange,
          naslovOglasaOnChange,
          pretragaOglasaClick,
          //SEKCIJA HITNO POCETNA STRANA
          hitnoOnClickNavigacija,
          trenutniKliknutiElement,
          //SHARE BUTTONS U OGLASIMA
          anchorEl,
          open,
          handleClick,
          handleClose,
          //LOGIN SIGN UP SHOW HIDE PASSWORD EYE
          signupShowHidePassword,
          signupShowHideConfirm,
          signupShowHidePassClick,
          signupShowHideConfirmClick,
          loginShowHideClick,
          loginShowHidePassword,
          //CUSTOM LOGIN FORM
          loginDetails,
          submited,
          submitedLoginDetails,
          loginOnChange,
          loginOnChange,
          errorAuthLogIn,
          navigate,
          loginSubmit,
          passwordValidate,
          filteredUser,
          user,
          //loginClearInputFields
          clearLoginFields,
          //SVI OGLASI SVIH KORISNIKA
          sviOglasi,
          //SVI OGLASI TRENUTNOG KORISNIKA
          mojiOglasi,
          //GOOGLE LOGIN OAUTH2
          // login,
          logUserData,
          //SVI PODACI TRENUTNOG KORISNIKA
          currentUserData,
          //MOJ PROFIL SHOW HIDE WRAP
          mojProfilVisible,
          mojProfilOpenFn,
          linkClickCloseNav, //zatvaranje klikom na link (moje poruke,moj oglasi....)
          //MOJ PROFIL ZATVORI BUTTON
          mojProfileHideBtn,
          //MOBILE MENU LINKS ON CLICK
          clickOpenCloseMobileNav,
          openMobileNavBtn,
          clickmenuBtn,
          //IZOLOGUJ SE
          izlogujSeBtnClick,
          //POTVRDA BRISANJA OGLASA
          potvrdaBrisanja,
          //GOOGLE LOGIN
          login,
          //ULOGUJTE SE PUTEM G_MAILA HOVER
          googleSingIn_hoverEnter,
          googleSingIn_hoverOut,
          //PRATI OGLAS
          pratiOglas,
          currentUserAllData,
          heartCheck,
          //IZBACI OGLAS IZ LISTE PRACENJA
          obrisiIzListePratim,
          loading,
        }}
      >
        {props.children}
      </StareStvariContext.Provider>
    </>
  );
};
