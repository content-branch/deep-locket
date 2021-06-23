import { useQuery } from "@apollo/client";
import { isEmpty } from "lodash";
import { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { GET_LOOKUP_FIELDS } from "../Entity/RelatedFieldsMigrationFix";
import * as models from "../models";
import { Event as TrackEvent, useTracking } from "../util/analytics";

type TData = {
  app: models.App;
};

export type Props = {
  applicationId: string;
};

const EVENT_DATA: TrackEvent = {
  eventName: "newVersionTileClick-fixEntities",
};

function useNewVersionTile({ applicationId }: Props) {
  const history = useHistory();

  const { data, loading } = useQuery<TData>(GET_LOOKUP_FIELDS, {
    variables: {
      appId: applicationId,
    },
  });
  const { trackEvent } = useTracking();

  const handleClick = useCallback(
    (event) => {
      trackEvent(EVENT_DATA);
      history.push(`/${applicationId}/fix-related-entities`);
    },
    [history, trackEvent, applicationId]
  );

  const requiredFixesCount = useMemo(() => {
    if (!data) return 0;

    return data.app.entities.reduce((accumulator, entity) => {
      const sum =
        entity.fields?.filter((field) =>
          isEmpty(field.properties.relatedFieldId)
        ).length || 0;
      return accumulator + sum;
    }, 0);
  }, [data]);

  if (requiredFixesCount === 0) return null;

  const result : any= {
    loading,
    handleClick,
    requiredFixesCount
  };
  
  return result;

}

export default useNewVersionTile;
