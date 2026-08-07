import React, { createContext, useContext, useMemo, useState, PropsWithChildren } from 'react';

type SelectContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  value?: string;
  setValue: (v?: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export function Select({ value, defaultValue, onValueChange, children }: PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void }>) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (newValue: string | undefined) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (newValue !== undefined) {
      onValueChange?.(newValue);
    }
  };

  const ctx = useMemo(() => ({ open, setOpen, value: currentValue, setValue: handleValueChange }), [open, currentValue]);
  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>;
}

export function SelectTrigger({ children, className }: PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(SelectContext);
  const baseClass = `w-full border rounded px-3 py-2 text-left`;
  const merged = className ? `${baseClass} ${className}` : baseClass;
  if (!ctx) return <button className={merged}>{children}</button>;
  return (
    <button
      type="button"
      className={merged}
      onClick={() => ctx.setOpen(!ctx.open)}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, className }: { placeholder?: string; className?: string }) {
  const ctx = useContext(SelectContext);
  const display = ctx?.value ?? placeholder ?? '';
  return <span className={className}>{display}</span>;
}

export function SelectContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(SelectContext);
  if (!ctx?.open) return null;
  return (
    <div className={`mt-1 w-full border rounded bg-white shadow${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}

export function SelectItem({ value, children, onClick, className }: PropsWithChildren<{ value: string; onClick?: () => void; className?: string }>) {
  const ctx = useContext(SelectContext);
  const baseClass = `px-3 py-2 hover:bg-gray-50 cursor-pointer`;
  if (!ctx) return <div className={className ? `${baseClass} ${className}` : baseClass}>{children}</div>;
  const isSelected = ctx.value === value;
  return (
    <div
      className={`${baseClass} ${isSelected ? 'bg-gray-100' : ''}${className ? ` ${className}` : ''}`}
      onClick={() => { ctx.setValue(value); ctx.setOpen(false); onClick?.(); }}
      role="option"
      aria-selected={isSelected}
    >
      {children}
    </div>
  );
}

export default Select;
