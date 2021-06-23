import React from "react";
import "@rmwc/snackbar/styles";
import { CircularProgress } from "@rmwc/circular-progress";
import { Icon } from "@rmwc/icon";
import { Panel, EnumPanelStyle } from "@amplication/design-system";
import { SvgThemeImage, EnumImages } from "../Components/SvgThemeImage";
import "./EntitiesTile.scss";
import useEntitiesTile, { Props } from "./useEntitiesTile";

const CLASS_NAME = "entities-tile";

function EntitiesTile({ applicationId }: Props) {
  
  const {
    data,
    loading,
    handleClick
  } = useEntitiesTile({applicationId});

  return (
    <Panel
      className={`${CLASS_NAME}`}
      clickable
      onClick={handleClick}
      panelStyle={EnumPanelStyle.Bordered}
    >
      <div className={`${CLASS_NAME}__content`}>
        <div className={`${CLASS_NAME}__content__details`}>
          <h2>Entities</h2>
          Define the data model of you application with data entities and
          role‑based access.
          {loading ? (
            <CircularProgress />
          ) : (
            <span className={`${CLASS_NAME}__content__details__summary`}>
              <Icon icon={{ icon: "database", size: "medium" }} />

              {data?.entities.length}
              {data?.entities.length > 1 ? " entities" : " entity"}
            </span>
          )}
        </div>
        <SvgThemeImage image={EnumImages.Entities} />
      </div>
    </Panel>
  );
}

export default EntitiesTile;
