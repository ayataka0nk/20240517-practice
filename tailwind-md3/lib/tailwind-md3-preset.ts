export const tailwindMD3Preset = {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--md-sys-color-primary)/ <alpha-value>)',
        'on-primary': 'rgb(var(--md-sys-color-on-primary)/ <alpha-value>)',
        'primary-container':
          'rgb(var(--md-sys-color-primary-container)/ <alpha-value>)',
        'on-primary-container':
          'rgb(var(--md-sys-color-on-primary-container)/ <alpha-value>)',
        secondary: 'rgb(var(--md-sys-color-secondary)/ <alpha-value>)',
        'on-secondary': 'rgb(var(--md-sys-color-on-secondary)/ <alpha-value>)',
        'secondary-container':
          'rgb(var(--md-sys-color-secondary-container)/ <alpha-value>)',
        'on-secondary-container':
          'rgb(var(--md-sys-color-on-secondary-container)/ <alpha-value>)',
        tertiary: 'rgb(var(--md-sys-color-tertiary)/ <alpha-value>)',
        'on-tertiary': 'rgb(var(--md-sys-color-on-tertiary)/ <alpha-value>)',
        'tertiary-container':
          'rgb(var(--md-sys-color-tertiary-container)/ <alpha-value>)',
        'on-tertiary-container':
          'rgb(var(--md-sys-color-on-tertiary-container)/ <alpha-value>)',
        error: 'rgb(var(--md-sys-color-error)/ <alpha-value>)',
        'on-error': 'rgb(var(--md-sys-color-on-error)/ <alpha-value>)',
        'error-container':
          'rgb(var(--md-sys-color-error-container)/ <alpha-value>)',
        'on-error-container':
          'rgb(var(--md-sys-color-on-error-container)/ <alpha-value>)',
        background: 'rgb(var(--md-sys-color-background)/ <alpha-value>)',
        'on-background':
          'rgb(var(--md-sys-color-on-background)/ <alpha-value>)',
        surface: 'rgb(var(--md-sys-color-surface)/ <alpha-value>)',
        'surface-container-lowest':
          ' rgb(var(--md-sys-color-surface-container-lowest)/ <alpha-value>)',
        'surface-container-low':
          'rgb(var(--md-sys-color-surface-container-low)/ <alpha-value>)',
        'surface-container':
          'rgb(var(--md-sys-color-surface-container)/ <alpha-value>)',
        'surface-container-high':
          'rgb(var(--md-sys-color-surface-container-high)/ <alpha-value>)',
        'surface-container-highest':
          'rgb(var(--md-sys-color-surface-container-highest)/ <alpha-value>)',
        'on-surface': 'rgb(var(--md-sys-color-on-surface)/ <alpha-value>)',
        'on-surface-variant':
          'rgb(var(--md-sys-color-on-surface-variant)/ <alpha-value>)',
        outline: 'rgb(var(--md-sys-color-outline)/ <alpha-value>)',
        'outline-variant':
          'rgb(var(--md-sys-color-outline-variant)/ <alpha-value>)'
      },
      opacity: {
        8: '0.08',
        38: '0.38'
      },
      scale: {
        1000: '10'
      },
      inset: {
        13: '3.25rem'
      },
      padding: {
        13: '3.25rem',
        'side-nav': '22.5rem'
      },
      boxShadow: {
        'underline-thin': '0 1px 0 0 black',
        'underline-thick': '0 2px 0 0 black',
        'textfield-outlined-hover': '0 0 0 1px black',
        '1dp':
          '0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        '2dp':
          '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        '3dp':
          '0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.20), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
        '4dp':
          '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.20)',
        '6dp':
          '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.20)',
        '8dp':
          '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.20)',
        '16dp':
          '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0  6px 30px 5px rgba(0, 0, 0, 0.12), 0  8px 10px -5px rgba(0, 0, 0, 0.20)',
        '24dp':
          '0  9px 46px  8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px  3px rgba(0, 0, 0, 0.20)'
      },
      gridTemplateColumns: {
        features: 'grid grid-cols-[50px_1fr_4fr_60px_60px_50px] gap-2'
      },
      height: {
        header: '3rem'
      },
      width: {
        'side-nav': '22.5rem'
      },
      borderRadius: {
        '4xl': '1.75rem'
      },
      screens: {
        md: '600px',
        xp: '840px',
        lg: '1200px',
        xl: '1600px'
      }
    }
  },

  safelist: [
    // Search
    'sm:rounded-t-4xl',
    'md:rounded-t-4xl',
    'xp:rounded-t-4xl',
    'lg:rounded-t-4xl',
    'xl:rounded-t-4xl',
    'sm:before:rounded-t-4xl',
    'md:before:rounded-t-4xl',
    'xp:before:rounded-t-4xl',
    'lg:before:rounded-t-4xl',
    'xl:before:rounded-t-4xl',
    'sm:hidden',
    'md:hidden',
    'xp:hidden',
    'lg:hidden',
    'xl:hidden',
    'sm:block',
    'md:block',
    'xp:block',
    'lg:block',
    'xl:block',
    'sm:rounded-b-4xl',
    'md:rounded-b-4xl',
    'xp:rounded-b-4xl',
    'lg:rounded-b-4xl',
    'xl:rounded-b-4xl',
    'sm:h-auto',
    'md:h-auto',
    'xp:h-auto',
    'lg:h-auto',
    'xl:h-auto'
  ],

  plugins: []
}
