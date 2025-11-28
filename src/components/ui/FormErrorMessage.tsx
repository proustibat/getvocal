import type {PropsWithChildren} from "react";

const FormErrorMessage = ({children}:PropsWithChildren) => <p className="text-red-500 text-xs italic m-0 p-0">{children}</p>;

export default FormErrorMessage;
