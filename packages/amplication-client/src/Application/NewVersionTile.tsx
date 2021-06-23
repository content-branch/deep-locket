import React from "react";
import { EnumPanelStyle, Panel } from "@amplication/design-system";
import { CircularProgress } from "@rmwc/circular-progress";
import { Icon } from "@rmwc/icon";
import "@rmwc/snackbar/styles";
import { EnumImages, SvgThemeImage } from "../Components/SvgThemeImage";
import "./NewVersionTile.scss";
import useNewVersionTile, { Props } from "./useNewVersionTile";

const CLASS_NAME = "new-version-tile";

function NewVersionTile({ applicationId }: Props) {
  
  const {
    loading,
    handleClick,
    requiredFixesCount
  } = useNewVersionTile({applicationId});

  return (
    <>
      <div className={`${CLASS_NAME}__gap`} />
      <div className={`${CLASS_NAME}__wrapper`}>
        <div className={`${CLASS_NAME}__new-release`}>New Release!</div>
        <Panel
          className={`${CLASS_NAME}`}
          clickable
          onClick={handleClick}
          panelStyle={EnumPanelStyle.Bordered}
        >
          <div className={`${CLASS_NAME}__content`}>
            <div className={`${CLASS_NAME}__content__details`}>
              <h2>Improved Relation Fields</h2>
              Version 0.3.2 includes big improvements in how we manage related
              entities. The changes require your attention.
              {loading ? (
                <CircularProgress />
              ) : (
                <span className={`${CLASS_NAME}__content__details__summary`}>
                  <Icon icon={{ icon: "info_circle", size: "medium" }} />
                  {requiredFixesCount}
                  {requiredFixesCount > 1
                    ? " relation needs "
                    : " relations need "}
                  your attention
                </span>
              )}
            </div>
            <SvgThemeImage image={EnumImages.Relations} />
          </div>
        </Panel>
      </div>
    </>
  );
}

export default NewVersionTile;
