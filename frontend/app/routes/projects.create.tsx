import { Button, Card, TextArea, TextField } from '@ayataka/tailwind-md3'
import { ClientActionFunctionArgs, Form, useActionData } from '@remix-run/react'
import { StoreProjectValidationError, storeProject } from 'services/projects'
import { NavigationTopAppBar } from '~/components/Navigation'
import { Logo } from '~/features/Navigations/Logo'
import { redirectProjectDetail } from '~/features/Projects/paths'

export const clientAction = async ({
  request,
  params
}: ClientActionFunctionArgs) => {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  try {
    const clientId = await storeProject({ name, description })
    return redirectProjectDetail(clientId, request)
  } catch (e: unknown) {
    if (e instanceof StoreProjectValidationError) {
      return e
    }
    throw e
  }
}

export default function ProjectCreatePage() {
  const e = useActionData<typeof clientAction>()
  return (
    <div>
      <div className="md:hidden sticky top-0 left-0 z-[11]">
        <NavigationTopAppBar className="bg-surface-container" logo={<Logo />} />
      </div>
      <div className="md:py-2">
        <Card bg="surface">
          <div className="mb-4 flex justify-between items-center">
            <p>新しいプロジェクト</p>
          </div>
          <Form method="post">
            <div>
              <TextField
                id="name"
                name="name"
                label="プロジェクト名"
                error={e?.errors?.name}
              />
            </div>
            <div>
              <TextArea
                id="description"
                name="description"
                label="概要"
                error={e?.errors?.description}
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
