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
    <div>
      <Button
        {...props}
        className={`
              size-[${buttonSize}px]
              rounded-full
              force-reset-spacing
              ${className}
            `}
      >
        <Lineicons
          className={`
                ${iconClassName} 
                ${isIconFilled ? "fill-current" : "fill-transparent"}
                size-[${iconSize}px]
              `}
          icon={icon}
          size={iconSize}
          strokeWidth={1.5}
        />
      </Button>
    </div>

  );

};

export default ButtonIcon;