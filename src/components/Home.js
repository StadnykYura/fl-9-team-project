import React from "react";

import withAuthorization from "../features/authorization/with-authorization.hoc";
import HomepageNavTop from "../features/home-page/homepage-nav-top/homepage-nav-top";
import HomepageNavBottom from "../features/home-page/homepage-nav-bottom/homepage-nav-bottom";
import FlatView from "../features/home-page/flat-view/flat-view";
function Home() {
  return (
    <div>
      <HomepageNavTop />
      <FlatView />
      <HomepageNavBottom />
    </div>
  );
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(Home);
