import { useState } from 'react'
import { DateFieldModal } from '../../lib/components/DatePicker/DateFieldModal'
import { Button } from '../../lib/main'

export const DatePickers = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    setValue(e.target.value)
  }
  return (
    <div>
      <h1>date pickers</h1>
      <div>
        <h2>date field</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const value = form.get('sample')
            console.log(value)
          }}
        >
          <DateFieldModal label="uncontrolled" name="sample" />
          <Button type="submit">submit</Button>
        </form>
      </div>
      <div>
        <h2>date field</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const value = form.get('sample')
            console.log(value)
          }}
        >
          <DateFieldModal
            value={value}
            onChange={handleChange}
            label="controlled"
            name="sample"
          />
          <Button type="submit">submit</Button>
        </form>
      </div>
      <div>
        <h2>default value</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const value = form.get('sample')
            console.log(value)
          }}
        >
          <DateFieldModal
            label="uncontrolled"
            name="sample"
            defaultValue="2025-01-01"
          />
          <Button type="submit">submit</Button>
        </form>
      </div>
    </div>
  )
}
