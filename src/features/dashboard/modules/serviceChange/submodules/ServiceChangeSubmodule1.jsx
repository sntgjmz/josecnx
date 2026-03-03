import SpielsCategoryBoard from '../../module1/components/SpielsCategoryBoard.jsx'
import { serviceChangeAddressCorrectionCategories } from '../../../mockData.js'

function ServiceChangeSubmodule1() {
  return (
    <SpielsCategoryBoard
      title="Service Change - Address Correction"
      description="Address correction spiels. Click any line to copy."
      categories={serviceChangeAddressCorrectionCategories}
      collapsible={false}
      storageKeyOverride="pcc_spiels_service_change_address_correction_v2"
      showCodeBadge={false}
      emailRowIndex={0}
      emailLabel="Email"
      caseNoteRowIndex={1}
      caseNoteLabel="Case Notes"
    />
  )
}

export default ServiceChangeSubmodule1
