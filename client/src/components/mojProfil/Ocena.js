import React from 'react'
import '../../scss/mojProfil/_ocena.scss'
export default function Ocena() {
  return (
   <>
      <div className="ocena">
        <div className="likeDislikeIcon">
        <div className="icon"><img src="../../../images/like.png" alt="" /></div>
        </div>
            <div className="ocenaHeader">
              <div className="emailKorisnikaOcene">
                <div className="icon"></div>test@gmail.com
              </div>
              <div className="datumOcena">22.05.2022</div>
            </div>
            <h4>zidna slika na platnu</h4>
            <div className="komentarOcena">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              porro beatae vitae quis laborum!
            </div>
          </div>
   </>
  )
}
