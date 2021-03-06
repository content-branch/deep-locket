import React from "react";
import { Switch, Route } from "react-router-dom";
import { Snackbar } from "@rmwc/snackbar";
import "@rmwc/snackbar/styles";
import classNames from "classnames";
import PageContent from "../Layout/PageContent";
import { CircleBadge } from "@amplication/design-system";
import ApplicationForm from "./ApplicationForm";
import SyncWithGithubPage from "../Settings/SyncWithGithubPage";
import "./ApplicationHome.scss";
import SyncWithGithubTile from "./SyncWithGithubTile";
import EntitiesTile from "./EntitiesTile";
import NewVersionTile from "./NewVersionTile";
import RolesTile from "./RolesTile";
import { COLOR_TO_NAME } from "./constants";
import InnerTabLink from "../Layout/InnerTabLink";
import { ApiTokenList } from "../Settings/ApiTokenList";
import useApplicationHome, {Props} from "./useApplicationHome";

const CLASS_NAME = "application-home";

function ApplicationHome({ match }: Props) {
  const {
    applicationId,
    data,
    error,
    errorMessage
  } = useApplicationHome({match});

  return (
    <PageContent
      className={CLASS_NAME}
      sideContent={
        <>
          <div>
            <InnerTabLink to={`/${applicationId}/`} icon="home">
              Overview
            </InnerTabLink>
          </div>
          <div>
            <InnerTabLink to={`/${applicationId}/update`} icon="settings">
              General Settings
            </InnerTabLink>
          </div>
          <div>
            <InnerTabLink to={`/${applicationId}/github`} icon="github_outline">
              Sync with GitHub
            </InnerTabLink>
          </div>
          <div>
            <InnerTabLink to={`/${applicationId}/api-tokens`} icon="id">
              API Tokens
            </InnerTabLink>
          </div>
        </>
      }
    >
      <Switch>
        <Route path="/:application/api-tokens" component={ApiTokenList} />
        <Route path="/:application/github" component={SyncWithGithubPage} />
        <Route
          path="/:application/"
          component={() => (
            <>
              <div
                className={classNames(
                  `${CLASS_NAME}__header`,
                  `theme-${data && COLOR_TO_NAME[data.app.color]}`
                )}
              >
                {data?.app.name}
                <CircleBadge
                  name={data?.app.name || ""}
                  color={data?.app.color || "transparent"}
                />
              </div>
              <Switch>
                <Route
                  exact
                  path="/:application/"
                  component={() => (
                    <div className={`${CLASS_NAME}__tiles`}>
                      <NewVersionTile applicationId={applicationId} />
                      <EntitiesTile applicationId={applicationId} />
                      <RolesTile applicationId={applicationId} />
                      <SyncWithGithubTile applicationId={applicationId} />
                    </div>
                  )}
                />
                <Route
                  path="/:application/update"
                  component={ApplicationForm}
                />
              </Switch>
            </>
          )}
        />
      </Switch>
      <Snackbar open={Boolean(error)} message={errorMessage} />
    </PageContent>
  );
}

export default ApplicationHome;