import type {FieldValues, Path, UseFormRegister} from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage.tsx";
import type {SelectHTMLAttributes} from "react";

type BaseFormSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "required"> & {
  id: string;
  options: {value:string, text: string}[];
  placeholder?: string;
};

// if no register then it's a native component behaviour, so required should be a boolean
type NoRegisterProps = BaseFormSelectProps & {
  register?: undefined;
  id: string;
  required?: boolean;
};

// if register then required could possibly be a string
type WithRegisterProps<T extends FieldValues> = BaseFormSelectProps & {
  register: UseFormRegister<T>;
  id: Path<T>;
  required?: boolean | string;
  error?: string;
};

export type FormSelectProps<T extends FieldValues> =
    | NoRegisterProps
    | WithRegisterProps<T>;

const FormSelect = <T extends FieldValues>({id, register, required, options, placeholder, ...props}: FormSelectProps<T>) => {
  const error = "error" in props ? props.error : null;
  return (
    <>
      <select
        id={id}
        {...(register
          ? register(id, {required})
          : {
            required: !!required,
            "aria-required": !!required,
          })}
        className={`form-field ${error && "form-field-error"}`}
        {...props}
      >
        {placeholder && <option value="" disabled selected>{placeholder}</option>}
        {
          options.map(({value, text}) => <option key={value} value={value}>{text}</option>)
        }
      </select>
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </>
  );
};

export default FormSelect;