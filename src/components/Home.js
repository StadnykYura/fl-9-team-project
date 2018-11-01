import React from "react";

import withAuthorization from "../features/authorization/with-authorization.hoc";
import HomePage from "../features/HomePage";
function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);
