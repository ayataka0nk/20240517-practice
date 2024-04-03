import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { BackgroundColorToken, getBackgroundStyle } from '../BackgroundColor'

export type DialogProps = {
  headline: string
  supportingText: string
  bg?: BackgroundColorToken
  leftButton: JSX.Element
  rightButton?: JSX.Element
} & ComponentPropsWithoutRef<'dialog'>

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      className,
      headline,
      supportingText,
      bg = 'surface-container-high',
      leftButton,
      rightButton,
      ...props
    },
    forwardedRef
  ) => {
    const bgStyle = getBackgroundStyle(bg)
    const style = getStyle()
    return (
      <dialog
        ref={forwardedRef}
        className={`${className} ${bgStyle} ${style}`}
        {...props}
      >
        <p className="text-2xl mb-4">{headline}</p>
        <p className="mb-6">{supportingText}</p>
        <div className="flex justify-end gap-2">
          {leftButton}
          {rightButton}
        </div>
      </dialog>
    )
  }
)

const getStyle = () => {
  const styles = [
    'p-6',
    'rounded-[28px]',
    'max-w-[560px]',
    'min-w-[280px]',
    'backdrop:bg-black/60'
  ]
  return styles.join(' ')
}
