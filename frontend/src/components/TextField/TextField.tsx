import { memo } from 'react'
import { TextFieldSingleline } from './TextFieldSingleline'
import { TextFieldMultiline } from './TextFieldMultiline'
import { TextFieldProps } from './type'

export const TextField = memo((props: TextFieldProps) => {
  if (props.multiline) {
    const { multiline, ...p } = props
    return <TextFieldMultiline {...p} />
  } else {
    const { multiline, ...p } = props
    return <TextFieldSingleline {...p} />
  }
})

TextField.displayName = 'TextField'
