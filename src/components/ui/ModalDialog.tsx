import {Button} from "./Button.tsx";
import {useEffect} from "react";

type ModalContentProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose?: () => void;
  onSave?: () => void;
  formId?: string | null;
};

export default function ModalDialog({ onClose, onSave, className, children, formId = null, ...props }: ModalContentProps) {
  const classes = `
        shadow-[0_7px_29px_rgba(100,100,111,0.3)]
        absolute
        size-full
        top-0
        bottom-0 
        p-4
        sm:p-10
        md:p-20
        lg:p-30
        overflow-scroll
        bg-black
        bg-opacity-25
        flex
        flex-col
        justify-center
        items-center
        ${className}
    `;
  useEffect(() => {
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Unsets Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <div className={classes} {...props}>
      <div className="overflow-scroll max-w-3xl w-full">
        {children}
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button
            onClick={onSave}
            type={formId ? 'submit' : 'button'}
            {...(formId && ({ form: formId }))}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
