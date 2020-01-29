import React, { useState, useEffect } from "react";

const NavBar = ({ clickedSearchItem }) => {
  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async () => {
    const search_request =
      "https://www.instagram.com/web/search/topsearch/?context=blended&query=" +
      queryText +
      "&rank_token=0.04189914103097303&include_reel=true";

    const search_response = await fetch(search_request);
    const searchData = await search_response.json();

    searchData.places.forEach(function(part, index, arr) {
      arr[index].type = "place";
    });

    searchData.hashtags.forEach(function(part, index, arr) {
      arr[index].type = "hashtag";
    });

    //Only want to show a max of 10 results
    setSearchResults(
      [...searchData.places, ...searchData.hashtags].slice(1, 10)
    );
  };

  const updateQueryText = e => {
    setQueryText(e.target.value);
  };

  useEffect(() => {
    getSearchResults();
  }, [queryText]);

  const OnClickedItem = searchResult => {
    if (searchResult.type == "place") {
      clickedSearchItem({
        name: searchResult.place.title,
        id: searchResult.place.location.pk,
        type: "place"
      });
    } else {
      clickedSearchItem({
        name: searchResult.hashtag.name,
        id: searchResult.hashtag.id,
        type: "hashtag"
      });
    }

    setQueryText("");
  };

  return (
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
              value={queryText}
              onChange={updateQueryText}
            />
            <div className="list-items">
              {searchResults.map(searchResult => (
                <div
                  className="list-item"
                  onClick={() => {
                    OnClickedItem(searchResult);
                    setSearchResults([]);
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
  );
};

export default NavBar;
