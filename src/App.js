import React, { useEffect, useState } from "react";
import "./App.css";
import Photo from "./Components/Photo";
import SettingsPanel from "./Components/SettingsPanel.js";
import PhotoGrid from "./Components/PhotoGrid.js";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [place, setPlace] = useState("");
  const [locationText, setLocationText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [location_id, setLocationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLive, setLive] = useState(false);
  const [isNewPlace, setNewPlace] = useState(true);
  const [loop, setLoop] = useState(true);
  const [inFullScreen, setFullScreen] = useState(false);
  const [border, setBorder] = useState(false);
  const [location_name, setLocationName] = useState("");
  const [loadPageData, setLoadPageData] = useState({});

  useEffect(() => {
    if (isLive) {
      getPhotos();
    }
  }, [loop]);

  useEffect(() => {
    getPhotos();
  }, [location_id, isLive]);

  useEffect(() => {
    getSearchResults();
  }, [locationText]);

  function reloop() {
    if (isLive) {
      setTimeout(function() {
        getPhotos();
      }, 10000);
    }
  }

  const getSearchResults = async () => {
    const location_request =
      "https://www.instagram.com/web/search/topsearch/?context=blended&query=" +
      locationText +
      "&rank_token=0.04189914103097303&include_reel=true";

    const location_response = await fetch(location_request);
    const searchData = await location_response.json();

    searchData.places.forEach(function(part, index, arr) {
      arr[index].type = "place";
    });

    searchData.hashtags.forEach(function(part, index, arr) {
      arr[index].type = "hashtag";
    });

    setSearchResults(
      [...searchData.places, ...searchData.hashtags].slice(1, 10)
    );
  };

  const getPhotos = async () => {
    if (location_id == "") {
      return;
    }

    if (!isLive) {
      setLoading(true);
    }

    setSearchResults([]);

    const photos_required = 50;
    var photos_retrieved = 0;
    var next_page = "XXXXXXXX";

    var temp_photos = [];

    const page_type = loadPageData.type;
    //0f318e8cfff9cc9ef09f88479ff571fb

    var request = "";

    if (page_type == "place") {
      request =
        'https://www.instagram.com/graphql/query/?query_hash=ac38b90f0f3981c42092016a37c59bf7&variables={"id":' +
        loadPageData.location_id +
        ',"first":50,"after":"' +
        next_page +
        '"}';
    } else {
      request =
        "https://www.instagram.com/explore/tags/" +
        loadPageData.tag +
        "/?__a=1";
    }

    const response = await fetch(request);
    const photoData = await response.json();

    next_page = await photoData.end_cursor;

    if (page_type == "place") {
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

    photos_retrieved += 50;

    setPhotos(temp_photos);
    setLoading(false);
    setLoop(!loop);
  };

  const updateLocationText = e => {
    setLocationText(e.target.value);
  };

  const changeLocation = e => {
    e.preventDefault();
    setPlace(locationText);
  };

  const chooseLocation = value => {
    console.log(value);
    setPlace(value);
  };

  function toggleLive() {
    console.log("SET TO " + !isLive);

    setLive(!isLive);

    if (!isLive) {
      getPhotos();
    }
  }

  function fullscreen() {
    const el = document.documentElement;
    el.addEventListener("fullscreenchange", onFullScreenChange, false);
    el.requestFullscreen();
  }

  function onFullScreenChange() {
    console.log("from " + inFullScreen + " to " + !inFullScreen);
    setFullScreen(!inFullScreen);
    console.log("HHH");
  }

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
      />

      {inFullScreen ? (
        <div />
      ) : (
        <div className="myNav container-fluid">
          <h3 className="logo">InstaLive</h3>
          <div className="container onTop">
            <div className="row">
              <div className="col-3" />
              <div className="col-6">
                <input
                  className="searchField form-control mr-sm-2"
                  type="search"
                  placeholder="search"
                  aria-label="Search"
                  value={locationText}
                  onChange={updateLocationText}
                />
                <div className="list-items">
                  {searchResults.map(searchResult => (
                    <div
                      className="list-item"
                      onClick={() => {
                        console.log(searchResult.type);
                        if (searchResult.type == "place") {
                          setLocationName(searchResult.place.title);
                          setLocationId(searchResult.place.location.pk);

                          setLoadPageData({
                            type: searchResult.type,
                            location_id: searchResult.place.location.pk
                          });
                          console.log("PLACE");
                        } else {
                          setLocationName("#" + searchResult.hashtag.name);
                          setLocationId(searchResult.hashtag.id);

                          setLoadPageData({
                            type: searchResult.type,
                            tag: searchResult.hashtag.name
                          });
                        }

                        setLocationText("");
                        setPhotos([]);
                      }}
                    >
                      {searchResult.type == "place" ? (
                        <p>
                          <i className="fas fa-map-marker-alt"></i>
                          {searchResult.place.title}
                        </p>
                      ) : (
                        <p>
                          <i className="fas fa-hashtag"></i>
                          {searchResult.hashtag.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-3" />
            </div>
          </div>
        </div>
      )}

      <SettingsPanel
        setBorder={() => setBorder(!border)}
        location_name={location_name}
        toggleLive={() => setLive(!isLive)}
        inFullScreen={inFullScreen}
        setFullScreen={() => setFullScreen(!inFullScreen)}
      />

      <PhotoGrid border={border} loading={loading} photos={photos} />
    </React.Fragment>
  );
};

export default App;
