import Module1Submodule1 from './modules/module1/submodules/Module1Submodule1.jsx'
import Module1Submodule2 from './modules/module1/submodules/Module1Submodule2.jsx'
import ServiceChangeSubmodule0 from './modules/serviceChange/submodules/ServiceChangeSubmodule0.jsx'
import ServiceChangeSubmodule1 from './modules/serviceChange/submodules/ServiceChangeSubmodule1.jsx'
import ServiceChangeSubmodule2 from './modules/serviceChange/submodules/ServiceChangeSubmodule2.jsx'
import ServiceChangeSubmodule3 from './modules/serviceChange/submodules/ServiceChangeSubmodule3.jsx'
import ServiceChangeSubmodule4 from './modules/serviceChange/submodules/ServiceChangeSubmodule4.jsx'
import ServiceChangeSubmodule5 from './modules/serviceChange/submodules/ServiceChangeSubmodule5.jsx'

export const moduleRegistry = [
  {
    id: 'module-1',
    label: 'Opening and Closing',
    description: 'Email opening and closing spiels',
    submodules: [
      { id: 'module-1-opening', label: 'Opening', Component: Module1Submodule1 },
      { id: 'module-1-closing', label: 'Closing', Component: Module1Submodule2 },
    ],
  },
  {
    id: 'module-2',
    label: 'Service Change',
    description: 'Service-change related email spiels',
    submodules: [
      { id: 'module-2-general', label: 'General', Component: ServiceChangeSubmodule0 },
      { id: 'module-2-return-to-sender', label: 'Return to Sender', Component: ServiceChangeSubmodule2 },
      { id: 'module-2-address-correction', label: 'Address Correction', Component: ServiceChangeSubmodule1 },
      { id: 'module-2-hold-at-location', label: 'Hold at Location', Component: ServiceChangeSubmodule3 },
      { id: 'module-2-re-attempt', label: 'Re-attempt', Component: ServiceChangeSubmodule4 },
      { id: 'module-2-vacation-hold', label: 'Vacation Hold', Component: ServiceChangeSubmodule5 },
    ],
  },
]
