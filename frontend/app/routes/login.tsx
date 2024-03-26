import {
  ClientActionFunctionArgs,
  Form,
  redirect,
  useActionData
} from '@remix-run/react'
import { Button, TextField } from '@ayataka/tailwind-md3'
import { LoginValidationError, login } from 'services/auths/login'

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  try {
    await login({ email, password })
    return redirect('/dashboard')
  } catch (e: unknown) {
    if (e instanceof LoginValidationError) {
      return e
    } else {
      throw e
    }
  }
}

export default function LoginPage() {
  const e = useActionData<typeof clientAction>()
  return (
    <div className="max-w-96 p-4">
      <p>{e?.message}</p>
      <Form method="post">
        <TextField
          name="email"
          label="Email"
          type="email"
          error={e?.errors?.email}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          error={e?.errors?.password}
        />
        <Button variant="filled">ログイン</Button>
      </Form>
    </div>
  )
}
