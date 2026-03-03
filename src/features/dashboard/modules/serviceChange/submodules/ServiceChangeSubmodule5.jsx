import SpielsCategoryBoard from '../../module1/components/SpielsCategoryBoard.jsx'
import { serviceChangeVacationHoldCategories } from '../../../mockData.js'

function ServiceChangeSubmodule5() {
  return (
    <SpielsCategoryBoard
      title="Service Change - Vacation Hold"
      description="Vacation hold spiels. Click any line to copy."
      categories={serviceChangeVacationHoldCategories}
      collapsible={false}
      showCodeBadge={false}
      emailRowIndex={0}
      emailLabel="Email"
      caseNoteRowIndex={1}
      caseNoteLabel="Case Notes"
    />
  )
}

export default ServiceChangeSubmodule5
