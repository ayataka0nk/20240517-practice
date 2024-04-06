import { TextArea } from '../../lib/components/TextArea'
import { TextField } from '../../lib/main'

export const TextFields = () => {
  return (
    <div>
      <h1>TextFields</h1>
      <div>
        <h2>Filled Single Line</h2>
        <TextField label="label" />
      </div>
      <div>
        <h2>Filled Multi Line</h2>
        <TextArea label="label" />
      </div>
    </div>
  )
}
