import { ComponentPropsWithRef, forwardRef } from 'react'

type Props = ComponentPropsWithRef<'input'>
export const TimePickerInputField = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    const wrapper = getWrapperStyle()
    const style = getStyle()
    return (
      <div className={wrapper}>
        <input
          type="text"
          ref={ref}
          className={`${className} ${style}`}
          maxLength={2}
          {...props}
        />
      </div>
    )
  }
)
const getWrapperStyle = () => {
  const styles = [
    'relative',
    'inline-block',
    'hover:after:pointer-events-none',
    'hover:after:absolute',
    'hover:after:inset-0',
    'hover:after:bg-on-surface',
    'hover:after:opacity-8',
    'hover:after:rounded-[8px]'
  ]
  return styles.join(' ')
}

const getStyle = () => {
  const styles = [
    'cursor-pointer',
    'bg-surface-container-highest',
    'rounded-[8px]',
    'outline-none',
    'w-[96px]',
    'h-[72px]',
    'text-[45px]',
    'text-on-surface',
    'leading-[52px]',
    'px-6',
    'focus:bg-primary-container',
    'focus:shadow-[0_0_0_2px]',
    'focus:shadow-primary',
    'focus:text-on-primary-container'
  ]
  return styles.join(' ')
}
