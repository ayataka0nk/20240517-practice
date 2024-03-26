import { Button, Card, IconButton, TextField } from '@ayataka/tailwind-md3'
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Form,
  redirect,
  useActionData,
  useLoaderData
} from '@remix-run/react'
import { getClient } from 'services/clients/getClient'
import {
  UpdateClientValidationError,
  updateClient
} from 'services/clients/updateClient'

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const clientId = params.clientId as string
  const client = await getClient({ clientId: clientId })
  return { client }
}

export const clientAction = async ({
  request,
  params
}: ClientActionFunctionArgs) => {
  const clientId = params.clientId as string
  const formData = await request.formData()
  const name = formData.get('name') as string
  try {
    await updateClient({ name, clientId })
    return redirect(`/clients/${clientId}`)
  } catch (e: unknown) {
    if (e instanceof UpdateClientValidationError) {
      return e
    }
    throw e
  }
}

export default function ClientEditPage() {
  const { client } = useLoaderData<typeof clientLoader>()
  const e = useActionData<typeof clientAction>()
  const handleDeleteClick = () => {
    console.log('delete clicked')
  }
  return (
    <div>
      <Card bg="surface">
        <div className="mb-4 flex justify-between items-center">
          <p>{client.name}</p>
          <IconButton
            icon="Trash"
            variant="standard"
            color="tertiary"
            type="button"
            onClick={handleDeleteClick}
          >
            削除
          </IconButton>
        </div>
        <Form method="post">
          <div>
            <TextField
              id="name"
              name="name"
              label="企業名"
              defaultValue={client.name}
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
  )
}
