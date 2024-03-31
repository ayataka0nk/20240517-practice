import { SearchField } from '../../lib/components/SearchV2/SearchField'

export const SearchBarPage = () => {
  return (
    <div>
      <div>
        <SearchField
          searchedValue=""
          isViewOpen={false}
          docked="md"
          placeholder="search bar"
          onMenuClick={() => {}}
          onBackClick={() => {}}
          onClearClick={() => {}}
        />
      </div>
      <div className="mt-8">
        <SearchField
          searchedValue="hoge"
          isViewOpen={false}
          docked="md"
          placeholder="search bar"
          onMenuClick={() => {}}
          onBackClick={() => {}}
          onClearClick={() => {}}
        />
      </div>
    </div>
  )
}
