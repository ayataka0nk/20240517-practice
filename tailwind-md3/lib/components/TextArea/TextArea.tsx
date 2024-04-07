import { forwardRef, memo } from 'react'
import { FilledTextArea } from './FilledTextArea'
import { TextAreaProps } from './type'
import { OutlinedTextArea } from './OutlinedTextArea'

const TextAreaComponent = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props: TextAreaProps, ref) => {
    if (typeof props.variant === 'undefined' || props.variant === 'filled') {
      return <FilledTextArea ref={ref} {...props} />
    } else {
      return <OutlinedTextArea ref={ref} {...props} />
    }
  }
)

export const TextArea = memo(TextAreaComponent)
