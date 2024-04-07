import { useState } from 'react'

export const DatePicker = () => {
  const [value, setValue] = useState('')
  console.log('value', value)
  return (
    <div>
      <input
        type="time"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </div>
  )
}
