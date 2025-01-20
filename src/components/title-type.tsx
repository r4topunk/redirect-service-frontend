"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

function TitleType() {
  return (
    <TypeAnimation
      sequence={["systēma"]}
      wrapper="span"
      cursor={true}
      speed={1}
      style={{ display: "inline-block" }}
      className="text-4xl font-bold text-lime-400"
    />
  );
}

export default TitleType;
