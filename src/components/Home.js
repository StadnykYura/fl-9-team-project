import React from "react";

import withAuthorization from "../features/authorization/with-authorization.hoc";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>It is only accessible for signed in users</p>
    </div>
  );
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);
