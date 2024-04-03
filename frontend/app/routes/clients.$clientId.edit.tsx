import { Button, Card, IconButton, TextField } from '@ayataka/tailwind-md3'
import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  Form,
  redirect,
  useActionData,
  useLoaderData
} from '@remix-run/react'
import { deleteClient } from 'services/clients/deleteClient'
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

const updateAction = async ({ request, params }: ClientActionFunctionArgs) => {
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

const deleteAction = async ({ request, params }: ClientActionFunctionArgs) => {
  const clientId = params.clientId as string
  await deleteClient({ clientId })
  return redirect(`/clients`)
}

export const clientAction = async (args: ClientActionFunctionArgs) => {
  const formData = await args.request.clone().formData()
  const _action = formData.get('_action') as string
  if (_action === 'UPDATE') {
    return updateAction(args)
  } else if (_action === 'DELETE') {
    return deleteAction(args)
  } else {
    throw new Error('Invalid action')
  }
}

export default function ClientEditPage() {
  const { client } = useLoaderData<typeof clientLoader>()
  const e = useActionData<typeof clientAction>()
  return (
    <div>
      <Card bg="surface">
        <div className="mb-4 flex justify-between items-center">
          <p>{client.name}</p>
          <Form method="post">
            <input type="hidden" name="_action" value="DELETE" />
            <IconButton
              icon="Trash"
              variant="standard"
              color="tertiary"
              type="submit"
            >
              削除
            </IconButton>
          </Form>
        </div>
        <Form method="post">
          <input type="hidden" name="_action" value="UPDATE" />
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
