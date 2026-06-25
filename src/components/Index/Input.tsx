interface InputProps {
  id: string
  name: string
  label: string
  inputType?: React.HTMLInputTypeAttribute
  divClassName?: string
  inputClassName?: string
  icon?: string
  value?: string | number
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
}: InputProps) {
  return (
    <div className={`flex flex-row gap-1 ${divClassName}`}>
      {icon && <img src={icon} height={16} />}
      <label className="text-nowrap">{label}</label>
      <input
        id={id}
        name={name}
        type={inputType}
        className={inputClassName}
        value={value === undefined ? "" : value}
      ></input>
    </div>
  )
}
