import {Button} from "./Button.tsx";

type ModalContentProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  onSave: () => void;
};

export default function ModalDialog({ onClose, onSave, className, children, ...props }: ModalContentProps) {
  const classes = `
        shadow-[0_7px_29px_rgba(100,100,111,0.3)]
        bg-white
        border-solid
        border-[2px]
        rounded-[12px]
        absolute
        size-[var(--modal-width)]
        top-[calc(var(--modal-margin)/2)]
        left-[calc(var(--modal-margin)/2)] 
        p-4
        ${className}
    `;
  return (
    <div className={classes} {...props}>
      {children}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button></div>
    </div>
  );
}
