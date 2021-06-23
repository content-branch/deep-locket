import { createContext } from "react";
import * as models from "../models";

export type PendingChangeItem = Pick<
  models.PendingChange,
  "resourceId" | "resourceType"
>;

export type ContextDataType = {
  pendingChanges: PendingChangeItem[];
  commitRunning: boolean /**@todo: change build process to be async in the server and remove this property */;
  setCommitRunning: (isRunning: boolean) => void;
  addEntity: (entityId: string) => void;
  addBlock: (blockId: string) => void;
  addChange: (
    resourceId: string,
    resourceType: models.EnumPendingChangeResourceType
  ) => void;
  reset: () => void;
};

const PendingChangesContext = createContext<ContextDataType>({
  pendingChanges: [],
  commitRunning: false,
  setCommitRunning: (isRunning: boolean) => {
    throw new Error();
  },
  addEntity: (entityId: string) => {
    throw new Error();
  },
  addBlock: (blockId: string) => {
    throw new Error();
  },
  addChange: (
    resourceId: string,
    resourceType: models.EnumPendingChangeResourceType
  ) => {
    throw new Error();
  },
  reset: () => {
    throw new Error();
  },
});

export default PendingChangesContext;
