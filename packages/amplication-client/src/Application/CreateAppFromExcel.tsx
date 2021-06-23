import React from "react";
import { Link } from "react-router-dom";
import { Snackbar } from "@rmwc/snackbar";
import classNames from "classnames";
import { isEmpty } from "lodash";

import { EnumImages, SvgThemeImage } from "../Components/SvgThemeImage";

import "./CreateAppFromExcel.scss";
import { CreateAppFromExcelForm } from "./CreateAppFromExcelForm";
import ProgressBar from "../Components/ProgressBar";
import { Icon } from "@rmwc/icon";
import  useCreateAppFromExcel from "./useCreateAppFromExcel";

export const CLASS_NAME = "create-app-from-excel";

export function CreateAppFromExcel() { 

  const {
    fileName,
    appsExist,
    isDragActive,
    loading,
    initialValues,
    error,
    generalError,
    errorMessage,
    getRootProps,
    getInputProps,
    handleStartFromScratch,
    handleStartFromSample,
    handleSubmit,
    clearGeneralError,
    clearSelectedFile
  } = useCreateAppFromExcel();

  return (
    <div className={CLASS_NAME}>
      <div className={`${CLASS_NAME}__layout`}>
        {loading ? (
          <div className={`${CLASS_NAME}__processing`}>
            <div className={`${CLASS_NAME}__processing__title`}>
              All set! We’re currently generating your app.
            </div>
            <div className={`${CLASS_NAME}__processing__message`}>
              It should only take a few seconds to finish. Don't go away!
            </div>

            <SvgThemeImage image={EnumImages.Generating} />
            <div className={`${CLASS_NAME}__processing__loader`}>
              <ProgressBar />
            </div>
            <div className={`${CLASS_NAME}__processing__tagline`}>
              For a full experience, connect with a GitHub repository and get a
              new Pull Request every time you make changes in your data model.
            </div>
          </div>
        ) : isEmpty(fileName) ? (
          <div className={`${CLASS_NAME}__select-file`}>
            {appsExist && (
              <Link to="/" className={`${CLASS_NAME}__back`}>
                <Icon icon="arrow_left" />
                Back
              </Link>
            )}
            <div className={`${CLASS_NAME}__header`}>
              <SvgThemeImage image={EnumImages.ImportExcel} />
              <h2>Start with schema from excel</h2>
              <div className={`${CLASS_NAME}__message`}>
                Start building your application from an existing schema. Just
                upload an excel or CSV file to import its schema, and generate
                your node.JS application source code
              </div>
            </div>

            <div
              {...getRootProps()}
              className={classNames(`${CLASS_NAME}__dropzone`, {
                [`${CLASS_NAME}__dropzone--active`]: isDragActive,
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag and drop a file here, or click to select a file</p>
              )}
            </div>
            <div className={`${CLASS_NAME}__divider`}>or</div>
            <div className={`${CLASS_NAME}__other-options`}>
              <Link
                onClick={handleStartFromScratch}
                className={`${CLASS_NAME}__other-options__option`}
              >
                <SvgThemeImage image={EnumImages.AddApp} />
                <div>Start From Scratch</div>
              </Link>
              <Link
                onClick={handleStartFromSample}
                className={`${CLASS_NAME}__other-options__option`}
              >
                <SvgThemeImage image={EnumImages.SampleApp} />
                <div>Start from a sample app</div>
              </Link>
            </div>
          </div>
        ) : (
          <CreateAppFromExcelForm
            fileName={fileName}
            loading={loading}
            onClearForm={clearSelectedFile}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          />
        )}
        <Snackbar
          open={Boolean(error) || Boolean(generalError)}
          message={errorMessage}
          onClose={clearGeneralError}
        />
      </div>
    </div>
  );
}