import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  multiline?: boolean;
  action?: boolean;
  disabled?: boolean;
}

/** Native plain-text fields, sized by the same text: no HTML or caret resets. */
export default function OceanInlineText({ value, onChange, label, multiline = false, action = false, disabled = false }: Props) {
  const className = `ocean-inline-text${multiline ? " is-multiline" : ""}${action ? " is-action" : ""}`;
  const shared = {
    value, disabled, "aria-label": label, placeholder: label,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };
  return <span className={className} data-ocean-control data-inline-edit-ui>
    <span className="ocean-inline-text-measure" aria-hidden="true">{value || label}{multiline ? "\n" : ""}</span>
    {multiline ? <textarea {...shared} rows={1} /> : <input {...shared} type="text" />}
  </span>;
}
