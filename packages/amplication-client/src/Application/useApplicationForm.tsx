import { useCallback } from "react";
import { match } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import * as models from "../models";
import { formatError } from "../util/error";
import { useTracking } from "../util/analytics";
import { GET_APPLICATION } from "./useApplicationHome";

export type Props = {
  match: match<{ application: string }>;
};

type TData = {
  updateApp: models.App;
};

function useApplicationForm({ match }: Props) {
  const applicationId = match.params.application;

  const { data, error } = useQuery<{
    app: models.App;
  }>(GET_APPLICATION, {
    variables: {
      id: applicationId,
    },
  });

  const { trackEvent } = useTracking();

  const [updateApp, { error: updateError }] = useMutation<TData>(UPDATE_APP);

  const handleSubmit = useCallback(
    (data) => {
      const { name, description, color } = data;
      trackEvent({
        eventName: "updateAppInfo",
      });
      updateApp({
        variables: {
          data: {
            name,
            description,
            color,
          },
          appId: applicationId,
        },
      }).catch(console.error);
    },
    [updateApp, applicationId, trackEvent]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      trackEvent({
        eventName: "updateAppColor",
      });
      updateApp({
        variables: {
          data: {
            color,
          },
          appId: applicationId,
        },
      }).catch(console.error);
    },
    [updateApp, applicationId, trackEvent]
  );

  const errorMessage = formatError(error || updateError);
  
  const result = {
    data,
    handleSubmit,
    handleColorChange,
    error,
    errorMessage
  }
  return result;
}

export default useApplicationForm;

const UPDATE_APP = gql`
  mutation updateApp($data: AppUpdateInput!, $appId: String!) {
    updateApp(data: $data, where: { id: $appId }) {
      id
      createdAt
      updatedAt
      name
      description
      color
    }
  }
`;
