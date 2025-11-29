import {Button, type ButtonProps} from "./Button.tsx";
import {Lineicons} from "@lineiconshq/react-lineicons";

type IconData =  {
  name: string,
  svg: string,
  viewBox: string,
  hasFill: boolean,
  hasStroke: boolean,
  hasStrokeWidth: boolean,
  category: string,
  variant: string,
  style: string
};

type ButtonIconProps = ButtonProps & {
  icon: IconData,
  isIconFilled?: boolean
  iconSize: number,
  buttonSize: number,
  iconClassName?: string,
};

const ButtonIcon = ({icon, isIconFilled=false, iconSize, buttonSize, className, iconClassName, ...props}: ButtonIconProps) => {
  return (
    <Button
      {...props}
      className={`
        rounded-[${buttonSize}px]
        p-0 m-0
        h-[${buttonSize}px] w-[${buttonSize}px]
        flex justify-center items-center
        ${className}
      `}
    >
      <Lineicons
        className={`
          absolute 
          rounded-full 
          ${iconClassName} 
          ${isIconFilled ? "fill-current" : "fill-transparent"}
        `}
        icon={icon} size={iconSize} strokeWidth={1.5}
      />
    </Button>
  );

};

export default ButtonIcon;