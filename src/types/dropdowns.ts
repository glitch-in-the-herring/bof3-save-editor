export interface DropdownProps {
  id?: string
  value?: string | number
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>
}
