import {Button} from "./Button.tsx";
import {Lineicons} from "@lineiconshq/react-lineicons";
import {StarFatStroke} from "@lineiconshq/free-icons";

type ButtonFavoriteProps = {
  onClick: () => void;
  isSelected?: boolean
};
const ButtonFavorite = ({onClick, isSelected}: ButtonFavoriteProps) => {
  return (
    <Button
      type="button"
      aria-label={isSelected? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      className="rounded-[16px] focus:outline-none p-0 m-0 h-[32px] w-[32px] flex justify-center items-center bg-transparent hover:bg-transparent"
    >
      <Lineicons className="text-amber-500 absolute" icon={StarFatStroke} size={24} strokeWidth={1.5} fill={isSelected? "currentColor" : "none"} />
    </Button>
  );
};

export default ButtonFavorite;