import { memo } from 'react'
import { TextFieldSingleline } from './TextFieldSingleline'
import { TextFieldMultiline } from './TextFieldMultiline'
import { TextAreaProps, TextFieldProps, TextInputProps } from './type'

export const TextField = memo(({ multiline, ...props }: TextFieldProps) => {
  if (multiline) {
    const p = props as TextAreaProps
    return <TextFieldMultiline {...p} />
  } else {
    const p = props as TextInputProps
    return <TextFieldSingleline {...p} />
  }
})

TextField.displayName = 'TextField'
