import { Button, Card, TextField } from '@ayataka/tailwind-md3'
import {
  ClientActionFunctionArgs,
  Form,
  redirect,
  useActionData
} from '@remix-run/react'
import {
  StoreClientValidationError,
  storeClient
} from 'services/clients/storeClient'
import { NavigationTopAppBar } from '~/components/Navigation'
import { Logo } from '~/features/Navigations/Logo'

export const clientAction = async ({
  request,
  params
}: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const name = formData.get('name') as string
  try {
    const clientId = await storeClient({ name })
    return redirect(`/clients/${clientId}`)
  } catch (e: unknown) {
    if (e instanceof StoreClientValidationError) {
      return e
    }
    throw e
  }
}

export default function ClientCreatePage() {
  const e = useActionData<typeof clientAction>()
  return (
    <div>
      <div className="md:hidden sticky top-0 left-0 z-[11]">
        <NavigationTopAppBar className="bg-surface-container" logo={<Logo />} />
      </div>
      <div className="md:py-2">
        <Card bg="surface">
          <div className="mb-4 flex justify-between items-center">
            <p>新しい取引先</p>
          </div>
          <Form method="post">
            <div>
              <TextField
                id="name"
                name="name"
                label="企業名"
                error={e?.errors?.name}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" icon="DocumentCheck">
                保存する
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}
