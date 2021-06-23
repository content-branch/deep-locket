import {
  EntitiesDiagramFormData,
} from "../EntitiesDiagram/EntitiesDiagram";

export type Props = {
  initialValues: EntitiesDiagramFormData;
  fileName: string | null;
  loading: boolean;
  onSubmit: (data: EntitiesDiagramFormData) => void;
  onClearForm: () => void;
};

const useCreateAppFromExcelForm = ({
  initialValues,
  fileName,
  loading,
  onSubmit,
  onClearForm,
}: Props) => {

  const result = {
    initialValues,
    fileName,
    loading,
    onSubmit,
    onClearForm
  };

  return result;
};

export default useCreateAppFromExcelForm;