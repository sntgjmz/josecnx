import { useEffect, useState } from 'react'
import DashboardPage from './features/dashboard/DashboardPage.jsx'
import LoginPage from './features/auth/LoginPage.jsx'
import IntroPage from './features/auth/IntroPage.jsx'
import MusicPage from './features/music/MusicPage.jsx'
import { MOCK_USERS } from './data/mockAuth.js'

const AUTH_USER_STORAGE_KEY = 'pcc_auth_user'

async function sha256Hex(value) {
  const data = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

function App() {
  const [isMusicPageOpen, setIsMusicPageOpen] = useState(() => window.location.hash === '#music' || window.location.hash === '#/music')
  const [authUser, setAuthUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY)
      if (savedUser) {
        const parsed = JSON.parse(savedUser)
        if (parsed?.username && parsed?.name) {
          return parsed
        }
      }
    } catch {
      // ignore invalid saved auth payload
    }
    return null
  })
  const [loginError, setLoginError] = useState('')
  const [showIntro, setShowIntro] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    try {
      if (authUser) {
        localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(authUser))
      } else {
        localStorage.removeItem(AUTH_USER_STORAGE_KEY)
      }
    } catch {
      // ignore localStorage write errors
    }
  }, [authUser])

  useEffect(() => {
    const syncMusicRoute = () => setIsMusicPageOpen(window.location.hash === '#music' || window.location.hash === '#/music')
    window.addEventListener('hashchange', syncMusicRoute)
    return () => window.removeEventListener('hashchange', syncMusicRoute)
  }, [])

  const openMusicPage = () => {
    window.location.hash = 'music'
    setIsMusicPageOpen(true)
  }

  const closeMusicPage = () => {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    setIsMusicPageOpen(false)
  }

  const handleLogin = async (username, password) => {
    if (isAuthenticating) {
      return
    }
    const passwordHash = await sha256Hex(password)
    const user = MOCK_USERS.find(
      (item) => item.username.toLowerCase() === username.toLowerCase() && item.passwordHash === passwordHash,
    )
    if (!user) {
      setLoginError('Invalid username or password.')
      return
    }

    setLoginError('')
    setIsAuthenticating(true)
    await new Promise((resolve) => setTimeout(resolve, 950))
    setAuthUser({ name: user.name, username: user.username })
    setIsAuthenticating(false)
  }

  const handleLogout = () => {
    setAuthUser(null)
    setLoginError('')
    setShowIntro(true)
    setIsAuthenticating(false)
  }

  const handleContinueFromIntro = () => {
    setShowIntro(false)
  }

  if (!authUser) {
    if (isMusicPageOpen) {
      return <MusicPage onExit={closeMusicPage} />
    }
    if (showIntro) {
      return <IntroPage onContinue={handleContinueFromIntro} />
    }
    return <LoginPage onLogin={handleLogin} error={loginError} isAuthenticating={isAuthenticating} onOpenMusic={openMusicPage} />
  }

  return (
    <>
      <div className={isMusicPageOpen ? 'hidden' : ''}>
        <DashboardPage user={authUser} onLogout={handleLogout} onOpenMusic={openMusicPage} />
      </div>
      <MusicPage onExit={closeMusicPage} isVisible={isMusicPageOpen} />
    </>
  )
}

export default App
