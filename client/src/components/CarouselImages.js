// Komponenta.js
import React,{useEffect,useState,useContext} from "react";
import {StareStvariContext} from './../context'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
function CarouselImages() {
    
  const nameId = useParams();

  const value = useContext(StareStvariContext);
    const [kliknutiOglas, setKliknutiOglas] = useState();
    useEffect(() => {
      const currentItem =
        value.sviOglasi && value.sviOglasi.find((item) => item.id === nameId.id);
      setKliknutiOglas(currentItem);
    }, []);

    console.log(kliknutiOglas&&kliknutiOglas.uploadedImages);
    
  return (
    <>
      <Carousel showIndicators={false} showThumbs={false} infiniteLoop={true}>
    {
        kliknutiOglas&&kliknutiOglas.uploadedImages.map((all)=>{
            return  <img src={all.data_url} alt="" />
        })
    }
          {/* <img src="https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" /> */}
       
    
        {/* <div>
                    <img src="https://images.pexels.com/photos/6796574/pexels-photo-6796574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>
                <div>
                    <img src="https://images.pexels.com/photos/17875968/pexels-photo-17875968/free-photo-of-a-lemur-at-the-zoo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
               
                </div> */}
      </Carousel>
    </>
  );
}

export default CarouselImages;
