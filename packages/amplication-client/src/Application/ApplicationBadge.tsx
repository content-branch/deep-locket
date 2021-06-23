import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { CircleBadge } from "@amplication/design-system";
import "./ApplicationBadge.scss";
import useApplicationBadge, {Props} from "./useApplicationBadge";

function ApplicationBadge(props:Props) {
  const {
    expanded,
    url,
    name,
    color,
    large,
    hideFullName,
  } = useApplicationBadge(props);
  
  const badgeNode = (
    <>
      <CircleBadge name={name} color={color} />
      {!hideFullName && (
        <div className="application-badge__app-name">{name}</div>
      )}
    </>
  );
  return (
    <div
      className={classNames(
        "application-badge",
        {
          "application-badge--expanded": expanded,
        },
        {
          "application-badge--large": large,
        }
      )}
    >
      {url ? (
        <NavLink to={url}>{badgeNode}</NavLink>
      ) : (
        <span> {badgeNode} </span>
      )}
    </div>
  );
}

export default ApplicationBadge;
