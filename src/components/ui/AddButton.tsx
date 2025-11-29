import {Button} from "./Button.tsx";
import type {ButtonHTMLAttributes} from "react";
import {Lineicons} from "@lineiconshq/react-lineicons";
import {PlusStroke} from "@lineiconshq/free-icons";

const AddButton = ({onClick, children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button variant="secondary" onClick={onClick} {...props}><Lineicons icon={PlusStroke} size={20}/>{children}</Button>
  );
};

export default AddButton;