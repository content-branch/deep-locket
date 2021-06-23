import React from "react";
import { Formik, Form } from "formik";
import { validate } from "../util/formikValidateJsonSchema";
import { Icon } from "@rmwc/icon";
import { Snackbar } from "@rmwc/snackbar";
import "@rmwc/snackbar/styles";
import * as models from "../models";
import FormikAutoSave from "../util/formikAutoSave";
import { TextField } from "@amplication/design-system";
import { COLORS } from "./constants";
import { ColorSelectButton } from "../Components/ColorSelectButton";
import "./ApplicationForm.scss";
import useApplicationForm, {Props} from "./useApplicationForm";

const FORM_SCHEMA = {
  required: ["name"],
  properties: {
    name: {
      type: "string",
      minLength: 2,
    },
    description: {
      type: "string",
    },
  },
};

const CLASS_NAME = "application-form";

function ApplicationForm({ match }: Props) {
  
  const {data, handleSubmit, handleColorChange, error, errorMessage} = useApplicationForm({match});

  return (
    <div className={CLASS_NAME}>
      {data?.app && (
        <Formik
          initialValues={data.app}
          validate={(values: models.App) => validate(values, FORM_SCHEMA)}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <FormikAutoSave debounceMS={1000} />
                <TextField name="name" label="Application Name" />
                <TextField
                  autoComplete="off"
                  textarea
                  rows={3}
                  name="description"
                  label="Description"
                />
                <div>
                  <hr />
                  <h2>
                    <Icon icon="color" />
                    App Color
                  </h2>
                  {COLORS.map((color) => (
                    <ColorSelectButton
                      color={color}
                      key={color.value}
                      onColorSelected={handleColorChange}
                    />
                  ))}
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
      <Snackbar open={Boolean(error)} message={errorMessage} />
    </div>
  );
}

export default ApplicationForm;