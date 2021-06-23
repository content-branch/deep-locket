import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_APPLICATION } from "./useApplicationHome";
import * as models from "../models";
import { useTracking, Event as TrackEvent } from "../util/analytics";

type Props = {
  applicationId: string;
};

const EVENT_DATA: TrackEvent = {
  eventName: "syncWithGitHubTileClick",
};

function useSyncWithGithubTile({ applicationId }: Props) {
  const history = useHistory();
  const { data, loading } = useQuery<{
    app: models.App;
  }>(GET_APPLICATION, {
    variables: {
      id: applicationId,
    },
  });

  const { trackEvent } = useTracking();

  const handleClick = useCallback(
    (event) => {
      trackEvent(EVENT_DATA);
      history.push(`/${applicationId}/github`);
    },
    [history, trackEvent, applicationId]
  );

  const result : any = {
    loading,
    data,
    handleClick,
  };

  return result;
}

export default useSyncWithGithubTile;
