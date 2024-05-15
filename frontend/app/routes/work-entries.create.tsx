import {
  Button,
  Card,
  DateFieldModal,
  TextArea,
  TimeField
} from '@ayataka/tailwind-md3'
import {
  ClientActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useLoaderData
} from '@remix-run/react'
import {
  StoreWorkEntryValidationError,
  storeWorkEntry
} from 'services/workEntries'
import { NavigationTopAppBar } from '~/components/Navigation'
import { Logo } from '~/features/Navigations/Logo'
import { getWorkEntryDetailPath } from '~/features/WorkEntries/paths'
import {
  getTimeZone,
  getTimeZonedTodayDateString,
  parseDateAndTime
} from '~/utils'

export const clientAction = async ({
  request,
  params
}: ClientActionFunctionArgs) => {
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
    throw new Error('start is undefined')
  }
  try {
    const workEntryId = await storeWorkEntry({
      description,
      startTime: start,
      endTime: end,
      projectId: 'df6a4913-aeee-4391-af94-990b82cf0511'
    })
    return redirect(
      getWorkEntryDetailPath(workEntryId, new URL(request.url).searchParams)
    )
  } catch (e: unknown) {
    if (e instanceof StoreWorkEntryValidationError) {
      return e
    }
    throw e
  }
}

export const clientLoader = async () => {
  const timeZone = await getTimeZone()
  return { timeZone }
}

export default function WorkEntryCreatePage() {
  const e = useActionData<typeof clientAction>()
  const data = useLoaderData<typeof clientLoader>()
  const today = getTimeZonedTodayDateString(data.timeZone)
  return (
    <div>
      <div className="md:hidden sticky top-0 left-0 z-[11]">
        <NavigationTopAppBar className="bg-surface-container" logo={<Logo />} />
      </div>
      <div className="md:py-2">
        <Card bg="surface">
          <div className="mb-4 flex justify-between items-center">
            <p>新しい稼働記録</p>
          </div>
          <Form method="post">
            {/* <div>
              <TextField
                id="name"
                name="name"
                label="プロジェクト名"
                error={e?.errors?.name}
              />
            </div> */}
            <div>
              <DateFieldModal
                id="start_date"
                name="start_date"
                label="稼働開始日"
                defaultValue={today}
              />
            </div>
            <div>
              <TimeField
                id="start_time"
                name="start_time"
                label="稼働開始時刻"
              />
            </div>
            <div>
              <DateFieldModal
                id="end_date"
                name="end_date"
                label="稼働終了日"
                defaultValue={today}
              />
            </div>
            <div>
              <TimeField id="end_time" name="end_time" label="稼働終了時刻" />
            </div>

            <div>
              <TextArea
                variant="outlined"
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
