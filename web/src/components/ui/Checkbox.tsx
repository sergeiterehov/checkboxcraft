import "./Checkbox.scss";

export const CheckboxSize = 16;

export const Checkbox: React.FC<{ checked?: boolean; onChange?(value: boolean): void }> = (props) => {
  const { checked, onChange } = props;

  return (
    <input
      type="checkbox"
      className="Checkbox"
      checked={checked}
      onChange={(e) => onChange?.(Boolean(e.currentTarget.checked))}
    />
  );
};
