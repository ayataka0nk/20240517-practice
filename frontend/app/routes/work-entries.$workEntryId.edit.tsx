import {
  Button,
  Card,
  DateFieldModal,
  TextArea,
  TimeField
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
  getWorkEntry,
  updateWorkEntry
} from 'services/workEntries'
import { getWorkEntryDetailPath } from '~/features/WorkEntries/paths'
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

export const clientAction = async ({
  request,
  params
}: ClientActionFunctionArgs) => {
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

export default function WorkEntryEditPage() {
  const { workEntry, timeZone } = useLoaderData<typeof clientLoader>()
  const e = useActionData<typeof clientAction>()
  return (
    <div>
      <Card bg="surface">
        <Form method="post">
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
