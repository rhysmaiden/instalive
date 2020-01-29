import React from "react";

const SettingsPanel = ({
  title,
  setBorder,
  toggleLive,
  setFullScreen,
  inFullScreen
}) => {
  return (
    <div className="settings-pane">
      <div className="setting-element">
        <div className="place-title">
          <h3>{title}</h3>
        </div>
      </div>

      <div className="setting-element">
        <div className="toggle-label">border-less</div>

        <label className="switch">
          <input type="checkbox" onChange={setBorder} />
          <span class="slider round"></span>
        </label>
      </div>

      <div className="setting-element">
        <p className="toggle-label">live</p>
        <label className="switch">
          <input type="checkbox" onChange={toggleLive} />
          <span class="slider round"></span>
        </label>
      </div>
      <div className="setting-element">
        <div className="fullscreen-setting">
          <button className="icon-button" onClick={setFullScreen}>
            <i
              className={
                "fas " +
                (inFullScreen ? "fa-compress-arrows-alt" : "fa-compress")
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
