import ButtonIcon from "./ButtonIcon.tsx";
import {StarFatStroke} from "@lineiconshq/free-icons";

type ButtonFavoriteProps = {
  onClick: () => void;
  isSelected?: boolean
};
const ButtonFavorite = ({onClick, isSelected}: ButtonFavoriteProps) => {
  return (
    <ButtonIcon
      icon={StarFatStroke}
      iconSize={32}
      buttonSize={32}
      className="
        border border-transparent
        hover:border hover:border-amber-500
        bg-transparent hover:bg-transparent
      "
      iconClassName="text-amber-500 p-1 transition-colors duration-300 ease-out"
      isIconFilled={isSelected}
      aria-label={isSelected? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
    />
  );
};

export default ButtonFavorite;