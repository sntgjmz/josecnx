import SpielsCategoryBoard from '../components/SpielsCategoryBoard.jsx'
import { openingCategories } from '../../../mockData.js'

function Module1Submodule1() {
  return (
    <SpielsCategoryBoard
      title="Opening Spiels"
      description="All opening categories are visible. Click any line to copy your opening spiel."
      categories={openingCategories}
      collapsible={false}
    />
  )
}

export default Module1Submodule1
