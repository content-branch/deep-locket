import React, { useCallback } from "react";
import { useField } from "formik";
import { TextInput, Props as TextInputProps } from "../TextInput/TextInput";

export type Props = Omit<TextInputProps, "hasError"> & {
  name: string;
};

export const TextField = (props: Props) => {
  // @ts-ignore
  const [field, meta] = useField(props);
  const { onChange, ...rest } = props;

  const handleChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(event);
      }
      field.onChange(event);
    },
    [onChange, field]
  );
  return (
    <TextInput
      {...rest}
      {...field}
      onChange={handleChange}
      hasError={Boolean(meta.error) && meta.touched}
      helpText={props.helpText || meta.error}
    />
  );
};
