import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import * as models from "../models";
import { GET_ROLES } from "../Roles/RoleList";
import { useTracking, Event as TrackEvent } from "../util/analytics";

type Props = {
  applicationId: string;
};

const EVENT_DATA: TrackEvent = {
  eventName: "rolesTileClick",
};

function useRolesTile({ applicationId }: Props) {
  const history = useHistory();

  const { data, loading } = useQuery<{
    appRoles: models.AppRole[];
  }>(GET_ROLES, {
    variables: {
      id: applicationId,
    },
  });
  const { trackEvent } = useTracking();

  const handleClick = useCallback(
    (event) => {
      trackEvent(EVENT_DATA);
      history.push(`/${applicationId}/roles`);
    },
    [history, trackEvent, applicationId]
  );

  const result = {
    loading,
    data,
    handleClick
  };
  return result;
}

export default useRolesTile;
