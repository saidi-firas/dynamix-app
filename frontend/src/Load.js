import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

function Load(props) {
  return (
    <div className="load">
      <img src="./images/logo.png" alt="" />

      <SyncLoader
        color={"green"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        loading={props.loading}
      />
    </div>
  );
}

export default Load;
