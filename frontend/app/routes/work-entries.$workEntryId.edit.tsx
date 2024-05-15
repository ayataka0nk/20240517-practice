import {
  Button,
  Card,
  DateFieldModal,
  IconButton,
  TextArea,
  TimeField,
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
  UpdateWorkEntryValidationError,
  deleteWorkEntry,
  getWorkEntry,
  updateWorkEntry
} from 'services/workEntries'
import {
  getWorkEntryDetailPath,
  getWorkEntryListPath
} from '~/features/WorkEntries/paths'
import {
  formatToHourMinute,
  formatToYearMonthDate,
  getTimeZone,
  parseDateAndTime
} from '~/utils'

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const workEntryId = params.workEntryId as string
  const workEntry = await getWorkEntry({ workEntryId: workEntryId })
  const timeZone = await getTimeZone()
  return { workEntry, timeZone }
}

const updateAction = async ({ request, params }: ClientActionFunctionArgs) => {
  const workEntryId = params.workEntryId as string
  const timeZone = await getTimeZone()
  const formData = await request.formData()
  const description = formData.get('description') as string
  const startDate = formData.get('start_date') as string
  const startTime = formData.get('start_time') as string
  const endDate = formData.get('end_date') as string
  const endTime = formData.get('end_time') as string
  const start = parseDateAndTime(startDate, startTime, timeZone)
  const end = parseDateAndTime(endDate, endTime, timeZone)
  if (typeof start === 'undefined') {
    console.log(startDate)
    console.log(startTime)
    throw new Error('start is undefined')
  }
  try {
    await updateWorkEntry({
      workEntryId,
      description,
      startTime: start,
      endTime: end,
      projectId: 'df6a4913-aeee-4391-af94-990b82cf0511'
    })
    return redirect(
      getWorkEntryDetailPath(workEntryId, new URL(request.url).searchParams)
    )
  } catch (e: unknown) {
    if (e instanceof UpdateWorkEntryValidationError) {
      return e
    }
    throw e
  }
}

const deleteAction = async ({ request, params }: ClientActionFunctionArgs) => {
  const workEntryId = params.workEntryId as string
  await deleteWorkEntry({ workEntryId })
  return redirect(getWorkEntryListPath(new URL(request.url).searchParams))
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

export default function WorkEntryEditPage() {
  const { workEntry, timeZone } = useLoaderData<typeof clientLoader>()
  const e = useActionData<typeof clientAction>()
  const { DialogComponent, showModal, closeModal } = useDialog()

  return (
    <div>
      <Card bg="surface">
        <div className="mb-4 flex justify-between items-center">
          <p></p>
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
            <DateFieldModal
              id="start_date"
              name="start_date"
              label="稼働開始日"
              defaultValue={formatToYearMonthDate(
                workEntry.startTime,
                timeZone
              )}
            />
          </div>
          <div>
            <TimeField
              id="start_time"
              name="start_time"
              label="稼働開始時刻"
              defaultValue={formatToHourMinute(workEntry.startTime, timeZone)}
            />
          </div>
          <div>
            <DateFieldModal
              id="end_date"
              name="end_date"
              label="稼働終了日"
              defaultValue={formatToYearMonthDate(workEntry.endTime, timeZone)}
            />
          </div>
          <div>
            <TimeField
              id="end_time"
              name="end_time"
              label="稼働終了時刻"
              defaultValue={formatToHourMinute(workEntry.endTime, timeZone)}
            />
          </div>
          <div>
            <TextArea
              variant="outlined"
              id="description"
              name="description"
              label="概要"
              defaultValue={workEntry.description}
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
