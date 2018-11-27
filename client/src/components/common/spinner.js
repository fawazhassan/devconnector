import React from "react";
import Spinner from "./lg.double-ring-spinner.gif";

export default function spinner() {
  return (
    <div>
      <img
        src={Spinner}
        alt="Loading..."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
