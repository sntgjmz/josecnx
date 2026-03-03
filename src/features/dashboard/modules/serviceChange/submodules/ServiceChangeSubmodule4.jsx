import SpielsCategoryBoard from '../../module1/components/SpielsCategoryBoard.jsx'
import { serviceChangeReAttemptCategories } from '../../../mockData.js'

function ServiceChangeSubmodule4() {
  return (
    <SpielsCategoryBoard
      title="Service Change - Re-attempt"
      description="Re-attempt spiels. Click any line to copy."
      categories={serviceChangeReAttemptCategories}
      collapsible={false}
      showCodeBadge={false}
      emailRowIndex={0}
      emailLabel="Email"
      caseNoteRowIndex={1}
      caseNoteLabel="Case Notes"
    />
  )
}

export default ServiceChangeSubmodule4
