import React from "react";
import {  Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { GlobalHotKeys } from "react-hotkeys";

import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/styles";
import { Snackbar } from "@rmwc/snackbar";
import "@rmwc/snackbar/styles";
import { validate } from "../util/formikValidateJsonSchema";

import { TextField } from "@amplication/design-system";
import { Button, EnumButtonStyle } from "../Components/Button";
import { CROSS_OS_CTRL_ENTER } from "../util/hotkeys";
import { SvgThemeImage, EnumImages } from "../Components/SvgThemeImage";
import "./NewApplication.scss";
import useNewApplication, { STEP_SELECT_TYPE } from "./useNewApplication";

type Values = {
  name: string;
  description: string;
};

const INITIAL_VALUES = {
  name: "",
  description: "",
};

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
const CLASS_NAME = "new-application";

const keyMap = {
  SUBMIT: CROSS_OS_CTRL_ENTER,
};


const NewApplication = () => {
  
  const {
    loading,
    currentStep,
    error,
    errorMessage,
    handleSubmit,
    StepImportExcel,
    StepSelectType,
    StepStartFromScratch
  } = useNewApplication();
  
  return (
    <div className={CLASS_NAME}>
      {currentStep === STEP_SELECT_TYPE ? (
        <div className={`${CLASS_NAME}__step1`}>
          <Link
            onClick={StepStartFromScratch}
            to=""
            className={`${CLASS_NAME}__step1__option`}
          >
            <SvgThemeImage image={EnumImages.AddApp} />
            <div className={`${CLASS_NAME}__step1__option__title`}>
              Start from scratch
            </div>
          </Link>
          <Link
            to="/create-app"
            onClick={StepImportExcel}
            className={`${CLASS_NAME}__step1__option`}
          >
            <SvgThemeImage image={EnumImages.ImportExcel} />
            <div className={`${CLASS_NAME}__step1__option__title`}>
              Import schema from Excel
            </div>
          </Link>
        </div>
      ) : (
        <div className={`${CLASS_NAME}__step2`}>
          <SvgThemeImage image={EnumImages.AddApp} />

          <div className={`${CLASS_NAME}__step2__form`}>
            <div className={`${CLASS_NAME}__step2__form__title`}>
              Start from scratch
            </div>
            <Formik
              initialValues={INITIAL_VALUES}
              validate={(values: Values) => validate(values, FORM_SCHEMA)}
              onSubmit={handleSubmit}
              validateOnMount
            >
              {(formik) => {
                const handlers = {
                  SUBMIT: formik.submitForm,
                };
                return (
                  <Form>
                    <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
                    <TextField
                      name="name"
                      label="Give your new app a descriptive name"
                      autoComplete="off"
                      disabled={loading}
                    />
                    <div className={`${CLASS_NAME}__step2__form__buttons`}>
                      <Button
                        buttonStyle={EnumButtonStyle.Primary}
                        disabled={!formik.isValid || loading}
                        type="submit"
                      >
                        Create App
                      </Button>
                      <Button
                        buttonStyle={EnumButtonStyle.Clear}
                        disabled={loading}
                        onClick={StepSelectType}
                        type="button"
                        className={`${CLASS_NAME}__step2__form__buttons__back`}
                      >
                        Back
                      </Button>
                      {loading && <CircularProgress />}
                    </div>

                    <Snackbar open={Boolean(error)} message={errorMessage} />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewApplication;
