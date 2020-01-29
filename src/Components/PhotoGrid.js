import React from "react";
import Photo from "./Photo.js";
import Loader from "./Loader.js";

const PhotoGrid = props => {
  return (
    <div
      className={
        "photo-grid " + (props.border ? "container" : "container-fluid")
      }
    >
      {props.loading ? (
        <Loader />
      ) : (
        <div className="row">
          {props.photos.map(photo => (
            <div className="col-3 col-sm-3 col-md-3 col-lg-2 photo-grid">
              <Photo src={photo.node.thumbnail_src} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
