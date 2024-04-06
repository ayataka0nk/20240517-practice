import { forwardRef, memo } from 'react'
import { FilledTextArea } from './FilledTextArea'
import { TextAreaProps } from './type'

const TextAreaComponent = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props: TextAreaProps, ref) => {
    return <FilledTextArea ref={ref} {...props} />
  }
)

export const TextArea = memo(TextAreaComponent)
