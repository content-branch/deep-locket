import React from "react";
import "@rmwc/snackbar/styles";
import { CircularProgress } from "@rmwc/circular-progress";
import { Icon } from "@rmwc/icon";

import { Panel, EnumPanelStyle } from "@amplication/design-system";
import "./RolesTile.scss";
import { SvgThemeImage, EnumImages } from "../Components/SvgThemeImage";
import useRolesTile, { Props } from "./useRolesTile";

const CLASS_NAME = "roles-tile";

function RolesTile({ applicationId }: Props) {

  const {
    loading,
    data,
    handleClick
  } = useRolesTile({applicationId});

  return (
    <Panel
      className={`${CLASS_NAME}`}
      clickable
      onClick={handleClick}
      panelStyle={EnumPanelStyle.Bordered}
    >
      <div className={`${CLASS_NAME}__content`}>
        <div className={`${CLASS_NAME}__content__details`}>
          <h2>Roles</h2>
          Create roles and granularly set permissions per entity or specific
          fields.
          {loading ? (
            <CircularProgress />
          ) : (
            <span className={`${CLASS_NAME}__content__details__summary`}>
              <Icon icon={{ icon: "lock", size: "medium" }} />

              {data?.appRoles.length}
              {data?.appRoles.length > 1 ? " roles" : " role"}
            </span>
          )}
        </div>
        <SvgThemeImage image={EnumImages.Roles} />
      </div>
    </Panel>
  );
}

export default RolesTile;
