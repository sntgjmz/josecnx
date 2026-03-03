import SpielsCategoryBoard from '../../module1/components/SpielsCategoryBoard.jsx'
import { serviceChangeHoldAtLocationCategories } from '../../../mockData.js'

function ServiceChangeSubmodule3() {
  return (
    <SpielsCategoryBoard
      title="Service Change - Hold at Location"
      description="Hold at location spiels. Click any line to copy."
      categories={serviceChangeHoldAtLocationCategories}
      collapsible={false}
      showCodeBadge={false}
      emailRowIndex={0}
      emailLabel="Email"
      caseNoteRowIndex={1}
      caseNoteLabel="Case Notes"
    />
  )
}

export default ServiceChangeSubmodule3
