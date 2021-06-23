import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import * as models from "../models";
import { GET_ENTITIES } from "../Entity/EntityList";
import { useTracking, Event as TrackEvent } from "../util/analytics";

export type Props = {
  applicationId: string;
};

const EVENT_DATA: TrackEvent = {
  eventName: "entitiesTileClick",
};

function useEntitiesTile({ applicationId }: Props) {
  const history = useHistory();
  const { data, loading } = useQuery<{
    entities: models.Entity[];
  }>(GET_ENTITIES, {
    variables: {
      id: applicationId,
    },
  });

  const { trackEvent } = useTracking();

  const handleClick = useCallback(
    (event) => {
      trackEvent(EVENT_DATA);
      history.push(`/${applicationId}/entities`);
    },
    [history, trackEvent, applicationId]
  );

  const result = {
    data,
    loading,
    handleClick
  };

  return result;
}

export default useEntitiesTile;
