interface InputProps {
  id?: string
  name?: string
  label?: string
  inputType?: React.HTMLInputTypeAttribute
  divClassName?: string
  inputClassName?: string
  icon?: string
  value?: string | number
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>
}

export default function Input({
  id,
  name,
  label,
  inputType,
  divClassName,
  inputClassName,
  icon,
  value,
  disabled,
  onChange,
}: InputProps) {
  return (
    <div className={`flex flex-row gap-1 ${divClassName}`}>
      {icon && <img src={icon} height={16} />}
      {label && (
        <label className="text-nowrap" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={inputType}
        className={inputClassName}
        value={value === undefined ? "" : value}
        disabled={disabled}
        onChange={onChange}
      ></input>
    </div>
  )
}
