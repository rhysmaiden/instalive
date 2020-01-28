import React from "react";

const SettingsPanel = props => {
  return (
    <div className="settings-pane">
      <div className="setting-element">
        <div className="place-title">
          <h3>{props.location_name}</h3>
        </div>
      </div>

      <div className="setting-element">
        <div className="toggle-label">border-less</div>

        <label className="switch">
          <input type="checkbox" onChange={props.setBorder} />
          <span class="slider round"></span>
        </label>
      </div>

      <div className="setting-element">
        <p className="toggle-label">live</p>
        <label className="switch">
          <input type="checkbox" onChange={props.toggleLive} />
          <span class="slider round"></span>
        </label>
      </div>
      <div className="setting-element">
        <div className="fullscreen-setting">
          <button className="icon-button" onClick={props.setFullScreen}>
            <i
              className={
                "fas " +
                (props.inFullScreen ? "fa-compress-arrows-alt" : "fa-compress")
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
