import { ComponentProps } from 'react'
import {
  getInputStyles,
  getInputWrapperStyles,
  getLabelStyles,
  getSupportingTextStyles
} from './styles'
import { TextFieldOwnProps } from './type'

type Props = ComponentProps<'input'> & TextFieldOwnProps

export const TextFieldSingleline = ({
  id,
  label,
  icon,
  error,
  supportingText,
  className,
  ...props
}: Props) => {
  const labelStyles = getLabelStyles(icon, error)
  const inputStyles = getInputStyles(icon, error, false)
  const supportingTextStyles = getSupportingTextStyles(error)
  const inputWrapper = getInputWrapperStyles()

  return (
    <div className={`relative ${className}`}>
      <div className={inputWrapper}>
        <input id={id} className={inputStyles} placeholder="" {...props} />
        {label && (
          <label htmlFor={id} className={labelStyles}>
            {label}
          </label>
        )}
      </div>
      <p className={supportingTextStyles}>
        {supportingText && supportingText} {error && error}
      </p>
    </div>
  )
}
