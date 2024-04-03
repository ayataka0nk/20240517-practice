import {
  Button,
  Card,
  IconButton,
  TextField,
  useDialog
} from '@ayataka/tailwind-md3'
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
  const { DialogComponent, showModal, closeModal } = useDialog()
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
            onClick={showModal}
          >
            削除
          </IconButton>
          <DialogComponent
            headline="削除しますか？"
            supportingText="この操作は取り消せません。"
            leftButton={
              <Button variant="text" type="button" onClick={closeModal}>
                いいえ
              </Button>
            }
            rightButton={
              <Form method="post">
                <Button variant="text" type="submit">
                  はい
                </Button>
                <input type="hidden" name="_action" value="DELETE" />
              </Form>
            }
          />
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
