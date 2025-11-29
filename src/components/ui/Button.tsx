export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: `
        text-slate-50 hover:text-slate-900 
        bg-slate-900 hover:bg-slate-100
        border border-transparent hover:border-slate-300
    `,
  secondary: `
        text-slate-900 hover:text-slate-50
        bg-slate-100 hover:bg-slate-900
        border border-slate-300 hover:border-transparent
  `,
  ghost: `
        text-slate-600 hover:text-slate-900
        bg-transparent hover:bg-slate-50
        border border-transparent hover:border-slate-200
  `,
};

export const Button = ({ variant, className = '', ...props }: ButtonProps) => {
  const classes = `
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded text-sm font-medium
        transition-all duration-[450ms] ease-out
        outline-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100
        cursor-pointer
        ${props.disabled ? "disabled:bg-gray-300" : ""}
        ${variant ? VARIANT_CLASSES[variant] : ""} 
        ${className}
    `;
  return <button type="button" disabled={props.disabled} className={classes} {...props} />;
};

