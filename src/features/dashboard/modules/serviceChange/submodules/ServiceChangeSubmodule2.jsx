import SpielsCategoryBoard from '../../module1/components/SpielsCategoryBoard.jsx'
import { serviceChangeReturnToSenderCategories } from '../../../mockData.js'

function ServiceChangeSubmodule2() {
  return (
    <SpielsCategoryBoard
      title="Service Change - Return to Sender"
      description="Return to sender spiels. Click any line to copy."
      categories={serviceChangeReturnToSenderCategories}
      collapsible={false}
      showCodeBadge={false}
      emailRowIndex={0}
      emailLabel="Email"
      caseNoteRowIndex={1}
      caseNoteLabel="Case Notes"
    />
  )
}

export default ServiceChangeSubmodule2
