import { StareStvariProvider } from "./context";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navigation from "./components/Navigation";
import PostaviOglas from "./pages/PostaviOglas";
import OglasiHitno from "./pages/OglasiHitno";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteLogin from "./components/ProtectedRouteLogIn";
import MojProfilMenu from "./components/MojProfilMenu";
import MojiOglasi from "./pages/mojProfilPages/MojiOglasi";
import MojePoruke from "./pages/mojProfilPages/MojePoruke";
import PorukaKonverzacija from "./components/mojProfil/PorukaKonverzacija";
import Ocene from "./pages/mojProfilPages/Ocene";
import OglasiKojePratim from "./pages/mojProfilPages/OglasiKojePratim";
import TrenutniOglas from "./pages/TrenutniOglas";
import KategorijaPage from './pages/KategorijaPage'
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/_global.scss";
// import './css/style.css'
import { Routes, Route } from "react-router-dom";

function App() {




  
  return (
    <StareStvariProvider>
      <div className="App">
        <Navigation />
        <MojProfilMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteLogin>
                <LoginPage />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/registracija"
            element={
              <ProtectedRouteLogin>
                <SignupPage />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/postavi-oglas/:id"
            element={
              <ProtectedRoute>
            <PostaviOglas />
            </ProtectedRoute>
            }
          />
          <Route path="/:kategorija" element={<KategorijaPage/>}/>
          <Route path="/oglasi-hitno" element={<OglasiHitno />} />

          {/* MOJ PROFIL PAGES */}
          <Route
            path="/moji-oglasi/:id"
            element={
              <ProtectedRoute>
                <MojiOglasi />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/moje-poruke"
            element={
              <ProtectedRoute>
                <MojePoruke />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/konverzacija/:nameId"
            element={
              <ProtectedRoute>
                <PorukaKonverzacija />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/ocene"
            element={
              <ProtectedRoute>
                <Ocene />
              </ProtectedRoute>
            }
          ></Route>
           <Route
          path="/pratim/:id"
          element={
            <ProtectedRoute>
              <OglasiKojePratim />
            </ProtectedRoute>
          }
        ></Route>
             <Route
          path="/trenutni-oglas/:name/:id"
          element={    
           <TrenutniOglas />
             }
        ></Route>
        
        
        </Routes>
       
      </div>
    </StareStvariProvider>
  );
}

export default App;
