import React, { useState,useContext } from "react";
import { Link,useParams } from "react-router-dom";
import "../scss/_navigation.scss";
import {StareStvariContext} from '../context'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navigation() {
  const value=useContext(StareStvariContext)

// console.log(value.user&&value.user.id);


  const navbarBackground = {
     background:'#FAFAFB',
     transition:'all 1s'
  };
  const navbarBackgroundWhite = {
    background:'white',
    transition:'all 1s'
 };






  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light" style={value.openMobileNavBtn?navbarBackground:navbarBackgroundWhite}>
          <Link to="/" className="navbar-brand">
          <img src="images/logo.png" alt="Logo" className="img-fluid" />
          </Link>
          <div className="hamburgerBtn">
            <div
              className={
                value.openMobileNavBtn
                  ? "icon nav-icon-mobile open"
                  : "icon nav-icon-mobile"
              }
              onClick={value.clickOpenCloseMobileNav}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">
                Početna
                </Link>
                </li>
              <li className="nav-item">
                <Link className="nav-link" to="/oglasi-hitno">
                Hitna Prodaja
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Najnoviji Oglasi
                </a>
              </li> */}
              {
                value.errorAuthLogIn === 'ok'?"":<li className="nav-item">
                <Link to="/login" className="nav-link">
                 Ulogujte se <span className="sr-only"></span>
                </Link>
              </li>
              }
              
            </ul>
            <ul className="navbar-nav">
              <li>
                <Link className="nav-link" to={`/postavi-oglas/${value.user&&value.user.id}`}>
                  Postavite oglas
                </Link>
              </li>
              <li>
                <a className="nav-link" href="#">
                  Kako da postavite oglas?
                </a>
              </li>
              {
                value.errorAuthLogIn ==='ok'&&<li className="nav-link" onClick={value.mojProfilOpenFn}>Moj Profil
                 <span><AccountCircleIcon/></span>
                 </li>
              }
             
            </ul>
          </div>     
        </nav>
        <div className={
          value.clickmenuBtn?
         value. openMobileNavBtn?"animated bounceInDown":"animated bounceOutUp":"displayNoneSearchForm"
          } id="mobileNavbar">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item" onClick={value.clickOpenCloseMobileNav}>
                <Link className="nav-link" to="/">
                Početna
                </Link>
                </li>
              <li className="nav-item" onClick={value.clickOpenCloseMobileNav}>
                <Link className="nav-link" to="/oglasi-hitno">
                Hitna Prodaja
                </Link>
              </li>
              {/* <li className="nav-item" onClick={clickOpenCloseMobileNav}>
                <a className="nav-link" href="#">
                  Najnoviji Oglasi
                </a>
              </li> */}
              {/* <li className="nav-item"  onClick={clickOpenCloseMobileNav}>
                <Link to="/login" className="nav-link">
                  Ulogujte se <span className="sr-only"></span>
                </Link>
              </li> */}


              {
                !value.user&&<li className="nav-item" onClick={value.clickOpenCloseMobileNav}>
                <Link to="/login" className="nav-link">
                 Ulogujte se <span className="sr-only"></span>
                </Link>
              </li>
              }
              {
                value.user&&value.user.email&&<li className="nav-link userProfileLink" onClick={value.mojProfilOpenFn}>Moj Profil
                <span><AccountCircleIcon/></span>
                </li>
              }
    
            </ul>
            <ul className="navbar-nav">
              <li onClick={value.clickOpenCloseMobileNav}>
                <Link className="nav-link" to={value.user&&value.user.email?"/postavi-oglas/id":"/login"}>
                  Postavite oglas
                </Link>
              </li>
              <li onClick={value.clickOpenCloseMobileNav}>
                <a className="nav-link" href="#">
                  Kako da postavite oglas?
                </a>
              </li>
            </ul>
          </div> 
      </header>
    </>
  );
}
