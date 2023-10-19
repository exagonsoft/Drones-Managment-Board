import React, { useEffect, useState } from "react";
import DefaultPicture from "../../assets/drone.png";
import './pictureloaderstyles.css'

const PictureUploader = (props) => {
  const [error, setError] = useState("");

  const onImageLoad = async (e) => {
    let file = document.getElementById("mockSelector");
    file.click();
  };

  const loadingImageFile = (event) => {
    const element = event.target.files[0];
    if (element) {
      if (element.size > 80000) {
        setError("Max File Size 8mb");
        setTimeout(() => {
          setError("");
        }, 2000);
        return;
      }

      let _newImage = {
        image: "",
        url: "",
      };

      let image = document.createElement("img");
      image.id = "image";
      image.className = "campaign-card-image";
      image.src = URL.createObjectURL(element);

      const reader = new FileReader();
      reader.readAsDataURL(element);

      reader.onloadend = () => {
        let _url = URL.createObjectURL(element);
        _url = _url.split();
        _newImage.image = element;
        // _newImage.image = reader.result
        //   .replace("data:", "")
        //   .replace(/^.+,/, "");
        _newImage.url = URL.createObjectURL(element);

        props.onChange(_newImage);

        image.onload = function () {
          URL.revokeObjectURL(image.src); // free memory
        };
      };
    }
  };

  useEffect(() => {}, [props.image]);

  return (
    <div className="uploader-container">
      <input
        id="mockSelector"
        type="file"
        className="hidden"
        onChange={loadingImageFile}
      />
      <div className="uploader-wrapper">
        <div className="uploader-image-container">
          <img
            id="ImagePreview"
            src={props.image ? props.image : DefaultPicture}
            alt="User Picture"
          />
        </div>
        <div className="uploader-actions">
          <button
            type="button"
            onClick={onImageLoad}
          >
            Select Picture
          </button>
          {error ? (
            <div className="uploader-error">
              <span>
                {error}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureUploader;
