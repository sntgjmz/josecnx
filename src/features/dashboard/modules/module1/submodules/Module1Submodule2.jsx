import SpielsCategoryBoard from '../components/SpielsCategoryBoard.jsx'
import { closingCategories } from '../../../mockData.js'

function Module1Submodule2() {
  return (
    <SpielsCategoryBoard
      title="Closing Spiels"
      description="All closing categories are visible. Click any line to copy your closing spiel."
      categories={closingCategories}
      collapsible={false}
      previewLineClamp={1}
      showAppendAction={false}
    />
  )
}

export default Module1Submodule2
