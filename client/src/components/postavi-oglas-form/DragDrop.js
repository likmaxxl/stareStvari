import React, { useEffect, useState } from "react";

import ImageUploading from "react-images-uploading";
import CloseIcon from '@mui/icons-material/Close';



function DragDrop({ changeFunction, images,uploadedImages }) {
  const maxNumber = 69;

  return (
    <div className="imageLoader">
      <ImageUploading
        multiple
        value={images}
        onChange={changeFunction}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              type="button"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              <span>
                <img src="/images/postaviOglasPage/drag-and-drop.png" alt="" />
              </span>
              Klikni ili prevuci sliku
            </button>
            &nbsp;
        {uploadedImages&&uploadedImages.length>0?<button className="btn btn-danger" type="button" onClick={onImageRemoveAll}>
             Obriši sve slike
            </button>:""}
            
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button type="button" onClick={() => onImageUpdate(index)}>
                  Izmeni
                  </button>
                  <button type="button" onClick={() => onImageRemove(index)}>
                      <CloseIcon/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default DragDrop;
