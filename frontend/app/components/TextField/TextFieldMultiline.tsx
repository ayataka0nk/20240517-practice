import { ComponentProps, FormEventHandler, useCallback } from 'react'
import {
  getInputStyles,
  getInputWrapperStyles,
  getLabelStyles,
  getSupportingTextStyles
} from './styles'
import { TextFieldOwnProps } from './type'

type Props = ComponentProps<'textarea'> & TextFieldOwnProps

export const TextFieldMultiline = ({
  id,
  label,
  icon,
  error,
  supportingText,
  className,
  ...props
}: Props) => {
  const labelStyles = getLabelStyles(icon, error)
  const inputStyles = getInputStyles(icon, error, true)
  const supportingTextStyles = getSupportingTextStyles(error)
  const inputWrapper = getInputWrapperStyles()
  const autoresize: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const textarea = event.target as HTMLTextAreaElement
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    },
    []
  )

  return (
    <div className={`relative ${className}`}>
      <div className={inputWrapper}>
        <textarea
          id={id}
          className={inputStyles}
          placeholder=""
          rows={1}
          onInput={autoresize}
          {...props}
        />
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
