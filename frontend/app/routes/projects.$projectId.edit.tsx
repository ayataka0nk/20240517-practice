import {
  Button,
  Card,
  IconButton,
  TextArea,
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

import {
  UpdateProjectValidationError,
  deleteProject,
  getProject,
  updateProject
} from 'services/projects'

import {
  getProjectDetailPath,
  getProjectListPath
} from '~/features/Projects/paths'

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const projectId = params.projectId as string
  const project = await getProject({ projectId: projectId })
  return { project }
}

const updateAction = async ({ request, params }: ClientActionFunctionArgs) => {
  const projectId = params.projectId as string
  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string

  try {
    await updateProject({ projectId, name, description })
    return redirect(
      getProjectDetailPath(projectId, new URL(request.url).searchParams)
    )
  } catch (e: unknown) {
    if (e instanceof UpdateProjectValidationError) {
      return e
    }
    throw e
  }
}

const deleteAction = async ({ request, params }: ClientActionFunctionArgs) => {
  const projectId = params.projectId as string
  await deleteProject({ projectId })
  return redirect(getProjectListPath(new URL(request.url).searchParams))
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

export default function ProjectEditPage() {
  const { project } = useLoaderData<typeof clientLoader>()
  const e = useActionData<typeof clientAction>()
  const { DialogComponent, showModal, closeModal } = useDialog()
  return (
    <div>
      <Card bg="surface">
        <div className="mb-4 flex justify-between items-center">
          <p>{project.name}</p>
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
              label="プロジェクト名"
              defaultValue={project.name}
              error={e?.errors?.name}
            />
          </div>
          <div>
            <TextArea
              id="description"
              name="description"
              label="概要"
              defaultValue={project.description}
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
  )
}
