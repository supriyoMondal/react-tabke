import React from "react";
import dk from "../assets/dk.png";
import se from "../assets/se.png";
import tz from "../assets/tz.png";
import ind from "../assets/in.png";
import us from "../assets/us.png";
const flagsArray = [dk, se, ind, us, tz];
const getFlag = () => {
  return flagsArray[Math.floor(Math.random() * flagsArray.length)];
};
const CountryFlag = () => {
  return (
    <img
      alt="flag"
      src={getFlag()}
      style={{
        height: "24px",
        width: "24px",
        borderRadius: "4px",
        marginRight: "3px",
        marginBottom: "2px",
      }}
    />
  );
};

export default CountryFlag;
