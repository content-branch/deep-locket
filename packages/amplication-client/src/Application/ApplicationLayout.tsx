import React from "react";
import { Switch, Route, match } from "react-router-dom";

import ApplicationHome from "./ApplicationHome";
import Entities from "../Entity/Entities";
import { RelatedFieldsMigrationFix } from "../Entity/RelatedFieldsMigrationFix";
import Pages from "../Pages/Pages";
import EntityPage from "../Pages/EntityPage";
import BuildPage from "../VersionControl/BuildPage";
import RolesPage from "../Roles/RolesPage";

import NewEntityPage from "../Pages/NewEntityPage";
import PendingChangesPage from "../VersionControl/PendingChangesPage";

import "./ApplicationLayout.scss";

import MenuItem from "../Layout/MenuItem";
import MainLayout from "../Layout/MainLayout";
import { CircleBadge } from "@amplication/design-system";
import LastCommit from "../VersionControl/LastCommit";

import PendingChangesContext, {
  PendingChangeItem,
} from "../VersionControl/PendingChangesContext";
import { track } from "../util/analytics";
import { SHOW_UI_ELEMENTS } from "../feature-flags";
import ScreenResolutionMessage from "../Layout/ScreenResolutionMessage";
import PendingChangesMenuItem from "../VersionControl/PendingChangesMenuItem";
import Commits from "../VersionControl/Commits";
import NavigationTabs from "../Layout/NavigationTabs";
import useApplicationLayout, {EnumFixedPanelKeys} from "./useApplicationLayout";



export type PendingChangeStatusData = {
  pendingChanges: PendingChangeItem[];
};

const CLASS_NAME = "application-layout";

type Props = {
  match: match<{
    application: string;
    appModule: string;
    className?: string;
  }>;
};

function ApplicationLayout({ match }: Props) {
  const {
    pendingChangesBadge,
    pendingChangesContextValue,
    application,
    applicationData,
    selectedFixedPanel,
    handleMenuItemWithFixedPanelClicked
  } = useApplicationLayout({match});

  return (
    <PendingChangesContext.Provider value={pendingChangesContextValue}>
      <MainLayout
        className={CLASS_NAME}
        footer={<LastCommit applicationId={application} />}
      >
        <MainLayout.Menu>
          <MenuItem
            className={`${CLASS_NAME}__app-icon`}
            title="Dashboard"
            to={`/${application}`}
          >
            <CircleBadge
              name={applicationData?.app.name || ""}
              color={applicationData?.app.color}
            />
          </MenuItem>
          <PendingChangesMenuItem
            applicationId={application}
            isOpen={selectedFixedPanel === EnumFixedPanelKeys.PendingChanges}
            onClick={handleMenuItemWithFixedPanelClicked}
            panelKey={EnumFixedPanelKeys.PendingChanges}
            badgeValue={pendingChangesBadge}
          />
          <MenuItem
            title="Entities"
            to={`/${application}/entities`}
            icon="entity_outline"
          />
          {SHOW_UI_ELEMENTS && (
            <MenuItem title="Pages" to={`/${application}/pages`} icon="pages" />
          )}
          <MenuItem
            title="Roles"
            to={`/${application}/roles`}
            icon="roles_outline"
          />
          <MenuItem
            title="Commits"
            to={`/${application}/commits`}
            icon="history_commit_outline"
          />
        </MainLayout.Menu>
        <MainLayout.Content>
          <div className={`${CLASS_NAME}__app-container`}>
            <NavigationTabs defaultTabUrl={`/${application}/`} />

            <Switch>
              <Route
                path="/:application/pending-changes"
                component={PendingChangesPage}
              />

              <Route path="/:application/entities/" component={Entities} />

              {SHOW_UI_ELEMENTS && (
                <>
                  <Route path="/:application/pages/" component={Pages} />
                  <Route
                    path="/:application/entity-pages/new"
                    component={NewEntityPage}
                  />
                  <Route
                    path="/:application/entity-pages/:entityPageId"
                    component={EntityPage}
                  />
                </>
              )}
              <Route
                path="/:application/builds/:buildId"
                component={BuildPage}
              />

              <Route path="/:application/roles" component={RolesPage} />
              <Route path="/:application/commits" component={Commits} />
              <Route
                path="/:application/fix-related-entities"
                component={RelatedFieldsMigrationFix}
              />
              <Route path="/:application/" component={ApplicationHome} />
            </Switch>
          </div>
        </MainLayout.Content>
        <ScreenResolutionMessage />
      </MainLayout>
    </PendingChangesContext.Provider>
  );
}

const enhance = track((props) => {
  return { applicationId: props.match.params.application };
});

export default enhance(ApplicationLayout);