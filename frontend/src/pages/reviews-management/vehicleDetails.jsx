// Author: Aditya Mahale(ad619659@dal.ca)

import Details from "./detail";
import Reviews from "./reviews";
import React from "react";
import NavBar from "../../components/common/nav-bar";

const VehicleDetails = ({ user }) => {
  return (
    <React.Fragment>
      <NavBar />
      <Details />
      <Reviews user={user} />
    </React.Fragment>
  );
};

export default VehicleDetails;
