
import SettingsContext from "./SettingsContext";
import {useContext} from "react";
import BackButton from "./BackButton";
import { useState } from "react";


function Settings() {
    
  const settingsInfo = useContext(SettingsContext);

  const handleWorkMinutesChange = (event) => {
    const newValue = parseInt(event.target.value);
    settingsInfo.setWorkMinutes(newValue);
  };

  const handleBreakMinutesChange = (event) => {
    const newValue = parseInt(event.target.value);
    settingsInfo.setBreakMinutes(newValue);
  };

  return(
    <div style={{textAlign:'left'}}>
      <label>work: {settingsInfo.workMinutes}:00</label>
      <input
      
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes}:00</label>
      
      <input
    
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />

        <select >
            <option>2</option>
            <option>3</option>
        </select>

      <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>

    </div>
  );
}

export default Settings;