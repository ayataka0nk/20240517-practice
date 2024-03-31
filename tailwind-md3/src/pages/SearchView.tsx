import { SearchField } from '../../lib/components/SearchV2/SearchField'

export const SearchViewPage = () => {
  return (
    <div>
      <div className="mt-8">
        <SearchField
          searchedValue=""
          isViewOpen={true}
          docked="md"
          placeholder="search bar"
          onMenuClick={() => {}}
          onBackClick={() => {}}
          onClearClick={() => {}}
        >
          View Value
        </SearchField>
      </div>
    </div>
  )
}
