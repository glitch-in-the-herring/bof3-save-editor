interface InputProps {
  id?: string
  name?: string
  label?: string
  inputType?: React.HTMLInputTypeAttribute
  divClassName?: string
  inputClassName?: string
  icon?: string
  iconHeight?: number
  iconWidth?: number
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
  iconHeight,
  iconWidth,
  value,
  disabled,
  onChange,
}: InputProps) {
  return (
    <div className={`${divClassName ? divClassName : "flex flex-row gap-1"}`}>
      {icon && <img src={icon} height={iconHeight ?? 16} width={iconWidth ?? 16} />}
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
