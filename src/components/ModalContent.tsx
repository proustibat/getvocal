import {Button, Card} from "./ui";

type ModalContentProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  onSave: () => void;
};

export default function ModalContent({ onClose, onSave, className, ...props }: ModalContentProps) {
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
      <Card className="mb-2">
        <h1 className="text-2xl uppercase">Add a new step</h1>
        <div>Here should be the form</div>
      </Card>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button></div>
    </div>
  );
}
