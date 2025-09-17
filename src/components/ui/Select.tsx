import React, { createContext, useContext, useMemo, useState, PropsWithChildren } from 'react';

type SelectContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  value?: string;
  setValue: (v?: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export function Select({ defaultValue, children }: PropsWithChildren<{ defaultValue?: string }>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const ctx = useMemo(() => ({ open, setOpen, value, setValue }), [open, value]);
  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>;
}

export function SelectTrigger({ children }: PropsWithChildren) {
  const ctx = useContext(SelectContext);
  if (!ctx) return <button className="w-full border rounded px-3 py-2">{children}</button>;
  return (
    <button
      type="button"
      className="w-full border rounded px-3 py-2 text-left"
      onClick={() => ctx.setOpen(!ctx.open)}
    >
      {children}
    </button>
  );
}

export function SelectValue() {
  const ctx = useContext(SelectContext);
  return <span>{ctx?.value ?? ''}</span>;
}

export function SelectContent({ children }: PropsWithChildren) {
  const ctx = useContext(SelectContext);
  if (!ctx?.open) return null;
  return (
    <div className="mt-1 w-full border rounded bg-white shadow">
      {children}
    </div>
  );
}

export function SelectItem({ value, children }: PropsWithChildren<{ value: string }>) {
  const ctx = useContext(SelectContext);
  if (!ctx) return <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">{children}</div>;
  const isSelected = ctx.value === value;
  return (
    <div
      className={`px-3 py-2 hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-gray-100' : ''}`}
      onClick={() => { ctx.setValue(value); ctx.setOpen(false); }}
      role="option"
      aria-selected={isSelected}
    >
      {children}
    </div>
  );
}

export default Select;
