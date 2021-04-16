import React, { useState, useEffect } from "react";
import axios from "axios";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InfiniteScroll from "react-infinite-scroll-component";
import {Heading} from './components/Heading';
import Img from "./components/Img";
import "./components/Popup.css";
import styled from 'styled-components';
import {Loader} from './components/Loader';




const Arrows = { color: "grey", height: "20%", width: "10%"};

const Popup = {
  height: "70vh",
  maxWidth: "60vw",
  objectFit: "cover",
  borderRadius: 10,
  left: "50%",
};

const WrapperImage = styled.section`
  max-width : 70rem;
  margin : 4rem auto;
  display : column;
  columns: 5;
  grid-gap : 1em;
`;


function App() {
  const [showImage, setShowImage] = useState("");
  const [showImageSrc, setShowImageSrc] = useState("");
  const [popup, setPopup] = useState(false);
  const [images, setImages] = useState([]);


  useEffect(() => {
    getImages();
  }, []);

  const Show = (imageSrc) => {
    let currentIndex = images.indexOf(imageSrc);
    console.log(currentIndex);

    setShowImage(imageSrc);
    setShowImageSrc(imageSrc.urls.thumb);
    setPopup(true);
  };

  const moveRight = (e) => {
    e.stopPropagation();

    let currentIndex = images.indexOf(showImage);

    if (currentIndex >= images.length - 1) {
      setPopup(false);
    } else {
      let nxtimg = images[currentIndex + 1];
      setShowImage(nxtimg);
      setShowImageSrc(nxtimg.urls.thumb);
    }
  };

  const moveLeft = (e) => {
    e.stopPropagation();

    let currentIndex = images.indexOf(showImage);

    if (currentIndex <= 0) {
      setPopup(false);
    } else if (currentIndex > 0) {
      let nxtimg = images[currentIndex - 1];
      setShowImage(nxtimg);
      setShowImageSrc(nxtimg.urls.thumb);
    }
  };

  const getImages = async (count = 12) => {
    
    const accessKey = "PVMJIatwfoVM9eGlUZmmzVYwXmTQCqzNy1nIWu9KBZg";

    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${accessKey}&count=${count}`
    );
    setImages([...images, ...response.data]);
  }; 
  
  

  return (


    <div className="App" >
        <Heading />

      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={images.length}
        next={() => getImages(5)}
        hasMore={true}
        loader={<Loader />}
      >
        
        <WrapperImage>
        
          {images.map((image) => {
            return (
              <Img address={image.urls.thumb} source={image} onShow={Show} />
            );
          })}

          </WrapperImage>
        
        {popup ? (
          <div
            id="popup"
            onClick={() => {
              setPopup(false);
            }}
          >
            <ChevronLeftIcon
              style={Arrows}
              className="buttons"
              onClick={moveLeft}
            />

            <img style={Popup} src={showImageSrc} alt=""></img>

            <ChevronRightIcon
              style={Arrows}
              className="buttons"
              onClick={moveRight}
            />
          </div>
        ) : (
          ""
        )}
      </InfiniteScroll>
    </div>
  );
}


export default App;
