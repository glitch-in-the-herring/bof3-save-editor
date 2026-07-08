import { type PropsWithChildren } from "react"

interface LabelProps extends PropsWithChildren {
  id?: string
  label: string
  divClassName?: string
  icon?: string
}

export default function Label({ id, label, divClassName, icon, children }: LabelProps) {
  return (
    <div className={`flex flex-row gap-1 ${divClassName}`}>
      {icon && <img src={icon} height={16} />}
      <label className="text-nowrap" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  )
}
