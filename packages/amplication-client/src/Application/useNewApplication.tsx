import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { GET_APPLICATIONS } from "../Workspaces/ApplicationList";
import { formatError } from "../util/error";
import * as models from "../models";
import { useTracking } from "../util/analytics";


type Values = {
  name: string;
  description: string;
};

type TData = {
  createApp: models.App;
};

export const STEP_SELECT_TYPE = "step-select-type";
export const STEP_START_FROM_SCRATCH = "step-start-from-scratch";

const useNewApplication = () => {
  const { trackEvent } = useTracking();

  const [currentStep, setCurrentStep] = useState<string>(STEP_SELECT_TYPE);

  const StepStartFromScratch = useCallback(() => {
    setCurrentStep(STEP_START_FROM_SCRATCH);
    trackEvent({
      eventName: "createAppStep-startFromScratch",
    });
  }, [setCurrentStep, trackEvent]);

  const StepImportExcel = useCallback(() => {
    trackEvent({
      eventName: "createAppStep-importExcel",
    });
  }, [trackEvent]);

  const StepSelectType = useCallback(() => {
    setCurrentStep(STEP_SELECT_TYPE);
  }, [setCurrentStep]);

  const history = useHistory();
  const [createApp, { loading, data, error }] = useMutation<TData>(CREATE_APP, {
    onCompleted: (data) => {
      trackEvent({
        eventName: "createApp",
        appName: data.createApp.name,
      });
    },
    update(cache, { data }) {
      if (!data) return;
      const queryData = cache.readQuery<{ apps: Array<models.App> }>({
        query: GET_APPLICATIONS,
      });
      if (queryData === null) {
        return;
      }
      cache.writeQuery({
        query: GET_APPLICATIONS,
        data: {
          apps: queryData.apps.concat([data.createApp]),
        },
      });
    },
  });

  const handleSubmit = useCallback(
    (data: Values) => {
      createApp({ variables: { data } }).catch(console.error);
    },
    [createApp]
  );

  const errorMessage = formatError(error);

  useEffect(() => {
    if (data) {
      history.push(`/${data.createApp.id}`);
    }
  }, [history, data]);

  const result = {
    loading,
    currentStep,
    error,
    errorMessage,
    handleSubmit,
    StepImportExcel,
    StepSelectType,
    StepStartFromScratch
  };
  
  return result;
};

export default useNewApplication;

const CREATE_APP = gql`
  mutation createApp($data: AppCreateInput!) {
    createApp(data: $data) {
      id
      name
      description
    }
  }
`;
