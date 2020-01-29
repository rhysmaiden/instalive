import React, { useState } from "react";
import "./App.css";
import SettingsPanel from "./Components/SettingsPanel.js";
import PhotoGrid from "./Components/PhotoGrid.js";
import NavBar from "./Components/NavBar.js";

const App = () => {
  const [isLive, setLive] = useState(false);
  const [loop, setLoop] = useState(true);
  const [inFullScreen, setFullScreen] = useState(false);
  const [border, setBorder] = useState(false);
  const [clickedItem, setClickedItem] = useState({});

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
      />

      {inFullScreen ? (
        <div />
      ) : (
        <NavBar
          clickedSearchItem={clickedItem => setClickedItem(clickedItem)}
        />
      )}

      {clickedItem.name && (
        <SettingsPanel
          setBorder={() => setBorder(!border)}
          title={clickedItem.name}
          toggleLive={() => setLive(!isLive)}
          inFullScreen={inFullScreen}
          setFullScreen={() => setFullScreen(!inFullScreen)}
        />
      )}

      <PhotoGrid
        border={border}
        isLive={isLive}
        loop={loop}
        clickedItem={clickedItem}
      />
    </React.Fragment>
  );
};

export default App;
