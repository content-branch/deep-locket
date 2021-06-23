import { match, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import * as models from "../models";
import { formatError } from "../util/error";
import useNavigationTabs from "../Layout/UseNavigationTabs";

export type Props = {
  match: match<{ application: string }>;
};

const NAVIGATION_KEY = "APP_HOME";

function useApplicationHome({ match }: Props) {
  const applicationId = match.params.application;
  const location = useLocation();

  const { data, error } = useQuery<{
    app: models.App;
  }>(GET_APPLICATION, {
    variables: {
      id: applicationId,
    },
  });
  
  useNavigationTabs(
    applicationId,
    NAVIGATION_KEY,
    location.pathname,
    data?.app.name
  );

  const errorMessage = formatError(error);

  const result = {
    applicationId,
    error,
    errorMessage,
    data, 
    GET_APPLICATION
  };

  return result;
}

export default useApplicationHome;

export const GET_APPLICATION = gql`
  query getApplication($id: String!) {
    app(where: { id: $id }) {
      id
      createdAt
      updatedAt
      name
      description
      color
      githubTokenCreatedDate
      githubSyncEnabled
      githubRepo
      githubLastSync
      githubLastMessage
    }
  }
`;
