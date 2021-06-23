import React from "react";
import { Switch, Route, match } from "react-router-dom";

import { CommitList } from "./CommitList";
import CommitPage from "./CommitPage";

import useNavigationTabs from "../Layout/UseNavigationTabs";

type Props = {
  match: match<{ application: string }>;
};
const NAVIGATION_KEY = "ENTITIES";

function Entities({ match }: Props) {
  const { application } = match.params;

  useNavigationTabs(application, NAVIGATION_KEY, match.url, "Commits");

  return (
    <Switch>
      <Route exact path="/:application/commits/" component={CommitList} />
      <Route path="/:application/commits/:commitId" component={CommitPage} />
    </Switch>
  );
}

export default Entities;
