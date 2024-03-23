import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { Form } from 'react-router-dom'
import { useLoginActionErrors } from './actions'

export default function LoginPage() {
  const errors = useLoginActionErrors()
  return (
    <div className="max-w-96 p-4">
      <p>{errors?.global}</p>
      <Form method="post">
        <TextField
          name="username"
          label="Email"
          type="email"
          error={errors?.email}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          error={errors?.password}
        />
        <Button type="submit" variant="filled">
          ログイン
        </Button>
      </Form>
    </div>
  )
}
