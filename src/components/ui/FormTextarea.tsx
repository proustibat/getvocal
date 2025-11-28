import type {FieldValues, Path, UseFormRegister} from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage.tsx";
import type { TextareaHTMLAttributes} from "react";

type BaseFormTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "required"
> & {
  id: string;
};

// if no register then it's a native component behaviour, so required should be a boolean
type NoRegisterProps = BaseFormTextareaProps & {
  register?: undefined;
  id: string;
  required?: boolean;
};

// if register then required could possibly be a string
type WithRegisterProps<T extends FieldValues> = BaseFormTextareaProps & {
  register: UseFormRegister<T>;
  id: Path<T>;
  required?: boolean | string;
  error?: string;
};

export type TextAreaInputProps<T extends FieldValues> =
    | NoRegisterProps
    | WithRegisterProps<T>;


const FormTextArea = <T extends FieldValues>({id, register, required, ...props}: TextAreaInputProps<T>) => {
  const error = "error" in props ? props.error : null;
  return (
    <>
      <textarea
        id={id}
        {...(register
          ? register(id, {required})
          : {
            required: !!required,
            "aria-required": !!required,
          })}
        className={`form-field ${error && "form-field-error"}`}
        {...props}
      />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </>
  );
};

export default FormTextArea;