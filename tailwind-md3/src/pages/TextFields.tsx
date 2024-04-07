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
        <h2>Filled Single Line With Icon</h2>
        <TextField label="label" icon="MagnifyingGlass" />
      </div>
      <div>
        <h2>Filled Single Line ReadOnly</h2>
        <TextField label="label" icon="MagnifyingGlass" readOnly />
      </div>
      <div>
        <h2>Filled Single Line Error</h2>
        <TextField label="label" icon="MagnifyingGlass" error="error" />
      </div>
      <div>
        <h2>Filled Single Line Error ReadOnly</h2>
        <TextField
          label="label"
          icon="MagnifyingGlass"
          error="error"
          readOnly
        />
      </div>
      <div>
        <h2>Filled Multi Line</h2>
        <TextArea label="label" />
      </div>
      <div>
        <h2>Filled Multi Line With Icon</h2>
        <TextArea label="label" icon="MagnifyingGlass" />
      </div>
      <div>
        <h2>Outlined Single Line</h2>
        <TextField variant="outlined" label="label" />
      </div>
      <div>
        <h2>Outlined TextField With Supporting Text And Icon</h2>
        <TextField
          variant="outlined"
          label="label"
          icon="MagnifyingGlass"
          supportingText="supportingText"
        />
      </div>
      <div>
        <h2>Error Outlined TextField With Supporting Text And Icon</h2>
        <TextField
          variant="outlined"
          label="label"
          icon="MagnifyingGlass"
          error="hoge"
        />
      </div>
      <div>
        <h2>Error Outlined TextField ReadOnly</h2>
        <TextField
          variant="outlined"
          label="label"
          icon="MagnifyingGlass"
          readOnly
        />
      </div>
      <div>
        <h2>Error Outlined TextField With Supporting Text And Icon</h2>
        <TextArea
          variant="outlined"
          label="label"
          icon="MagnifyingGlass"
          error="hoge"
        />
      </div>
    </div>
  )
}
