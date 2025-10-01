import React, { createContext, useContext, useMemo, useState, PropsWithChildren, ReactElement, cloneElement } from 'react';

type DialogContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function Dialog({ children, open: controlledOpen, onOpenChange }: PropsWithChildren<{ open?: boolean; onOpenChange?: (v: boolean) => void }>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = typeof controlledOpen === 'boolean';
  const open = isControlled ? controlledOpen! : uncontrolledOpen;
  const setOpen = (v: boolean) => {
    if (onOpenChange) {
      onOpenChange(v);
    } else {
      setUncontrolledOpen(v);
    }
  };
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild }: { children: ReactElement<any>; asChild?: boolean }) {
  const ctx = useContext(DialogContext);
  if (!ctx) return children;

  const props = {
    onClick: (e: React.MouseEvent) => {
      children.props?.onClick?.(e);
      ctx.setOpen(true);
    }
  };

  return asChild ? cloneElement(children, props) : (
    <button onClick={props.onClick}>
      {children}
    </button>
  );
}

export function DialogClose({ children, asChild }: { children: ReactElement<any>; asChild?: boolean }) {
  const ctx = useContext(DialogContext);
  if (!ctx) return children;
  const props = {
    onClick: (e: React.MouseEvent) => {
      children.props?.onClick?.(e);
      ctx.setOpen(false);
    }
  };
  return asChild ? cloneElement(children, props) : (
    <button onClick={props.onClick}>
      {children}
    </button>
  );
}

export function DialogContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(DialogContext);
  if (!ctx || !ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={() => ctx.setOpen(false)} />
      <div className={"relative z-10 w-full max-w-lg mx-4 bg-white rounded-lg shadow-xl " + (className ?? '')}
           onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }: PropsWithChildren) {
  return (
    <div className=" ">
      {children}
    </div>
  );
}

export function DialogTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="text-xl font-bold text-gray-900">{children}</h2>
  );
}

export default Dialog;
