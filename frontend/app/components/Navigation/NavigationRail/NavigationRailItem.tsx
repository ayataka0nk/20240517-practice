import { Icon, IconType } from '@/components/Icon'
import { PolymorphicComponentProps } from '@/components/type'
import { ElementType } from 'react'

type Props<E extends ElementType> = PolymorphicComponentProps<
  E,
  {
    icon: IconType
    active?: boolean
    labelText?: string
  }
>

export const NavigationRailItem = <E extends ElementType>({
  className,
  icon,
  active,
  labelText,
  component,
  ...props
}: Props<E>) => {
  const Component = component || 'div'
  const rootStyle = getRootStyle({ labelText })
  const iconWrapperStyle = getIconWrapperStyle({ active, labelText })
  const textLabelStyle = getLabelTextStyle({ active })
  return (
    <Component className={`${rootStyle} ${className}`} {...props}>
      <div className={iconWrapperStyle}>
        <Icon className="w-6 h-6" variant="outline" type={icon} />
      </div>
      {labelText && <span className={textLabelStyle}>{labelText}</span>}
    </Component>
  )
}

type StyleProps = { active?: boolean; labelText?: string }

const getRootStyle = ({ labelText }: StyleProps) => {
  let styles = [
    'display',
    'flex',
    'flex-col',
    'items-center',
    'h-14',
    'text-on-surface',
    'cursor-pointer',
    // hover
    '[&>div]:hover:after:pointer-events-none',
    '[&>div]:hover:after:absolute',
    '[&>div]:hover:after:inset-0',
    '[&>div]:hover:after:w-full',
    '[&>div]:hover:after:h-full',
    '[&>div]:hover:after:bg-on-surface',
    '[&>div]:hover:after:opacity-8',
    // ripple
    '[&>div]:before:absolute',
    '[&>div]:before:inset-0',
    '[&>div]:before:w-full',
    '[&>div]:before:h-full',
    '[&>div]:before:bg-on-surface',
    '[&>div]:before:opacity-0',
    '[&>div]:before:transform',
    '[&>div]:before:scale-10',
    '[&>div]:before:[transition:transform_.3s,opacity_1.2s]',
    '[&>div]:active:before:scale-0',
    '[&>div]:active:before:duration-0',
    '[&>div]:active:before:opacity-10'
  ]
  if (labelText) {
    styles = [...styles, '[&>div]:before:rounded-xl']
  } else {
    styles = [...styles, '[&>div]:before:rounded-4xl']
  }
  return styles.join(' ')
}

const getIconWrapperStyle = ({ active, labelText }: StyleProps) => {
  let styles: string[] = [
    'overflow-hidden',
    'relative',
    'flex',
    'items-center',
    'justify-center',
    'w-14'
  ]
  if (labelText) {
    styles = [...styles, 'h-8', 'rounded-xl']
  } else {
    styles = [...styles, 'h-14', 'rounded-4xl']
  }
  if (active) {
    styles = [...styles, 'bg-secondary-container']
  } else {
    styles = [...styles]
  }
  return styles.join(' ')
}

const getLabelTextStyle = ({ active }: StyleProps) => {
  let styles: string[] = ['text-xs', 'mt-1']
  if (active) {
    styles = [...styles, 'font-bold']
  }
  return styles.join(' ')
}
