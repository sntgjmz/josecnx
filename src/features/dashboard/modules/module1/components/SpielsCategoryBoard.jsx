import { useEffect, useMemo, useRef, useState } from 'react'
import {
  closingCategories,
  openingCategories,
  serviceChangeAddressCorrectionCategories,
  serviceChangeHoldAtLocationCategories,
  serviceChangeReAttemptCategories,
  serviceChangeReturnToSenderCategories,
  serviceChangeVacationHoldCategories,
} from '../../../mockData.js'

function makeStorageKey(title) {
  return `pcc_spiels_${title.toLowerCase().replace(/\s+/g, '_')}`
}

const COMPOSER_STORAGE_KEY = 'pcc_global_composer_v1'

function normalizeCategories(categories) {
  return categories.map((category) => ({
    ...category,
    rows: category.lines.map((line, index) => ({
      id: `${category.id}-${index}`,
      code: `${category.code}-${String(index + 1).padStart(2, '0')}`,
      text: line,
    })),
  }))
}

function hydrateCategories(categories, savedCategories) {
  const defaults = normalizeCategories(categories)
  if (!Array.isArray(savedCategories) || savedCategories.length === 0) {
    return defaults
  }

  const savedById = new Map(savedCategories.map((category) => [category.id, category]))
  return defaults.map((defaultCategory) => {
    const savedCategory = savedById.get(defaultCategory.id)
    if (!savedCategory) {
      return defaultCategory
    }

    const savedRowsRaw = Array.isArray(savedCategory.rows)
      ? savedCategory.rows
      : Array.isArray(savedCategory.lines)
        ? savedCategory.lines
        : []

    const maxRows = defaultCategory.rows.length
    const rows = savedRowsRaw.slice(0, maxRows).map((row, index) => {
      if (typeof row === 'string') {
        return {
          id: `${defaultCategory.id}-${index}`,
          code: `${defaultCategory.code}-${String(index + 1).padStart(2, '0')}`,
          text: row,
        }
      }
      return {
        id: row.id || `${defaultCategory.id}-${index}`,
        code: row.code || `${defaultCategory.code}-${String(index + 1).padStart(2, '0')}`,
        text: row.text || '',
      }
    })

    const completedRows =
      rows.length < maxRows
        ? [...rows, ...defaultCategory.rows.slice(rows.length)]
        : rows

    return {
      ...defaultCategory,
      ...savedCategory,
      rows: completedRows,
    }
  })
}

async function copyText(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const input = document.createElement('textarea')
  input.value = text
  input.style.position = 'fixed'
  input.style.opacity = '0'
  document.body.appendChild(input)
  input.focus()
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

function CategoryIcon({ label }) {
  const key = label.toLowerCase()

  if (key.includes('inconvenience')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86l-8.3 14.37A2 2 0 003.72 21h16.56a2 2 0 001.73-2.77L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    )
  }

  if (key.includes('delay')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v6l4 2" />
      </svg>
    )
  }

  if (key.includes('unable')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8" />
      </svg>
    )
  }

  if (key.includes('confusion')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2.2-2.5 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
      </svg>
    )
  }

  if (key.includes('thank')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7" />
        <rect x="3" y="3" width="18" height="18" rx="3" />
      </svg>
    )
  }

  if (key.includes('patience')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
      </svg>
    )
  }

  if (key.includes('hear')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12a7 7 0 1014 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l4-4" />
      </svg>
    )
  }

  if (key.includes('survey')) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8" />
    </svg>
  )
}

function getCategoryTone(label) {
  const key = label.toLowerCase()

  if (key.includes('inconvenience') || key.includes('unable')) {
    return 'border-red-400/35 bg-red-500/10 text-red-300'
  }

  if (key.includes('delay') || key.includes('confusion')) {
    return 'border-orange-400/35 bg-orange-500/10 text-orange-300'
  }

  if (key.includes('thank') || key.includes('patience') || key.includes('hear') || key.includes('survey')) {
    return 'border-emerald-400/35 bg-emerald-500/10 text-emerald-300'
  }

  return 'border-[#b990f5]/30 bg-[#1f2142] text-[#d9c2f7]'
}

function getRowPreviewText(text, maxLength = 180) {
  const compact = text.replace(/\s+/g, ' ').trim()
  if (compact.length <= maxLength) {
    return compact
  }
  return `${compact.slice(0, maxLength - 1)}...`
}

function formatCaseIdInput(rawValue) {
  if (!rawValue) {
    return ''
  }
  const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 9)
  return `C-${digitsOnly}`
}

function SpielsCategoryBoard({
  title,
  description,
  categories,
  collapsible = true,
  storageKeyOverride = '',
  caseNoteRowIndex = null,
  caseNoteLabel = 'Case Note',
  emailRowIndex = null,
  emailLabel = 'Email',
  showCodeBadge = true,
  previewLineClamp = 2,
  showAppendAction = true,
}) {
  const storageKey = storageKeyOverride || makeStorageKey(title)
  const [query, setQuery] = useState('')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const [copyStatus, setCopyStatus] = useState('Click any line to copy.')
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [copiedRowId, setCopiedRowId] = useState('')
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [isComposerMinimized, setIsComposerMinimized] = useState(false)
  const [quickAddTab, setQuickAddTab] = useState('service-change')
  const [quickAddSearch, setQuickAddSearch] = useState('')
  const [quickAddCompact, setQuickAddCompact] = useState(false)
  const [quickAddPage, setQuickAddPage] = useState(0)
  const [autoCopyOnAdd, setAutoCopyOnAdd] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_auto_copy_on_add`)
      return saved === '1'
    } catch {
      return false
    }
  })
  const [favoriteRowIds, setFavoriteRowIds] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storageKey}_favorite_rows`)
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [previewRow, setPreviewRow] = useState(null)
  const previewTextRef = useRef(null)
  const lastAutoCopyToastAtRef = useRef(0)
  const lastDeletionWarnAtRef = useRef(0)
  const [composerLines, setComposerLines] = useState(() => {
    try {
      const saved = localStorage.getItem(COMPOSER_STORAGE_KEY)
      if (!saved) {
        return []
      }
      const parsed = JSON.parse(saved)
      return Array.isArray(parsed?.lines) ? parsed.lines : []
    } catch {
      return []
    }
  })
  const [addedSpiels, setAddedSpiels] = useState([])
  const [isAddedSpielsMenuOpen, setIsAddedSpielsMenuOpen] = useState(false)
  const [isGrammarDetailsOpen, setIsGrammarDetailsOpen] = useState(false)
  const [composerDeletionWarning, setComposerDeletionWarning] = useState('')
  const [composerEditDelta, setComposerEditDelta] = useState({ added: [], removed: [] })
  const [variableValues, setVariableValues] = useState(() => {
    try {
      const saved = localStorage.getItem(COMPOSER_STORAGE_KEY)
      if (!saved) {
        return { case_id: '', tracking_number: '', locaddress: '', date: '', callback: '' }
      }
      const parsed = JSON.parse(saved)
      const savedVars = parsed?.variables || {}
      return {
        case_id:
          typeof savedVars.case_id === 'string'
            ? savedVars.case_id
            : typeof savedVars.customer_name === 'string'
              ? savedVars.customer_name
              : '',
        tracking_number: typeof savedVars.tracking_number === 'string' ? savedVars.tracking_number : '',
        locaddress: typeof savedVars.locaddress === 'string' ? savedVars.locaddress : '',
        date: typeof savedVars.date === 'string' ? savedVars.date : '',
        callback: typeof savedVars.callback === 'string' ? savedVars.callback : '',
      }
    } catch {
      return { case_id: '', tracking_number: '', locaddress: '', date: '', callback: '' }
    }
  })
  const [categoryRows, setCategoryRows] = useState(() => {
    const normalized = normalizeCategories(categories)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        return hydrateCategories(categories, JSON.parse(saved))
      }
    } catch {
      // ignore local storage parse issues
    }
    return normalized
  })
  const [openMap, setOpenMap] = useState(() =>
    normalizeCategories(categories).reduce((acc, category, index) => ({ ...acc, [category.id]: index === 0 }), {}),
  )
  const serviceChangeQuickCategories = useMemo(
    () => [
      ...serviceChangeAddressCorrectionCategories.map((category) => ({
        ...category,
        source: 'service-change',
        group: 'Address Correction',
      })),
      ...serviceChangeReturnToSenderCategories.map((category) => ({
        ...category,
        source: 'service-change',
        group: 'Return to Sender',
      })),
      ...serviceChangeHoldAtLocationCategories.map((category) => ({
        ...category,
        source: 'service-change',
        group: 'Hold at Location',
      })),
      ...serviceChangeReAttemptCategories.map((category) => ({
        ...category,
        source: 'service-change',
        group: 'Reattempt',
      })),
      ...serviceChangeVacationHoldCategories.map((category) => ({
        ...category,
        source: 'service-change',
        group: 'Vacation Hold',
      })),
    ],
    [],
  )
  const quickAddCategoryMap = useMemo(
    () => ({
      opening: openingCategories,
      closing: closingCategories,
      'service-change': serviceChangeQuickCategories,
    }),
    [serviceChangeQuickCategories],
  )
  const quickAddAllCategories = useMemo(
    () => [
      ...openingCategories.map((category) => ({ ...category, source: 'opening' })),
      ...closingCategories.map((category) => ({ ...category, source: 'closing' })),
      ...serviceChangeQuickCategories,
    ],
    [serviceChangeQuickCategories],
  )
  const selectedQuickAddCategories = quickAddCategoryMap[quickAddTab] || []
  const filteredQuickAddCategories = useMemo(() => {
    const term = quickAddSearch.trim().toLowerCase()
    if (!term) {
      return selectedQuickAddCategories.map((category) => ({ ...category, source: category.source || quickAddTab }))
    }

    return quickAddAllCategories.filter((category) => {
      const inLabel = category.label.toLowerCase().includes(term)
      const inLines = Array.isArray(category.lines)
        ? category.lines.some((line) => String(line).toLowerCase().includes(term))
        : false
      return inLabel || inLines
    })
  }, [quickAddAllCategories, quickAddSearch, quickAddTab, selectedQuickAddCategories])
  const quickAddPageSize = quickAddCompact ? 5 : 3
  const quickAddTotalPages = Math.max(1, Math.ceil(filteredQuickAddCategories.length / quickAddPageSize))
  const safeQuickAddPage = Math.min(quickAddPage, quickAddTotalPages - 1)
  const quickAddPageItems = filteredQuickAddCategories.slice(
    safeQuickAddPage * quickAddPageSize,
    safeQuickAddPage * quickAddPageSize + quickAddPageSize,
  )

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(categoryRows))
    } catch {
      // ignore local storage save issues
    }
  }, [categoryRows, storageKey])

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_auto_copy_on_add`, autoCopyOnAdd ? '1' : '0')
    } catch {
      // ignore local storage save issues
    }
  }, [autoCopyOnAdd, storageKey])

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_favorite_rows`, JSON.stringify(favoriteRowIds))
    } catch {
      // ignore local storage save issues
    }
  }, [favoriteRowIds, storageKey])

  useEffect(() => {
    try {
      localStorage.setItem(
        COMPOSER_STORAGE_KEY,
        JSON.stringify({
          lines: composerLines,
          variables: variableValues,
        }),
      )
    } catch {
      // ignore local storage save issues
    }
  }, [composerLines, variableValues])

  useEffect(() => {
    if (!toast.message) {
      return undefined
    }
    const timer = setTimeout(() => setToast({ message: '', type: 'success' }), 1800)
    return () => clearTimeout(timer)
  }, [toast.message])

  useEffect(() => {
    if (!copiedRowId) {
      return undefined
    }
    const timer = setTimeout(() => setCopiedRowId(''), 1200)
    return () => clearTimeout(timer)
  }, [copiedRowId])

  useEffect(() => {
    if (!isComposerOpen) {
      return undefined
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsComposerOpen(false)
      }
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'c') {
        event.preventDefault()
        handleCopyComposed()
      }
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'r') {
        event.preventDefault()
        setComposerLines([])
        setVariableValues({ case_id: '', tracking_number: '', locaddress: '', date: '', callback: '' })
        setAddedSpiels([])
        setIsAddedSpielsMenuOpen(false)
        setComposerDeletionWarning('')
        setComposerEditDelta({ added: [], removed: [] })
        setCopyStatus('Composer reset.')
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isComposerOpen])

  useEffect(() => {
    if (!previewRow) {
      return undefined
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setPreviewRow(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [previewRow])

  useEffect(() => {
    if (!previewRow || !previewTextRef.current) {
      return
    }
    previewTextRef.current.focus()
    previewTextRef.current.setSelectionRange(0, 0)
  }, [previewRow])

  useEffect(() => {
    const handleOpenComposer = () => {
      setIsComposerOpen(true)
      setIsComposerMinimized(false)
      setQuickAddTab('service-change')
      setQuickAddSearch('')
      setQuickAddPage(0)
    }
    window.addEventListener('pcc-open-composer', handleOpenComposer)
    return () => window.removeEventListener('pcc-open-composer', handleOpenComposer)
  }, [])

  useEffect(() => {
    if (quickAddPage > quickAddTotalPages - 1) {
      setQuickAddPage(Math.max(0, quickAddTotalPages - 1))
    }
  }, [quickAddPage, quickAddTotalPages])

  useEffect(() => {
    setQuickAddPage(0)
  }, [quickAddSearch, quickAddTab])

  useEffect(() => {
    const handleClearComposer = () => {
      setComposerLines([])
      setAddedSpiels([])
      setIsAddedSpielsMenuOpen(false)
      setComposerDeletionWarning('')
      setComposerEditDelta({ added: [], removed: [] })
    }
    window.addEventListener('pcc-clear-composer', handleClearComposer)
    return () => window.removeEventListener('pcc-clear-composer', handleClearComposer)
  }, [])

  useEffect(() => {
    if (!isComposerOpen || addedSpiels.length === 0) {
      setIsAddedSpielsMenuOpen(false)
    }
  }, [addedSpiels.length, isComposerOpen])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('pcc-composer-count', { detail: { count: composerLines.length } }))
  }, [composerLines.length])

  function renderVariables(text) {
    let rendered = text

    rendered = rendered.replace(/\{([a-z0-9_]+)\}/gi, (_, token) => {
      const key = token.toLowerCase()
      const value = variableValues[key]
      return value && value.trim() ? value.trim() : `{${token}}`
    })

    if (variableValues.case_id && variableValues.case_id.trim()) {
      rendered = rendered.replace(/\{customer_name\}/gi, variableValues.case_id.trim())
    }

    Object.entries(variableValues).forEach(([key, value]) => {
      if (!value || !value.trim()) {
        return
      }
      const plainTokenPattern = new RegExp(`\\b${key}\\b`, 'gi')
      rendered = rendered.replace(plainTokenPattern, value.trim())
    })

    if (variableValues.case_id && variableValues.case_id.trim()) {
      rendered = rendered.replace(/\bcustomer_name\b/gi, variableValues.case_id.trim())
    }

    // Backward-compatible shorthand: replace XXXXX with tracking number if provided.
    if (variableValues.tracking_number && variableValues.tracking_number.trim()) {
      rendered = rendered.replace(/\bXXXXX\b/g, variableValues.tracking_number.trim())
    }

    // Backward-compatible shorthand: replace CCCCC with case id if provided.
    if (variableValues.case_id && variableValues.case_id.trim()) {
      rendered = rendered.replace(/\bCCCCC\b/g, variableValues.case_id.trim())
    }

    if (variableValues.locaddress && variableValues.locaddress.trim()) {
      rendered = rendered.replace(/\bLOCADDRESS\b/g, variableValues.locaddress.trim())
    }

    if (variableValues.date && variableValues.date.trim()) {
      rendered = rendered.replace(/\bDATE\b/g, variableValues.date.trim())
    }
    if (variableValues.callback && variableValues.callback.trim()) {
      rendered = rendered.replace(/\bCALLBACK\b/g, variableValues.callback.trim())
    }

    return rendered
  }

  useEffect(() => {
    const rawText = composerLines.join('\n\n')
    window.dispatchEvent(
      new CustomEvent('pcc-composer-preview', {
        detail: {
          lines: composerLines,
          renderedText: renderVariables(rawText),
        },
      }),
    )
  }, [composerLines, variableValues])

  const getComposerText = () => composerLines.join('\n\n')
  const composerTemplateText = getComposerText()
  const getRenderedComposerText = () => renderVariables(composerTemplateText)
  const renderedComposerText = getRenderedComposerText()
  const doubleSpaceMatches = renderedComposerText.match(/ {2,}/g) || []
  const hasDoubleSpaces = doubleSpaceMatches.length > 0
  const doubleSpaceRunCount = doubleSpaceMatches.length
  const grammarIssues = useMemo(() => {
    const text = renderedComposerText || ''
    if (!text.trim()) {
      return []
    }

    const issues = []
    const punctuationSpacingCount = (text.match(/\s+[,.;:!?]/g) || []).length
    const repeatedWordCount = (text.match(/\b([a-z]+)\s+\1\b/gi) || []).length
    const lowercaseICount = (text.match(/(^|[^\w])i(?=[^\w]|$)/g) || []).length
    const paragraphs = text
      .split(/\n\s*\n/g)
      .map((item) => item.trim())
      .filter(Boolean)
    const missingEndPunctuationCount = paragraphs.filter((item) => !/[.!?]["')\]]?$/.test(item)).length

    if (doubleSpaceRunCount > 0) {
      issues.push({
        key: 'double-spaces',
        label: `${doubleSpaceRunCount} double-space issue${doubleSpaceRunCount > 1 ? 's' : ''}`,
        fixable: true,
      })
    }
    if (punctuationSpacingCount > 0) {
      issues.push({
        key: 'punctuation-spacing',
        label: `${punctuationSpacingCount} spacing-before-punctuation issue${punctuationSpacingCount > 1 ? 's' : ''}`,
        fixable: true,
      })
    }
    if (repeatedWordCount > 0) {
      issues.push({
        key: 'repeated-words',
        label: `${repeatedWordCount} repeated-word issue${repeatedWordCount > 1 ? 's' : ''}`,
        fixable: true,
      })
    }
    if (lowercaseICount > 0) {
      issues.push({
        key: 'lowercase-i',
        label: `${lowercaseICount} lowercase "i" issue${lowercaseICount > 1 ? 's' : ''}`,
        fixable: true,
      })
    }
    if (missingEndPunctuationCount > 0) {
      issues.push({
        key: 'missing-end-punctuation',
        label: `${missingEndPunctuationCount} paragraph${missingEndPunctuationCount > 1 ? 's' : ''} missing end punctuation`,
        fixable: false,
      })
    }

    return issues
  }, [doubleSpaceRunCount, renderedComposerText])
  const hasGrammarIssues = grammarIssues.length > 0
  const hasFixableGrammarIssues = grammarIssues.some((issue) => issue.fixable)
  useEffect(() => {
    if (!hasGrammarIssues) {
      setIsGrammarDetailsOpen(false)
    }
  }, [hasGrammarIssues])
  const isCaseIdValid = /^C-\d{9}$/.test(variableValues.case_id)
  const isTrackingValid = /^\d{12,34}$/.test(variableValues.tracking_number.trim())
  const requiresSupportTicket = /\bCCCCC\b|\{case_id\}|\{customer_name\}/i.test(composerTemplateText)
  const requiresTrackingNumber = /\bXXXXX\b|\{tracking_number\}/i.test(composerTemplateText)
  const requiresLocationAddress = /\bLOCADDRESS\b|\{locaddress\}/i.test(composerTemplateText)
  const requiresDateTime = /\bDATE\b|\{date\}/i.test(composerTemplateText)
  const requiresCallback = /\bCALLBACK\b|\{callback\}/i.test(composerTemplateText)
  const missingDetails = [
    requiresSupportTicket && !isCaseIdValid ? 'Support Ticket' : '',
    requiresTrackingNumber && !isTrackingValid ? 'Tracking Number' : '',
    requiresLocationAddress && !variableValues.locaddress.trim() ? 'Location Address' : '',
    requiresDateTime && !variableValues.date.trim() ? 'Date & Time' : '',
    requiresCallback && !variableValues.callback.trim() ? 'Callback' : '',
  ].filter(Boolean)
  const detailsReady = missingDetails.length === 0
  const composerStatusText = detailsReady
    ? hasDoubleSpaces
      ? `Ready with ${doubleSpaceRunCount} spacing warning${doubleSpaceRunCount > 1 ? 's' : ''}`
      : 'Ready to copy'
    : `Missing: ${missingDetails.join(' / ')}`
  const composerStatusTone = detailsReady
    ? hasDoubleSpaces
      ? 'border-amber-400/35 bg-amber-500/15 text-amber-200'
      : 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200'
    : 'border-amber-400/35 bg-amber-500/15 text-amber-200'

  useEffect(() => {
    if (!autoCopyOnAdd) {
      return undefined
    }

    const textToCopy = renderedComposerText.trim()
    if (!textToCopy) {
      return undefined
    }

    const timer = setTimeout(() => {
      copyText(textToCopy)
        .then(() => {
          setCopyStatus('Auto-copied latest composer changes.')
          const now = Date.now()
          if (now - lastAutoCopyToastAtRef.current > 1500) {
            setToast({ message: 'Auto-copied latest changes', type: 'success' })
            lastAutoCopyToastAtRef.current = now
          }
        })
        .catch(() => {
          // silent fail for background auto-copy
        })
    }, 220)

    return () => clearTimeout(timer)
  }, [autoCopyOnAdd, renderedComposerText])

  const filteredCategories = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return categoryRows
    }

    return categoryRows
      .map((category) => ({
        ...category,
        rows: category.rows.filter(
          (row) => row.text.toLowerCase().includes(term) || category.label.toLowerCase().includes(term),
        ),
      }))
      .filter((category) => category.rows.length > 0)
  }, [categoryRows, query])

  const handleCopy = async (row) => {
    const copiedLabel = row.code ? row.code : 'line'
    try {
      await copyText(row.text)
      setCopyStatus(`Copied: ${copiedLabel}`)
      setToast({ message: `Copied ${copiedLabel}`, type: 'success' })
      setCopiedRowId(row.id)
    } catch {
      setCopyStatus('Copy failed. Please check clipboard permissions.')
      setToast({ message: 'Copy failed', type: 'error' })
    }
  }

  const handleCopyComposed = async () => {
    if (composerLines.length === 0) {
      setToast({ message: 'Composer is empty', type: 'warning' })
      return
    }
    try {
      await copyText(renderedComposerText)
      setCopyStatus('Copied composed email.')
      setToast({
        message: hasDoubleSpaces
          ? `Copied with warning: ${doubleSpaceRunCount} double-space issue(s)`
          : 'Copied composed email',
        type: hasDoubleSpaces ? 'warning' : 'success',
      })
    } catch {
      setCopyStatus('Copy failed. Please check clipboard permissions.')
      setToast({ message: 'Copy failed', type: 'error' })
    }
  }

  const fixDoubleSpacesInComposer = () => {
    setComposerLines((current) => current.map((line) => line.replace(/ {2,}/g, ' ')))
    setComposerDeletionWarning('')
    setComposerEditDelta({ added: [], removed: [] })
    setToast({ message: 'Double spaces cleaned', type: 'success' })
  }

  const fixSafeGrammarInComposer = () => {
    setComposerLines((current) =>
      current.map((line) =>
        line
          .replace(/ {2,}/g, ' ')
          .replace(/\s+([,.;:!?])/g, '$1')
          .replace(/\b([a-z]+)\s+\1\b/gi, '$1')
          .replace(/(^|[^\w])i(?=[^\w]|$)/g, (match, prefix) => `${prefix}I`),
      ),
    )
    setComposerDeletionWarning('')
    setComposerEditDelta({ added: [], removed: [] })
    setToast({ message: 'Applied safe grammar fixes', type: 'success' })
  }

  const parseComposerText = (value) =>
    value
      .split(/\n\s*\n/)
      .map((item) => item.trim())
      .filter(Boolean)

  const getComposerWordDelta = (beforeText, afterText) => {
    const tokenize = (value) => {
      const matches = String(value).match(/[A-Za-z0-9'-]+/g)
      return matches ? matches : []
    }

    const beforeTokens = tokenize(beforeText)
    const afterTokens = tokenize(afterText)
    const beforeMap = new Map()
    const afterMap = new Map()
    const beforeDisplay = new Map()
    const afterDisplay = new Map()

    beforeTokens.forEach((token) => {
      const key = token.toLowerCase()
      beforeMap.set(key, (beforeMap.get(key) || 0) + 1)
      if (!beforeDisplay.has(key)) {
        beforeDisplay.set(key, token)
      }
    })
    afterTokens.forEach((token) => {
      const key = token.toLowerCase()
      afterMap.set(key, (afterMap.get(key) || 0) + 1)
      if (!afterDisplay.has(key)) {
        afterDisplay.set(key, token)
      }
    })

    const added = []
    const removed = []
    const keys = new Set([...beforeMap.keys(), ...afterMap.keys()])
    keys.forEach((key) => {
      const beforeCount = beforeMap.get(key) || 0
      const afterCount = afterMap.get(key) || 0
      if (afterCount > beforeCount) {
        const count = afterCount - beforeCount
        for (let i = 0; i < count; i += 1) {
          added.push(afterDisplay.get(key) || key)
        }
      } else if (beforeCount > afterCount) {
        const count = beforeCount - afterCount
        for (let i = 0; i < count; i += 1) {
          removed.push(beforeDisplay.get(key) || key)
        }
      }
    })

    return {
      added: added.slice(0, 6),
      removed: removed.slice(0, 6),
    }
  }

  const handleComposerTextChange = (event) => {
    const nextRawText = event.target.value || ''
    const nextLines = nextRawText ? parseComposerText(nextRawText) : []
    const previousText = getComposerText()
    const removedContent = nextRawText.length < previousText.length
    const addedContent = nextRawText.length > previousText.length
    const manuallyEdited = nextRawText !== previousText

    setComposerLines(nextLines)

    if (manuallyEdited && previousText.trim()) {
      setComposerEditDelta(getComposerWordDelta(previousText, nextRawText))
      setComposerDeletionWarning(
        removedContent
          ? 'Warning: You removed text from the original spiel draft.'
          : addedContent
            ? 'Notice: You added manual text to the original spiel draft.'
            : 'Notice: You edited text in the original spiel draft.',
      )
      const now = Date.now()
      if (now - lastDeletionWarnAtRef.current > 1600) {
        setToast({
          message: removedContent
            ? 'You removed text from composer'
            : addedContent
              ? 'You added manual text to composer'
              : 'You edited text in composer',
          type: 'warning',
        })
        lastDeletionWarnAtRef.current = now
      }
      return
    }

    if (!manuallyEdited) {
      setComposerDeletionWarning('')
      setComposerEditDelta({ added: [], removed: [] })
    }
  }

  const addServiceChangeQuickLine = (category, lineIndex) => {
    const lineText = category?.lines?.[lineIndex]
    if (!lineText) {
      setToast({ message: 'No line available in this category', type: 'warning' })
      return
    }
    const lineLabel = lineIndex === 1 ? 'Case Notes' : 'Email'
    addLineAsParagraph(lineText, `${category.label} - ${lineLabel}`)
  }

  const addServiceChangeQuickDelayEmailLine = (category) => {
    const emailLine = category?.lines?.[0]
    if (!emailLine) {
      setToast({ message: 'No email line available in this category', type: 'warning' })
      return
    }
    const cleanedEmailLine = String(emailLine).trim()
    const combinedLine = `I apologize for the delay in my response. ${cleanedEmailLine}`
    addLineAsParagraph(combinedLine, `${category.label} - Delay+Email`)
    setToast({ message: 'Added delay + email line', type: 'success' })
  }

  const visibleCategories = useMemo(() => {
    if (selectedCategoryIds.length === 0) {
      return filteredCategories
    }
    const selectedSet = new Set(selectedCategoryIds)
    return filteredCategories.filter((category) => selectedSet.has(category.id))
  }, [filteredCategories, selectedCategoryIds])

  const favoriteRows = useMemo(() => {
    const favoriteSet = new Set(favoriteRowIds)
    const collected = []
    categoryRows.forEach((category) => {
      category.rows.forEach((row, rowIndex) => {
        if (!favoriteSet.has(row.id)) {
          return
        }
        collected.push({
          id: row.id,
          text: row.text,
          code: row.code || `${category.code}-${String(rowIndex + 1).padStart(2, '0')}`,
          categoryLabel: category.label,
        })
      })
    })
    return collected
  }, [categoryRows, favoriteRowIds])

  const toggleCategory = (categoryId) => {
    setOpenMap((current) => ({ ...current, [categoryId]: !current[categoryId] }))
  }

  const toggleCategoryFilter = (categoryId) => {
    setSelectedCategoryIds((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId],
    )
  }

  const registerAddedSpiel = (label) => {
    if (!label || !label.trim()) {
      return
    }
    const value = label.trim()
    setAddedSpiels((current) => {
      const next = [value, ...current.filter((item) => item !== value)]
      return next.slice(0, 8)
    })
  }

  const addLineAsAppend = (lineText, sourceLabel = '') => {
    if (!isComposerOpen || isComposerMinimized) {
      setIsComposerOpen(true)
      setIsComposerMinimized(false)
    }
    let nextLines = []
    setComposerLines((current) => {
      if (current.length === 0) {
        nextLines = [lineText]
        return nextLines
      }
      nextLines = [...current.slice(0, current.length - 1), `${current[current.length - 1]} ${lineText}`]
      return nextLines
    })
    setComposerDeletionWarning('')
    setComposerEditDelta({ added: [], removed: [] })
    registerAddedSpiel(sourceLabel || 'Manual append')
    if (autoCopyOnAdd && nextLines.length > 0) {
      copyText(renderVariables(nextLines.join('\n\n')))
        .then(() => setToast({ message: 'Added (append) + copied', type: 'success' }))
        .catch(() => setToast({ message: 'Added (append), auto-copy failed', type: 'warning' }))
      return
    }
    setToast({ message: 'Added to composer (append)', type: 'success' })
  }

  const addLineAsParagraph = (lineText, sourceLabel = '') => {
    if (!isComposerOpen || isComposerMinimized) {
      setIsComposerOpen(true)
      setIsComposerMinimized(false)
    }
    let nextLines = []
    setComposerLines((current) => {
      if (current.length === 0) {
        nextLines = [lineText]
        return nextLines
      }
      nextLines = [...current, lineText]
      return nextLines
    })
    setComposerDeletionWarning('')
    setComposerEditDelta({ added: [], removed: [] })
    registerAddedSpiel(sourceLabel || 'Manual paragraph')
    if (autoCopyOnAdd && nextLines.length > 0) {
      copyText(renderVariables(nextLines.join('\n\n')))
        .then(() => setToast({ message: 'Added (new paragraph) + copied', type: 'success' }))
        .catch(() => setToast({ message: 'Added (new paragraph), auto-copy failed', type: 'warning' }))
      return
    }
    setToast({ message: 'Added to composer (new paragraph)', type: 'success' })
  }

  const toggleFavoriteRow = (rowId) => {
    setFavoriteRowIds((current) =>
      current.includes(rowId) ? current.filter((id) => id !== rowId) : [...current, rowId],
    )
  }

  return (
    <section className="rounded-2xl border border-[#b990f5]/20 bg-[#121325]/90 p-4">
      <p className="text-xl font-bold">{title}</p>
      <p className="mt-1 text-sm text-[#e7d8f8]">{description}</p>

      <div className="sticky top-2 z-20 mt-3 rounded-xl border border-[#b990f5]/20 bg-[#171830]/95 p-3 backdrop-blur sm:static sm:backdrop-blur-0">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by category or line..."
          className="w-full rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2.5 py-1.5 text-sm outline-none ring-[#b990f5]/60 focus:ring-2"
        />
        <div className="pcc-scroll-x mt-3 overflow-x-auto pb-1">
          <div className="flex min-w-max items-center gap-2">
            {categoryRows.map((category) => {
              const isActive = selectedCategoryIds.includes(category.id)
              return (
              <button
                key={`chip-${category.id}`}
                onClick={() => toggleCategoryFilter(category.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  isActive
                    ? 'border-[#b990f5]/55 bg-[#6f2ad4]/35 text-white'
                    : 'border-[#b990f5]/30 bg-[#1d1f3d] text-[#e7d8f8] hover:bg-[#2a2d50]'
                }`}
              >
                {category.label}
              </button>
            )})}
            {selectedCategoryIds.length > 0 ? (
              <button
                onClick={() => setSelectedCategoryIds([])}
                className="rounded-full border border-amber-400/35 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200 hover:bg-amber-500/20"
              >
                Clear Filter
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {favoriteRows.length > 0 ? (
          <div className="md:col-span-2 2xl:col-span-3 rounded-xl border border-[#b990f5]/25 bg-[#161832] p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#caa5ff]">Favorites - Quick Copy</p>
              <button
                onClick={() => setFavoriteRowIds([])}
                className="rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-[10px] font-semibold text-[#f2eafb] hover:bg-[#2a2d50]"
              >
                Clear Favorites
              </button>
            </div>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {favoriteRows.map((fav) => (
                <div key={`fav-${fav.id}`} className="rounded border border-[#b990f5]/20 bg-[#111328]/85 p-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#caa5ff]">
                    {fav.categoryLabel} {showCodeBadge ? `- ${fav.code}` : ''}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-100">{getRowPreviewText(fav.text, 180)}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy({ id: fav.id, text: fav.text, code: showCodeBadge ? fav.code : '' })}
                      className="rounded border border-[#b990f5]/30 bg-[#231f3f] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#e9dcfb] hover:bg-[#2f2a53]"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => addLineAsAppend(fav.text, `${fav.categoryLabel} - Append`)}
                      className="rounded border border-[#b990f5]/30 bg-[#231f3f] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#e9dcfb] hover:bg-[#2f2a53]"
                    >
                      Append
                    </button>
                    <button
                      onClick={() => addLineAsParagraph(fav.text, `${fav.categoryLabel} - New Paragraph`)}
                      className="rounded border border-[#b990f5]/30 bg-[#2f2450] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#f1e7fe] hover:bg-[#3a2d63]"
                    >
                      New Paragraph
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {visibleCategories.map((category) => {
          const isOpen = collapsible ? !!openMap[category.id] : true
          const categoryTone = getCategoryTone(category.label)

          return (
            <div key={category.id} className="rounded-xl border border-[#b990f5]/20 bg-[#171830]/95">
              {collapsible ? (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left"
                >
                  <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md border ${categoryTone}`}>
                      <CategoryIcon label={category.label} />
                    </span>
                    <span>{category.label}</span>
                  </span>
                  <span className="text-[#caa5ff]/90">
                    {isOpen ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                      </svg>
                    )}
                  </span>
                </button>
              ) : (
                <div className="px-3 py-2">
                  <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md border ${categoryTone}`}>
                      <CategoryIcon label={category.label} />
                    </span>
                    <span>{category.label}</span>
                  </span>
                </div>
              )}

              {isOpen ? (
                <div className="divide-y divide-[#b990f5]/15 border-t border-[#b990f5]/20 bg-[#111328]/95 p-1.5">
                  {category.rows.map((row, rowIndex) => {
                    const rowCode = row.code || `${category.code}-${String(rowIndex + 1).padStart(2, '0')}`
                    const isCaseNoteRow = Number.isInteger(caseNoteRowIndex) && rowIndex === caseNoteRowIndex
                    const isEmailRow = Number.isInteger(emailRowIndex) && rowIndex === emailRowIndex
                    const displayCode = showCodeBadge ? rowCode : ''
                    const markerLabel = isCaseNoteRow ? caseNoteLabel : isEmailRow ? emailLabel : showCodeBadge ? rowCode : ''
                    const markerClass = isCaseNoteRow
                      ? 'border-amber-300/35 bg-amber-500/15 text-amber-200'
                      : isEmailRow
                        ? 'border-sky-300/35 bg-sky-500/15 text-sky-200'
                        : 'border-[#b990f5]/35 bg-[#6f2ad4]/35 text-[#f2eafb]'
                    return (
                      <div
                        key={row.id}
                        onClick={() => handleCopy({ ...row, code: displayCode })}
                        className={`group rounded-md border border-dashed transition ${
                          isCaseNoteRow
                            ? 'border-amber-300/35 bg-amber-500/5'
                            : 'border-[#b990f5]/12'
                        } ${
                          copiedRowId === row.id ? 'bg-[#6f2ad4]/20 ring-1 ring-[#b990f5]/40' : 'hover:bg-[#232547]'
                        } cursor-pointer`}
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-dashed border-[#b990f5]/25 px-2 py-1.5 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-bold uppercase tracking-[0.08em] ${markerClass} rounded px-1.5 py-0.5`}>
                              {markerLabel || 'LINE'}
                            </span>
                            <button
                              onClick={(event) => {
                                event.stopPropagation()
                                toggleFavoriteRow(row.id)
                              }}
                              className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold ${
                                favoriteRowIds.includes(row.id)
                                  ? 'border-amber-300/35 bg-amber-500/15 text-amber-200'
                                  : 'border-[#b990f5]/25 bg-[#1d1f3d] text-[#d9c6f5]'
                              }`}
                              title={favoriteRowIds.includes(row.id) ? 'Remove favorite' : 'Add to favorites'}
                            >
                              {favoriteRowIds.includes(row.id) ? '★' : '☆'}
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {showAppendAction ? (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation()
                                  addLineAsAppend(row.text, `${category.label} - Append`)
                                }}
                                className="inline-flex h-5 items-center justify-center rounded border border-[#b990f5]/30 bg-[#231f3f] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#e9dcfb] hover:bg-[#2f2a53]"
                                title="Append to the current paragraph"
                              >
                                Append
                              </button>
                            ) : null}
                            <button
                              onClick={(event) => {
                                event.stopPropagation()
                                addLineAsParagraph(row.text, `${category.label} - New Paragraph`)
                              }}
                              className="inline-flex h-5 items-center justify-center rounded border border-[#b990f5]/30 bg-[#2f2450] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#f1e7fe] hover:bg-[#3a2d63]"
                              title="Add as a new paragraph"
                            >
                              New Paragraph
                            </button>
                            <button
                              onClick={(event) => {
                                event.stopPropagation()
                                setPreviewRow({ code: displayCode, text: row.text })
                              }}
                              className="inline-flex h-5 items-center justify-center rounded border border-[#b990f5]/30 bg-[#231f3f] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#e9dcfb] hover:bg-[#2f2a53]"
                              title="View full line"
                            >
                              View
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={(event) => {
                            event.stopPropagation()
                            handleCopy({ ...row, code: displayCode })
                          }}
                          className="w-full px-2 py-2 text-left text-sm leading-6 text-slate-100"
                          title={row.text}
                        >
                          <span
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: previewLineClamp,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {getRowPreviewText(row.text, 320)}
                          </span>
                        </button>
                        </div>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {isComposerOpen && !isComposerMinimized ? (
        <div className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[920px] border-l border-[#b990f5]/25 bg-[#171830] p-4 shadow-2xl">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f2eafb]">Email Composer</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsComposerMinimized(true)}
                  className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-xs text-[#f2eafb] hover:bg-[#2a2d50]"
                  title="Minimize composer"
                >
                  Minimize
                </button>
                <button
                  onClick={() => setIsComposerOpen(false)}
                  className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-xs text-[#f2eafb] hover:bg-[#2a2d50]"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="mt-3 flex-1 overflow-hidden pr-1">
            <div className="grid items-stretch gap-4 lg:grid-cols-2">
              <section className="flex h-full flex-col rounded-lg border border-[#b990f5]/20 bg-[#12142a] p-3">
                <div className="relative flex items-center gap-2">
                  <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#caa5ff]">Compose Message</p>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      {addedSpiels.length > 0 ? (
                        <>
                          <span className="max-w-[280px] truncate rounded-full border border-[#b990f5]/35 bg-[#261f45] px-2 py-0.5 text-[10px] font-semibold text-[#f0e7ff]">
                            {addedSpiels[0]}
                          </span>
                          {addedSpiels.length > 1 ? (
                            <button
                              onClick={() => setIsAddedSpielsMenuOpen((value) => !value)}
                              className="rounded-full border border-[#b990f5]/25 bg-[#1d1f3d] px-1.5 py-0.5 text-[10px] font-semibold text-[#d8c5f6] hover:bg-[#2a2d50]"
                            >
                              +{addedSpiels.length - 1}
                            </button>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </div>
                  {addedSpiels.length > 0 ? (
                    <button
                      onClick={() => {
                        setComposerLines([])
                        setAddedSpiels([])
                        setIsAddedSpielsMenuOpen(false)
                        setComposerDeletionWarning('')
                        setComposerEditDelta({ added: [], removed: [] })
                        setCopyStatus('Composer cleared.')
                      }}
                      className="shrink-0 rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-1.5 py-0.5 text-[10px] font-semibold text-[#e9dcfb] hover:bg-[#2a2d50]"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
                {isAddedSpielsMenuOpen && addedSpiels.length > 1 ? (
                  <div className="absolute right-0 top-7 z-20 w-[360px] max-w-full rounded-lg border border-[#b990f5]/25 bg-[#13152d] p-2 shadow-xl">
                    <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                      {addedSpiels.slice(1).map((item) => (
                        <div
                          key={`added-menu-${item}`}
                          className="truncate rounded-md border border-[#b990f5]/20 bg-[#1a1c38] px-2 py-1 text-[11px] font-semibold text-[#e9dcfb]"
                          title={item}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <textarea
                  value={getComposerText()}
                  onChange={handleComposerTextChange}
                  className="mt-2 h-48 w-full resize-none rounded border border-[#b990f5]/20 bg-[#111328]/80 p-2 text-sm leading-relaxed text-[#f2eafb] outline-none ring-[#b990f5]/60 focus:ring-2"
                  placeholder="Click Append / New Paragraph on spiel lines to build an email..."
                />
                {composerDeletionWarning ? (
                  <div className="mt-2 space-y-1">
                    <div className="inline-flex max-w-full items-center gap-1 rounded border border-amber-400/35 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-200">
                      <span>!</span>
                      <span className="truncate">{composerDeletionWarning}</span>
                    </div>
                    {composerEditDelta.added.length > 0 || composerEditDelta.removed.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1">
                        {composerEditDelta.added.map((word, index) => (
                          <span
                            key={`edit-added-${word}-${index}`}
                            className="rounded border border-emerald-400/35 bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-200"
                            title={`Added: ${word}`}
                          >
                            + {word}
                          </span>
                        ))}
                        {composerEditDelta.removed.map((word, index) => (
                          <span
                            key={`edit-removed-${word}-${index}`}
                            className="rounded border border-rose-400/35 bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-200"
                            title={`Removed: ${word}`}
                          >
                            - {word}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </section>

              <section className="flex h-full flex-col rounded-lg border border-[#b990f5]/20 bg-[#12142a] p-3">
                <p className="h-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#caa5ff]">Live View</p>
                <div className="mt-2 h-48 overflow-auto rounded border border-[#b990f5]/20 bg-[#111328]/80 p-2 whitespace-pre-wrap text-sm leading-relaxed text-[#f2eafb]">
                  {renderedComposerText || <span className="text-slate-400">No composed text yet.</span>}
                </div>
                <div className="mt-2 rounded border border-[#b990f5]/20 bg-[#141633] px-2 py-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span
                        className={`inline-flex rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                          hasGrammarIssues
                            ? 'border-amber-400/35 bg-amber-500/15 text-amber-200'
                            : 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200'
                        }`}
                      >
                        {hasGrammarIssues ? `${grammarIssues.length} grammar check${grammarIssues.length > 1 ? 's' : ''}` : 'Grammar clean'}
                      </span>
                      {hasGrammarIssues ? (
                        <p className="mt-1 truncate text-[10px] text-[#d7c1f3]" title={grammarIssues[0].label}>
                          {grammarIssues[0].label}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {hasGrammarIssues ? (
                        <button
                          onClick={() => setIsGrammarDetailsOpen((value) => !value)}
                          className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#e9dcfb] hover:bg-[#2a2d50]"
                        >
                          {isGrammarDetailsOpen ? 'Hide' : 'Details'}
                        </button>
                      ) : null}
                      {hasFixableGrammarIssues ? (
                        <button
                          onClick={fixSafeGrammarInComposer}
                          className="rounded-md border border-emerald-400/35 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-200 hover:bg-emerald-500/25"
                        >
                          Fix Safe
                        </button>
                      ) : null}
                    </div>
                  </div>
                  {hasGrammarIssues && isGrammarDetailsOpen ? (
                    <div className="mt-1.5 max-h-20 space-y-1 overflow-y-auto pr-1">
                      {grammarIssues.map((issue) => (
                        <div
                          key={`grammar-${issue.key}`}
                          className="rounded border border-[#b990f5]/20 bg-[#1b1d3a] px-2 py-1 text-[10px] text-[#e9dcfb]"
                        >
                          <span>{issue.label}</span>
                          {!issue.fixable ? <span className="ml-1 text-[#bda6df]">(manual)</span> : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            </div>

            <div className="mt-3 rounded-lg border border-[#b990f5]/25 bg-[#13152d] p-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${composerStatusTone}`}>
                    {composerStatusText}
                  </span>
                  {hasDoubleSpaces ? (
                    <button
                      onClick={fixDoubleSpacesInComposer}
                      className="rounded-md border border-amber-400/35 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-200 hover:bg-amber-500/25"
                    >
                      Fix Spaces
                    </button>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setAutoCopyOnAdd((value) => !value)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
                      autoCopyOnAdd
                        ? 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200'
                        : 'border-[#b990f5]/25 bg-[#1d1f3d] text-[#f2eafb]'
                    }`}
                  >
                    Auto-copy: {autoCopyOnAdd ? 'On' : 'Off'}
                  </button>
                  <button
                    onClick={handleCopyComposed}
                    className="rounded-md border border-[#b990f5]/25 bg-[#6f2ad4]/30 px-3 py-1 text-xs font-semibold text-[#f2eafb] hover:bg-[#6f2ad4]/45"
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => {
                      setComposerLines([])
                      setVariableValues({ case_id: '', tracking_number: '', locaddress: '', date: '', callback: '' })
                      setAddedSpiels([])
                      setComposerDeletionWarning('')
                      setComposerEditDelta({ added: [], removed: [] })
                      setCopyStatus('Composer reset.')
                    }}
                    className="min-w-[104px] rounded-md border border-red-400/45 bg-red-600/35 px-4 py-1 text-xs font-bold text-red-100 hover:bg-red-600/50"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <section className="mt-3 min-h-0 rounded-lg border border-[#b990f5]/20 bg-[#12142a] p-2.5">
              <div className="rounded-md border border-[#b990f5]/25 bg-[#17193a] px-3 py-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#caa5ff]">
                  Tools (Details, Quick Add)
                </span>
              </div>
              <div className="mt-2 pr-1">
              <section className="rounded-lg border border-[#b990f5]/15 bg-[#12142a] p-2.5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#caa5ff]">Details</p>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                        detailsReady
                          ? 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200'
                          : 'border-amber-400/35 bg-amber-500/15 text-amber-200'
                      }`}
                    >
                      {detailsReady ? 'Ready' : 'Incomplete'}
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#d7c1f3]">Support Ticket</span>
                      <input
                        value={variableValues.case_id}
                        onChange={(event) =>
                          setVariableValues((current) => ({ ...current, case_id: formatCaseIdInput(event.target.value) }))
                        }
                        placeholder="C-000000000"
                        inputMode="numeric"
                        maxLength={11}
                        pattern="C-[0-9]{9}"
                        className="w-full rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1.5 text-xs text-[#f2eafb] outline-none focus:ring-2 focus:ring-[#b990f5]/50"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#d7c1f3]">Tracking Number</span>
                      <input
                        value={variableValues.tracking_number}
                        onChange={(event) =>
                          setVariableValues((current) => ({
                            ...current,
                            tracking_number: event.target.value.replace(/\D/g, '').slice(0, 34),
                          }))
                        }
                        placeholder="12 to 34 digits"
                        inputMode="numeric"
                        maxLength={34}
                        pattern="[0-9]{12,34}"
                        className="w-full rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1.5 text-xs text-[#f2eafb] outline-none focus:ring-2 focus:ring-[#b990f5]/50"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#d7c1f3]">Location Address</span>
                      <input
                        value={variableValues.locaddress}
                        onChange={(event) =>
                          setVariableValues((current) => ({ ...current, locaddress: event.target.value }))
                        }
                        placeholder="Enter location address"
                        className="w-full rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1.5 text-xs text-[#f2eafb] outline-none focus:ring-2 focus:ring-[#b990f5]/50"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#d7c1f3]">Date &amp; Time</span>
                      <input
                        value={variableValues.date}
                        onChange={(event) =>
                          setVariableValues((current) => ({ ...current, date: event.target.value }))
                        }
                        placeholder="Enter date & time"
                        className="w-full rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1.5 text-xs text-[#f2eafb] outline-none focus:ring-2 focus:ring-[#b990f5]/50"
                      />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] font-semibold text-[#d7c1f3]">Callback</span>
                      <input
                        value={variableValues.callback}
                        onChange={(event) =>
                          setVariableValues((current) => ({ ...current, callback: event.target.value }))
                        }
                        placeholder="Enter callback details"
                        className="w-full rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1.5 text-xs text-[#f2eafb] outline-none focus:ring-2 focus:ring-[#b990f5]/50"
                      />
                    </label>
                  </div>

                  <div className="rounded border border-[#b990f5]/20 bg-[#141633] p-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#e6d7fa]">
                        Quick Add - {quickAddTab === 'service-change' ? 'Service Change' : quickAddTab === 'opening' ? 'Opening' : 'Closing'}
                      </p>
                      <div className="flex items-center gap-2 text-[10px]">
                        <button
                          onClick={() => setQuickAddPage((value) => Math.max(0, value - 1))}
                          disabled={safeQuickAddPage === 0}
                          className="rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-0.5 font-semibold text-[#f2eafb] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Prev
                        </button>
                        <span className="text-[#caa5ff]">
                          {safeQuickAddPage + 1} / {quickAddTotalPages}
                        </span>
                        <button
                          onClick={() => setQuickAddPage((value) => Math.min(quickAddTotalPages - 1, value + 1))}
                          disabled={safeQuickAddPage === quickAddTotalPages - 1}
                          className="rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-0.5 font-semibold text-[#f2eafb] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <button
                        onClick={() => setQuickAddTab('opening')}
                        className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${
                          quickAddTab === 'opening'
                            ? 'border-[#b990f5]/45 bg-[#6f2ad4]/30 text-white'
                            : 'border-[#b990f5]/25 bg-[#1d1f3d] text-[#e9dcfb] hover:bg-[#2a2d50]'
                        }`}
                      >
                        Opening
                      </button>
                      <button
                        onClick={() => setQuickAddTab('closing')}
                        className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${
                          quickAddTab === 'closing'
                            ? 'border-[#b990f5]/45 bg-[#6f2ad4]/30 text-white'
                            : 'border-[#b990f5]/25 bg-[#1d1f3d] text-[#e9dcfb] hover:bg-[#2a2d50]'
                        }`}
                      >
                        Closing
                      </button>
                      <button
                        onClick={() => setQuickAddTab('service-change')}
                        className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${
                          quickAddTab === 'service-change'
                            ? 'border-[#b990f5]/45 bg-[#6f2ad4]/30 text-white'
                            : 'border-[#b990f5]/25 bg-[#1d1f3d] text-[#e9dcfb] hover:bg-[#2a2d50]'
                        }`}
                      >
                        Service Change
                      </button>
                    </div>
                    <input
                      value={quickAddSearch}
                      onChange={(event) => setQuickAddSearch(event.target.value)}
                      placeholder="Global search: category or line..."
                      className="mt-1.5 w-full rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1.5 text-xs text-[#f2eafb] outline-none ring-[#b990f5]/60 focus:ring-2"
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1">
                      <button
                        onClick={() => setQuickAddCompact(false)}
                        className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${
                          !quickAddCompact
                            ? 'border-[#b990f5]/45 bg-[#6f2ad4]/30 text-white'
                            : 'border-[#b990f5]/25 bg-[#1d1f3d] text-[#e9dcfb] hover:bg-[#2a2d50]'
                        }`}
                      >
                        3 Rows
                      </button>
                      <button
                        onClick={() => setQuickAddCompact(true)}
                        className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${
                          quickAddCompact
                            ? 'border-[#b990f5]/45 bg-[#6f2ad4]/30 text-white'
                            : 'border-[#b990f5]/25 bg-[#1d1f3d] text-[#e9dcfb] hover:bg-[#2a2d50]'
                        }`}
                      >
                        Compact (5)
                      </button>
                    </div>
                    <div className="mt-1.5 space-y-1">
                      {quickAddPageItems.map((category) => (
                        <div
                          key={`quick-${category.id}`}
                          className={`flex items-center justify-between gap-2 rounded border border-[#b990f5]/15 px-2 ${
                            quickAddCompact ? 'py-0.5' : 'py-1'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.06em] text-[#e6d7fa]">
                              {quickAddCompact && category.source === 'service-change'
                                ? `${category.label} - ${category.group || 'Service Change'}`
                                : category.label}
                            </p>
                            {!quickAddCompact ? (
                              <p className="text-[10px] uppercase tracking-[0.05em] text-[#a98dd3]">
                                {category.source === 'service-change'
                                  ? `${category.group || 'Service Change'} / Service Change`
                                  : category.source === 'opening'
                                    ? 'Opening'
                                    : 'Closing'}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => addServiceChangeQuickLine(category, 0)}
                              className="rounded border border-sky-300/35 bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-sky-200 hover:bg-sky-500/25"
                            >
                              Email
                            </button>
                            {quickAddTab === 'service-change' ? (
                              <button
                                onClick={() => addServiceChangeQuickDelayEmailLine(category)}
                                className="rounded border border-violet-300/35 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-violet-200 hover:bg-violet-500/25"
                              >
                                Delay + Email
                              </button>
                            ) : null}
                            <button
                              onClick={() => addServiceChangeQuickLine(category, 1)}
                              className="rounded border border-amber-300/35 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-amber-200 hover:bg-amber-500/25"
                            >
                              Case Notes
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              </div>
            </section>
            </div>
          </div>
        </div>
      ) : null}

      {isComposerOpen && isComposerMinimized ? (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-[#b990f5]/30 bg-[#171830] px-3 py-2 shadow-2xl">
          <button
            onClick={() => setIsComposerMinimized(false)}
            className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-xs font-semibold text-[#f2eafb] hover:bg-[#2a2d50]"
          >
            Open Composer{composerLines.length > 0 ? ` (${composerLines.length})` : ''}
          </button>
          <button
            onClick={() => setIsComposerOpen(false)}
            className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-xs text-[#f2eafb] hover:bg-[#2a2d50]"
            title="Close composer"
          >
            X
          </button>
        </div>
      ) : null}

      {previewRow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-[#b990f5]/25 bg-[#171830] p-4 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f2eafb]">Line Preview</p>
              <button
                onClick={() => setPreviewRow(null)}
                className="rounded-md border border-[#b990f5]/25 bg-[#1d1f3d] px-2 py-1 text-xs text-[#f2eafb] hover:bg-[#2a2d50]"
              >
                Close
              </button>
            </div>
            <div className="mt-3 rounded border border-[#b990f5]/25 bg-[#111328]/90 p-3">
              {previewRow.code ? <p className="mb-2 text-[11px] font-semibold text-[#caa5ff]">{previewRow.code}</p> : null}
              <textarea
                ref={previewTextRef}
                readOnly
                value={previewRow.text}
                onClick={(event) => {
                  if (event.detail >= 2) {
                    event.currentTarget.select()
                  }
                }}
                className="h-44 w-full resize-none rounded border border-[#b990f5]/25 bg-[#1d1f3d] p-2 text-sm leading-relaxed text-slate-100 outline-none"
              />
            </div>
            <div className="mt-3 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => {
                  addLineAsAppend(previewRow.text)
                  setPreviewRow(null)
                }}
                className="rounded border border-[#b990f5]/25 bg-[#1d1f3d] px-2.5 py-1 text-xs font-semibold text-[#f2eafb] hover:bg-[#2a2d50]"
              >
                Append
              </button>
              <button
                onClick={() => {
                  addLineAsParagraph(previewRow.text)
                  setPreviewRow(null)
                }}
                className="rounded border border-[#b990f5]/35 bg-[#6f2ad4]/35 px-2.5 py-1 text-xs font-semibold text-[#f2eafb] hover:bg-[#6f2ad4]/50"
              >
                New Paragraph
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast.message ? (
        <div
          className={`fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold shadow-2xl ${
            toast.type === 'success'
              ? 'border-emerald-400/35 bg-[#10221d] text-emerald-200'
              : toast.type === 'warning'
                ? 'border-amber-400/35 bg-[#231f10] text-amber-200'
                : 'border-red-400/35 bg-[#2a1414] text-red-200'
          }`}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current/30 text-xs">
            {toast.type === 'success' ? '✓' : toast.type === 'warning' ? '!' : '×'}
          </span>
          <span>{toast.message}</span>
        </div>
      ) : null}
    </section>
  )
}

export default SpielsCategoryBoard
