import type {LabelHTMLAttributes} from "react";

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  id: string
  text: string
};
const FormLabel = ({id, text, ...props}: FormLabelProps) => {
  return <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2" {...props}>{text}</label>;
};
export default FormLabel;