import { MonthOption } from './type'

export const getMonthOption = (month: number): MonthOption => {
  const options = getMonthOptions()
  const option = options.find((option) => option.value === month)
  if (typeof option === 'undefined') {
    throw new Error('Invalid month')
  }
  return option
}

export const getMonthOptions = (): MonthOption[] => {
  return [
    { label: 'January', shortLabel: 'Jan', value: 0 },
    {
      label: 'February',
      shortLabel: 'Feb',
      value: 1
    },
    {
      label: 'March',
      shortLabel: 'Mar',
      value: 2
    },
    {
      label: 'April',
      shortLabel: 'Apr',
      value: 3
    },
    {
      label: 'May',
      shortLabel: 'May',
      value: 4
    },
    {
      label: 'June',
      shortLabel: 'Jun',
      value: 5
    },
    {
      label: 'July',
      shortLabel: 'Jul',
      value: 6
    },
    {
      label: 'August',
      shortLabel: 'Aug',
      value: 7
    },
    {
      label: 'September',
      shortLabel: 'Sep',
      value: 8
    },
    {
      label: 'October',
      shortLabel: 'Oct',
      value: 9
    },
    {
      label: 'November',
      shortLabel: 'Nov',
      value: 10
    },
    {
      label: 'December',
      shortLabel: 'Dec',
      value: 11
    }
  ]
}
