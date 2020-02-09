import React, { useState, useEffect } from "react";
import Photo from "./Photo.js";
import Loader from "./Loader.js";

const PhotoGrid = ({ border, isLive, loop, clickedItem }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [looper, setLooper] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLive) {
      getPhotos();
    }
  }, [loop]);

  useEffect(() => {
    if (isLive) {
      getPhotos();
      setLooper(
        setInterval(function() {
          getPhotos();
        }, 10000)
      );
    } else {
      if (looper != null) {
        clearInterval(looper);
      }
    }
  }, [clickedItem, isLive]);

  useEffect(() => {
    setPhotos([]);
    if (looper != null) {
      clearInterval(looper);
    }

    getPhotos();
  }, [clickedItem]);

  const getPhotos = async () => {
    if (clickedItem.name == undefined) {
      return;
    }

    if (!isLive) {
      setLoading(true);
    }

    var next_page = "XXXXXXXX";

    var temp_photos = [];
    var request = "";

    if (clickedItem.type == "place") {
      request =
        'https://www.instagram.com/graphql/query/?query_hash=ac38b90f0f3981c42092016a37c59bf7&variables={"id":' +
        clickedItem.id +
        ',"first":50,"after":"' +
        next_page +
        '"}';

      console.log(request);
    } else {
      request =
        "https://www.instagram.com/explore/tags/" +
        clickedItem.name +
        "/?__a=1";
    }

    const response = await fetch(request);
    const photoData = await response.json();

    next_page = await photoData.end_cursor;

    console.log(photoData);
    if (photoData.status == "fail") {
      setError("Error: Try another location");
      getPhotos();
      return;
    } else {
      if (error != "") {
        setError("");
      }
    }

    if (clickedItem.type == "place") {
      temp_photos = [
        ...temp_photos,
        ...photoData.data.location.edge_location_to_media.edges
      ];
    } else {
      temp_photos = [
        ...temp_photos,
        ...photoData.graphql.hashtag.edge_hashtag_to_media.edges
      ];
    }

    setPhotos(temp_photos);
    setLoading(false);
  };
  return (
    <div className={"photo-grid " + (border ? "container" : "container-fluid")}>
      {loading ? (
        error == "" ? (
          <h5>{error}</h5>
        ) : (
          <Loader />
        )
      ) : (
        <div className="row">
          {photos.map(photo => (
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
