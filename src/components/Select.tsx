import React, { useEffect, useRef, useState } from 'react';

type OptionData = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

export function Select({ value, onChange, children, className = '' }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const options = React.Children.toArray(children).flatMap((child): OptionData[] => {
    if (
      React.isValidElement<{ value?: string | number; children?: React.ReactNode; disabled?: boolean }>(child) &&
      child.type === 'option'
    ) {
      return [{
        value: String(child.props.value ?? ''),
        label: child.props.children,
        disabled: child.props.disabled,
      }];
    }
    return [];
  });

  const placeholder = options.find((option) => option.value === '')?.label ?? 'Select';
  const menuOptions = options.filter((option) => option.value !== '');
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 text-left text-[14px] transition-colors hover:border-border-strong hover:bg-raised focus:outline-none focus:ring-2 focus:ring-ink/20"
      >
        <span className={selected && selected.value !== '' ? 'text-ink' : 'text-muted'}>
          {selected && selected.value !== '' ? selected.label : placeholder}
        </span>
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-grey-light text-ink transition-colors group-hover:bg-surface">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border border-border bg-surface p-1 shadow-lg"
        >
          {menuOptions.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  disabled={option.disabled}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-[14px] transition-colors ${
                    active
                      ? 'bg-purple/10 font-medium text-ink'
                      : 'text-secondary hover:bg-raised hover:text-ink'
                  } ${option.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
                >
                  <span>{option.label}</span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="flex-shrink-0 text-purple">
                      <path d="M2.5 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
