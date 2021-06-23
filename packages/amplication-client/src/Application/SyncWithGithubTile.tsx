import React from "react";

import { Panel, EnumPanelStyle } from "@amplication/design-system";
import { Icon } from "@rmwc/icon";
import { CircularProgress } from "@rmwc/circular-progress";

import { SvgThemeImage, EnumImages } from "../Components/SvgThemeImage";
import useSyncWithGithubTile from "./useSyncWithGithubTile";
import "./SyncWithGithubTile.scss";

type Props = {
  applicationId: string;
};

const CLASS_NAME = "sync-with-github-tile";

function SyncWithGithubTile({ applicationId }: Props) {
  const {
    loading,
    data,
    handleClick,
  } = useSyncWithGithubTile({applicationId});

  return (
    <Panel
      className={`${CLASS_NAME}`}
      clickable
      onClick={handleClick}
      panelStyle={EnumPanelStyle.Bordered}
    >
      <div className={`${CLASS_NAME}__content`}>
        <div className={`${CLASS_NAME}__content__details`}>
          <h2>Sync with GitHub</h2>
          Enable sync with GitHub to automatically push the generated code of
          your application and create a Pull Request in your GitHub repository
          every time you commit your changes.
          {loading ? (
            <CircularProgress />
          ) : (
            <span className={`${CLASS_NAME}__content__details__summary`}>
              <Icon icon={{ icon: "github", size: "medium" }} />

              {!data?.app.githubSyncEnabled ? (
                <>You are not connected to a GitHub repository</>
              ) : (
                <>
                  You are connected to
                  <div className={`${CLASS_NAME}__repo-name`}>
                    {data?.app.githubRepo}
                  </div>
                </>
              )}
            </span>
          )}
        </div>
        <SvgThemeImage image={EnumImages.SyncWithGitHub} />
      </div>
    </Panel>
  );
}

export default SyncWithGithubTile;
