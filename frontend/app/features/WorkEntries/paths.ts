export const getWorkEntryListPath = (
  searchParams: URLSearchParams,
  pathname?: string
) => {
  if (typeof pathname === 'undefined') {
    return `/work-entries?${searchParams.toString()}`
  } else {
    return `${pathname}?${searchParams.toString()}`
  }
}

export const getWorkEntryDetailPath = (
  workEntryId: string,
  searchParams: URLSearchParams
) => {
  return `/work-entries/${workEntryId}?${searchParams.toString()}`
}

export const getWorkEntryCreatePath = (urlSearchParams: URLSearchParams) => {
  return `/work-entries/create?${urlSearchParams.toString()}`
}

export const getWorkEntryEditPath = (
  workEntryId: string,
  urlSearchParams: URLSearchParams
) => {
  return `/work-entries/${workEntryId}/edit?${urlSearchParams.toString()}`
}
