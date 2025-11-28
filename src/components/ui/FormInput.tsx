import type {FieldValues, Path, UseFormRegister} from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage.tsx";
import type {InputHTMLAttributes} from "react";

type BaseFormInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "required"
> & {
  id: string;
};

// if no register then it's a native component behaviour, so required should be a boolean
type NoRegisterProps = BaseFormInputProps & {
  register?: undefined;
  id: string;
  required?: boolean;
};

// if register then required could possibly be a string
type WithRegisterProps<T extends FieldValues> = BaseFormInputProps & {
  register: UseFormRegister<T>;
  id: Path<T>;
  required?: boolean | string;
  error?: string;
};

export type FormInputProps<T extends FieldValues> =
    | NoRegisterProps
    | WithRegisterProps<T>;


const FormInput = <T extends FieldValues>({id, register, required, ...props}: FormInputProps<T>) => {
  const error = "error" in props ? props.error : null;
  return (
    <>
      <input
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

export default FormInput;