import SpielsCategoryBoard from '../../module1/components/SpielsCategoryBoard.jsx'
import { serviceChangeGeneralCategories } from '../../../mockData.js'

function ServiceChangeSubmodule0() {
  return (
    <SpielsCategoryBoard
      title="Service Change - General"
      description="General service change spiels. Click any line to copy."
      categories={serviceChangeGeneralCategories}
      collapsible={false}
      showCodeBadge={false}
      emailRowIndex={0}
      emailLabel="Email"
      caseNoteRowIndex={1}
      caseNoteLabel="Case Notes"
    />
  )
}

export default ServiceChangeSubmodule0
