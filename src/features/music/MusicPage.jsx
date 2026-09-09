import { useEffect, useMemo, useRef, useState } from 'react'
import { featuredCollections, musicLibrary } from './musicLibrary.js'

const LIKED_TRACKS_KEY = 'pcc_soundroom_liked_tracks'
const RECENT_TRACKS_KEY = 'pcc_soundroom_recent_tracks'
const PLAYLISTS_KEY = 'pcc_soundroom_playlists'
const PLAYLIST_ARTWORKS = [
  'from-emerald-500 via-teal-600 to-cyan-950',
  'from-rose-500 via-fuchsia-600 to-violet-950',
  'from-amber-400 via-orange-600 to-red-950',
  'from-sky-400 via-blue-600 to-indigo-950',
]

function Icon({ name, className = 'h-5 w-5' }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true }

  if (name === 'home') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" /></svg>
  if (name === 'search') return <svg {...common}><circle cx="11" cy="11" r="6" /><path strokeLinecap="round" d="m16 16 4 4" /></svg>
  if (name === 'library') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A2.5 2.5 0 0 0 17.5 16H4V5.5Z" /><path strokeLinecap="round" d="M4 16v2.5A2.5 2.5 0 0 0 6.5 21H20M8 7h8M8 11h6" /></svg>
  if (name === 'heart') return <svg {...common} fill="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg>
  if (name === 'plus') return <svg {...common}><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>
  if (name === 'back') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="m14 6-6 6 6 6" /></svg>
  if (name === 'forward') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="m10 6 6 6-6 6" /></svg>
  if (name === 'play') return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.3v13.4c0 .8.9 1.3 1.6.8l10-6.7a1 1 0 0 0 0-1.6l-10-6.7A1 1 0 0 0 8 5.3Z" /></svg>
  if (name === 'pause') return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
  if (name === 'previous') return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zm3.5 7 8.5-6v12z" /></svg>
  if (name === 'next') return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zm-1.5 7L6 6v12z" /></svg>
  if (name === 'shuffle') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h2.4c1.9 0 3.6 1 4.6 2.7l3.3 5.6A5.4 5.4 0 0 0 18 18H21M18 5l3 3-3 3M3 17h2.4c1.2 0 2.4-.4 3.3-1.1M14.4 8.2A5.3 5.3 0 0 1 18 6h3M18 3l3 3-3 3" /></svg>
  if (name === 'repeat') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3" /></svg>
  if (name === 'volume') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 10v4h4l5 4V6L8 10H4ZM17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" /></svg>
  if (name === 'queue') return <svg {...common}><path strokeLinecap="round" d="M4 6h10M4 12h10M4 18h7M18 15v6m-3-3h6" /></svg>
  if (name === 'close') return <svg {...common}><path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" /></svg>
  if (name === 'more') return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
  if (name === 'music') return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3Zm11-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z" /></svg>
  return null
}

function getStoredArray(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function getStoredPlaylists() {
  try {
    const stored = JSON.parse(localStorage.getItem(PLAYLISTS_KEY) || '[]')
    if (!Array.isArray(stored)) return []
    return stored.filter((playlist) => (
      playlist
      && typeof playlist.id === 'string'
      && typeof playlist.name === 'string'
      && Array.isArray(playlist.trackIds)
    ))
  } catch {
    return []
  }
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainingSeconds}`
}

function Artwork({ item, className = 'h-full w-full' }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${item.artwork} ${className}`}>
      <div className="absolute -right-5 -top-4 h-20 w-20 rounded-full border-[12px] border-white/20" />
      <div className="absolute -bottom-9 left-2 h-24 w-24 rounded-full border-[15px] border-black/20" />
      <Icon name="music" className="absolute bottom-3 left-3 h-7 w-7 text-white/85" />
    </div>
  )
}

function SoundwaveMark({ compact = false }) {
  const heights = compact ? [13, 21, 30, 18, 34, 24, 15] : [20, 36, 50, 30, 57, 42, 25]
  return (
    <div className={`flex items-center justify-center gap-1 ${compact ? 'h-8' : 'h-14'}`} aria-hidden="true">
      {heights.map((height, index) => (
        <span key={`${height}-${index}`} className={`soundroom-bar rounded-full bg-[#62e6a9] ${compact ? 'w-1' : 'w-1.5'}`} style={{ height: `${height}px`, animationDelay: `${index * 0.1}s` }} />
      ))}
    </div>
  )
}

function PlayButton({ playing, onClick, label, small = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#62e6a9] text-[#07130e] shadow-[0_8px_22px_rgba(98,230,169,0.28)] transition hover:scale-105 hover:bg-[#8af7c2] focus:outline-none focus:ring-2 focus:ring-[#b4ffda] ${small ? 'h-10 w-10' : 'h-14 w-14'}`}
    >
      <Icon name={playing ? 'pause' : 'play'} className={small ? 'h-4 w-4' : 'h-6 w-6'} />
    </button>
  )
}

function MusicPage({ onExit, isVisible = true }) {
  const audioRef = useRef(null)
  const isPlayingRef = useRef(false)
  const [activeView, setActiveView] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTrackId, setCurrentTrackId] = useState(musicLibrary[0]?.id || '')
  const [queue, setQueue] = useState(() => musicLibrary.map((track) => track.id))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [repeatMode, setRepeatMode] = useState('off')
  const [likedTrackIds, setLikedTrackIds] = useState(() => getStoredArray(LIKED_TRACKS_KEY))
  const [recentTrackIds, setRecentTrackIds] = useState(() => getStoredArray(RECENT_TRACKS_KEY))
  const [customPlaylists, setCustomPlaylists] = useState(getStoredPlaylists)
  const [isQueueOpen, setIsQueueOpen] = useState(false)
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)
  const [isPlaylistPickerOpen, setIsPlaylistPickerOpen] = useState(false)
  const [trackToAdd, setTrackToAdd] = useState(null)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
  const [selectedArtist, setSelectedArtist] = useState(null)

  const currentTrack = useMemo(
    () => musicLibrary.find((track) => track.id === currentTrackId) || musicLibrary[0],
    [currentTrackId],
  )
  const currentQueueIndex = queue.indexOf(currentTrack?.id)
  const playbackSecond = Math.floor(currentTime)
  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return musicLibrary
    return musicLibrary.filter((track) => `${track.title} ${track.artist} ${track.album} ${track.mood}`.toLowerCase().includes(term))
  }, [searchTerm])
  const likedTracks = useMemo(() => musicLibrary.filter((track) => likedTrackIds.includes(track.id)), [likedTrackIds])
  const recentTracks = useMemo(() => {
    const sorted = recentTrackIds.map((id) => musicLibrary.find((track) => track.id === id)).filter(Boolean)
    return sorted.length ? sorted : musicLibrary
  }, [recentTrackIds])
  const allCollections = useMemo(() => [...featuredCollections, ...customPlaylists], [customPlaylists])
  const selectedPlaylist = useMemo(
    () => allCollections.find((playlist) => playlist.id === selectedPlaylistId) || null,
    [allCollections, selectedPlaylistId],
  )
  const artistCatalog = useMemo(() => {
    const grouped = musicLibrary.reduce((groups, track) => {
      if (!groups[track.artist]) groups[track.artist] = []
      groups[track.artist].push(track)
      return groups
    }, {})
    return Object.entries(grouped)
      .map(([name, tracks]) => ({ name, tracks, artwork: tracks[0]?.artwork || 'from-emerald-400 via-teal-600 to-cyan-950' }))
      .sort((first, second) => first.name.localeCompare(second.name))
  }, [])
  const selectedArtistTracks = useMemo(
    () => musicLibrary.filter((track) => track.artist === selectedArtist),
    [selectedArtist],
  )

  useEffect(() => {
    try {
      localStorage.setItem(LIKED_TRACKS_KEY, JSON.stringify(likedTrackIds))
    } catch {
      // A private browsing context can disallow storage. Playback still works.
    }
  }, [likedTrackIds])

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_TRACKS_KEY, JSON.stringify(recentTrackIds))
    } catch {
      // A private browsing context can disallow storage. Playback still works.
    }
  }, [recentTrackIds])

  useEffect(() => {
    try {
      localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(customPlaylists))
    } catch {
      // A private browsing context can disallow storage. Playback still works.
    }
  }, [customPlaylists])

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    const track = musicLibrary.find((item) => item.id === currentTrackId)
    if (!audio || !track) return undefined

    audio.load()
    setCurrentTime(0)
    setDuration(0)
    if (isPlayingRef.current) {
      audio.play().catch(() => setIsPlaying(false))
    }
    setRecentTrackIds((current) => [track.id, ...current.filter((id) => id !== track.id)].slice(0, 12))
    return undefined
  }, [currentTrackId])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = volume
  }, [volume])

  const startTrack = (trackId, shouldPlay = true) => {
    if (!musicLibrary.some((track) => track.id === trackId)) return
    if (!queue.includes(trackId)) setQueue((current) => [...current, trackId])
    if (trackId === currentTrack?.id) {
      if (shouldPlay) audioRef.current?.play().catch(() => setIsPlaying(false))
      else audioRef.current?.pause()
      setIsPlaying(shouldPlay)
      return
    }
    setCurrentTrackId(trackId)
    setIsPlaying(shouldPlay)
  }

  const togglePlay = () => {
    if (!currentTrack) return
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
      return
    }
    audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }

  const playNext = () => {
    if (!queue.length || !currentTrack) return
    if (isShuffleOn && queue.length > 1) {
      const alternatives = queue.filter((id) => id !== currentTrack.id)
      startTrack(alternatives[Math.floor(Math.random() * alternatives.length)])
      return
    }
    const nextIndex = currentQueueIndex + 1
    if (nextIndex < queue.length) {
      startTrack(queue[nextIndex])
    } else if (repeatMode === 'all') {
      startTrack(queue[0])
    } else {
      setIsPlaying(false)
    }
  }

  const playPrevious = () => {
    if (!queue.length || !currentTrack) return
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0
      setCurrentTime(0)
      return
    }
    const previousIndex = currentQueueIndex - 1
    if (previousIndex >= 0) startTrack(queue[previousIndex])
    else if (repeatMode === 'all') startTrack(queue[queue.length - 1])
  }

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
      return
    }
    playNext()
  }

  const toggleLike = (trackId) => {
    setLikedTrackIds((current) => current.includes(trackId) ? current.filter((id) => id !== trackId) : [...current, trackId])
  }

  const addToQueue = (trackId) => {
    setQueue((current) => current.includes(trackId) ? current : [...current, trackId])
    setIsQueueOpen(true)
  }

  const openPlaylistPicker = (trackId) => {
    setTrackToAdd(trackId)
    setIsPlaylistPickerOpen(true)
  }

  const createPlaylist = (name) => {
    const trimmedName = name.trim()
    if (!trimmedName) return false
    const playlistId = `playlist-${Date.now()}`
    setCustomPlaylists((current) => [
      ...current,
      {
        id: playlistId,
        name: trimmedName,
        description: 'Your personal playlist.',
        trackIds: trackToAdd ? [trackToAdd] : [],
        artwork: PLAYLIST_ARTWORKS[current.length % PLAYLIST_ARTWORKS.length],
        isCustom: true,
      },
    ])
    setTrackToAdd(null)
    setSelectedPlaylistId(playlistId)
    setActiveView('playlist')
    return playlistId
  }

  const addTrackToPlaylist = (playlistId, trackId) => {
    setCustomPlaylists((current) => current.map((playlist) => {
      if (playlist.id !== playlistId || playlist.trackIds.includes(trackId)) return playlist
      return { ...playlist, trackIds: [...playlist.trackIds, trackId] }
    }))
    setIsPlaylistPickerOpen(false)
    setTrackToAdd(null)
  }

  const deletePlaylist = (playlistId) => {
    setCustomPlaylists((current) => current.filter((playlist) => playlist.id !== playlistId))
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistId(null)
      setActiveView('library')
    }
  }

  const removeTrackFromPlaylist = (playlistId, trackId) => {
    setCustomPlaylists((current) => current.map((playlist) => (
      playlist.id === playlistId
        ? { ...playlist, trackIds: playlist.trackIds.filter((id) => id !== trackId) }
        : playlist
    )))
  }

  const openPlaylist = (playlist) => {
    setSelectedPlaylistId(playlist.id)
    setActiveView('playlist')
  }

  const openArtist = (artist) => {
    setSelectedArtist(artist)
    setActiveView('artist')
  }

  const removeFromQueue = (trackId) => {
    if (trackId === currentTrack?.id) return
    setQueue((current) => current.filter((id) => id !== trackId))
  }

  const clearQueue = () => {
    setQueue(currentTrack ? [currentTrack.id] : [])
  }

  const playCollection = (collection) => {
    const playableIds = collection.trackIds.filter((id) => musicLibrary.some((track) => track.id === id))
    if (!playableIds.length) return
    setQueue(playableIds)
    setCurrentTrackId(playableIds[0])
    setIsPlaying(true)
  }

  const changeRepeatMode = () => {
    setRepeatMode((current) => current === 'off' ? 'all' : current === 'all' ? 'one' : 'off')
  }

  useEffect(() => {
    const handlePlayerCommand = (event) => {
      const command = event?.detail?.command
      if (command === 'toggle') togglePlay()
      if (command === 'next') playNext()
      if (command === 'previous') playPrevious()
    }
    window.addEventListener('pcc-player-command', handlePlayerCommand)
    return () => window.removeEventListener('pcc-player-command', handlePlayerCommand)
  })

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('pcc-player-state', {
      detail: {
        track: currentTrack ? {
          id: currentTrack.id,
          title: currentTrack.title,
          artist: currentTrack.artist,
          artwork: currentTrack.artwork,
        } : null,
        isPlaying,
        currentTime: playbackSecond,
        duration,
      },
    }))
  }, [currentTrack, duration, isPlaying, playbackSecond])

  const openSearch = () => {
    setActiveView('search')
    window.setTimeout(() => document.getElementById('soundroom-search')?.focus(), 0)
  }

  const viewTitle = activeView === 'home'
    ? 'Good to see you'
    : activeView === 'search'
      ? 'Search'
      : activeView === 'playlist'
        ? selectedPlaylist?.name || 'Playlist'
        : activeView === 'artist'
          ? selectedArtist || 'Artist'
        : 'Your Library'

  return (
    <main className={`pcc-soundroom min-h-[100dvh] bg-[#080909] pb-28 text-[#f7f7f7] ${isVisible ? '' : 'hidden'}`}>
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleTrackEnd}
      />

      <div className="flex min-h-[calc(100dvh-112px)]">
        <aside className="sticky top-0 hidden h-[calc(100dvh-112px)] w-[280px] shrink-0 flex-col bg-[#050505] p-3 md:flex">
          <div className="mb-6 flex items-center gap-2 px-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#62e6a9] text-[#07130e]">
              <SoundwaveMark compact />
            </div>
            <span className="font-display text-lg tracking-tight text-white">PCC Soundroom</span>
          </div>
          <nav className="space-y-1">
            <button type="button" onClick={() => setActiveView('home')} className={`flex w-full items-center gap-4 rounded-md px-3 py-3 text-sm font-bold transition ${activeView === 'home' ? 'bg-[#1f1f1f] text-white' : 'text-[#b3b3b3] hover:text-white'}`}><Icon name="home" /> Home</button>
            <button type="button" onClick={openSearch} className={`flex w-full items-center gap-4 rounded-md px-3 py-3 text-sm font-bold transition ${activeView === 'search' ? 'bg-[#1f1f1f] text-white' : 'text-[#b3b3b3] hover:text-white'}`}><Icon name="search" /> Search</button>
            <button type="button" onClick={() => setActiveView('library')} className={`flex w-full items-center gap-4 rounded-md px-3 py-3 text-sm font-bold transition ${activeView === 'library' ? 'bg-[#1f1f1f] text-white' : 'text-[#b3b3b3] hover:text-white'}`}><Icon name="library" /> Your Library</button>
          </nav>
          <div className="mt-5 border-t border-white/10 pt-4">
            <button type="button" onClick={() => setIsPlaylistModalOpen(true)} className="flex w-full items-center gap-4 rounded-md px-3 py-3 text-sm font-bold text-[#b3b3b3] transition hover:text-white"><span className="flex h-6 w-6 items-center justify-center rounded-sm bg-gradient-to-br from-violet-500 to-indigo-900"><Icon name="plus" className="h-4 w-4 text-white" /></span> Create playlist</button>
            <button type="button" onClick={() => setActiveView('library')} className="flex w-full items-center gap-4 rounded-md px-3 py-3 text-sm font-bold text-[#b3b3b3] transition hover:text-white"><span className="flex h-6 w-6 items-center justify-center rounded-sm bg-gradient-to-br from-violet-600 to-[#62e6a9]"><Icon name="heart" className="h-3.5 w-3.5 text-white" /></span> Liked Songs</button>
          </div>
          <div className="mt-3 min-h-0 flex-1 overflow-y-auto border-t border-white/10 pt-4">
            {allCollections.map((collection) => <button type="button" key={collection.id} onClick={() => openPlaylist(collection)} className="block w-full truncate px-3 py-2 text-left text-sm text-[#b3b3b3] transition hover:text-white">{collection.name}</button>)}
          </div>
          <button type="button" onClick={onExit} className="mt-3 flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-[#b3b3b3] transition hover:bg-white/5 hover:text-white"><Icon name="back" className="h-4 w-4" /> Return to PCC</button>
        </aside>

        <section className="min-w-0 flex-1 bg-[linear-gradient(180deg,#173b30_0%,#121a16_18%,#121212_44%,#121212_100%)]">
          <header className="sticky top-0 z-20 flex min-h-16 items-center gap-3 border-b border-white/5 bg-[#13251d]/85 px-4 py-3 backdrop-blur-lg sm:px-8">
            <div className="hidden items-center gap-2 lg:flex"><button type="button" aria-label="Back" className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"><Icon name="back" className="h-4 w-4" /></button><button type="button" aria-label="Forward" className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"><Icon name="forward" className="h-4 w-4" /></button></div>
            <button type="button" onClick={() => setActiveView('home')} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#62e6a9] text-[#07130e] md:hidden"><Icon name="music" className="h-4 w-4" /></button>
            <div className={`min-w-0 flex-1 ${activeView === 'search' ? '' : 'hidden sm:block'}`}>
              <label className="flex max-w-md items-center gap-3 rounded-full bg-white px-4 py-2 text-black shadow-sm"><Icon name="search" className="h-5 w-5 shrink-0" /><input id="soundroom-search" value={searchTerm} onFocus={() => setActiveView('search')} onChange={(event) => setSearchTerm(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-[#5d5d5d]" placeholder="What do you want to play?" /></label>
            </div>
            <button type="button" onClick={onExit} className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-black transition hover:scale-[1.03]">Exit music</button>
          </header>

          <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-5 sm:px-8 sm:pt-8">
            <div className="mb-5 flex items-center justify-between gap-3"><h1 className="text-2xl font-black tracking-tight sm:text-3xl">{viewTitle}</h1><button type="button" onClick={openSearch} className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-white sm:hidden">Search</button></div>

            {activeView === 'home' ? (
              <>
                <section className="relative overflow-hidden rounded-2xl border border-[#9af7c6]/15 bg-[linear-gradient(135deg,#255b46_0%,#15362b_52%,#121b17_100%)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:p-9">
                  <div className="pointer-events-none absolute -right-14 -top-24 h-80 w-80 rounded-full border-[34px] border-[#62e6a9]/10" />
                  <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full border-[46px] border-white/5" />
                  <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#62e6a9] text-[#07130e] shadow-[0_0_28px_rgba(98,230,169,0.3)]"><SoundwaveMark compact /></span><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a5f7c9]">PCC Soundroom</p></div>
                      <h2 className="mt-6 text-3xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl">Your workday,<br />your soundtrack.</h2>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#d0e9db] sm:text-base">Play what you love, save the songs that fit your flow, and make the space your own.</p>
                      <div className="mt-7 flex flex-wrap items-center gap-3"><PlayButton playing={isPlaying} onClick={togglePlay} label={isPlaying ? 'Pause music' : 'Play music'} /><div><p className="text-sm font-bold text-white">{currentTrack?.title || 'Choose a song'}</p><p className="mt-0.5 text-xs text-[#afd0bd]">{currentTrack?.artist || 'PCC Soundroom'}</p></div></div>
                    </div>
                    <div className="flex min-w-[190px] flex-col items-center rounded-2xl border border-white/10 bg-black/15 px-6 py-5 backdrop-blur-sm"><SoundwaveMark /><p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9af7c6]">In your flow</p><p className="mt-1 text-xs text-[#cde8d8]">{musicLibrary.length} song{musicLibrary.length === 1 ? '' : 's'} in your library</p></div>
                  </div>
                </section>
                {customPlaylists.length ? <section className="mt-8 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {customPlaylists.map((collection) => (
                    <button type="button" key={collection.id} onClick={() => playCollection(collection)} className="group flex min-w-0 items-center overflow-hidden rounded-md bg-white/10 text-left transition hover:bg-white/20">
                      <Artwork item={collection} className="h-14 w-14 shrink-0 shadow-lg sm:h-20 sm:w-20" />
                      <span className="min-w-0 flex-1 truncate px-3 text-sm font-bold">{collection.name}</span>
                      <span className="mr-4 hidden h-10 w-10 items-center justify-center rounded-full bg-[#62e6a9] text-[#07130e] opacity-0 shadow-[0_8px_22px_rgba(98,230,169,0.28)] transition group-hover:opacity-100 sm:flex"><Icon name="play" className="h-4 w-4" /></span>
                    </button>
                  ))}
                </section> : null}
                <TrackSection title="Recently played" subtitle="Pick up where you left off" tracks={recentTracks} currentTrackId={currentTrack?.id} isPlaying={isPlaying} onPlay={startTrack} onLike={toggleLike} likedTrackIds={likedTrackIds} />
                <ArtistSection artists={artistCatalog} onOpenArtist={openArtist} />
                <TrackSection title="Your music" subtitle="Everything you have added so far" tracks={musicLibrary} currentTrackId={currentTrack?.id} isPlaying={isPlaying} onPlay={startTrack} onLike={toggleLike} likedTrackIds={likedTrackIds} />
              </>
            ) : null}

            {activeView === 'search' ? (
              <section>
                <p className="mb-5 text-sm text-[#b3b3b3]">{searchTerm ? `${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for “${searchTerm}”` : 'Browse the songs in your personal catalog.'}</p>
                <TrackList tracks={searchResults} currentTrackId={currentTrack?.id} isPlaying={isPlaying} likedTrackIds={likedTrackIds} onPlay={startTrack} onLike={toggleLike} onQueue={addToQueue} onAddToPlaylist={openPlaylistPicker} emptyMessage="No tracks match that search yet." />
              </section>
            ) : null}

            {activeView === 'library' ? (
              <section className="space-y-9">
                <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-black">Your playlists</h2><p className="mt-1 text-sm text-[#b3b3b3]">Create mixes and add any song you like.</p></div><button type="button" onClick={() => setIsPlaylistModalOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-black transition hover:scale-[1.02]"><Icon name="plus" className="h-4 w-4" /> Create playlist</button></div>
                {customPlaylists.length ? <CollectionSection collections={customPlaylists} isPlaying={isPlaying} currentQueue={queue} onPlay={playCollection} onOpen={openPlaylist} onDelete={deletePlaylist} /> : <div className="rounded-md border border-dashed border-white/15 px-5 py-9 text-center text-sm text-[#b3b3b3]">Your playlists will appear here. Create one, then add songs from the list below.</div>}
                <div><h2 className="mb-4 text-xl font-black">Liked Songs <span className="text-sm font-normal text-[#b3b3b3]">{likedTracks.length}</span></h2><TrackList tracks={likedTracks} currentTrackId={currentTrack?.id} isPlaying={isPlaying} likedTrackIds={likedTrackIds} onPlay={startTrack} onLike={toggleLike} onQueue={addToQueue} onAddToPlaylist={openPlaylistPicker} emptyMessage="Tap the heart beside a song to save it here." /></div>
                <div><h2 className="mb-4 text-xl font-black">All songs</h2><TrackList tracks={musicLibrary} currentTrackId={currentTrack?.id} isPlaying={isPlaying} likedTrackIds={likedTrackIds} onPlay={startTrack} onLike={toggleLike} onQueue={addToQueue} onAddToPlaylist={openPlaylistPicker} emptyMessage="Add your first song to musicLibrary.js." /></div>
                <div><h2 className="mb-4 text-xl font-black">Artists</h2><ArtistSection artists={artistCatalog} onOpenArtist={openArtist} /></div>
              </section>
            ) : null}

            {activeView === 'playlist' && selectedPlaylist ? (
              <PlaylistDetail
                playlist={selectedPlaylist}
                tracks={selectedPlaylist.trackIds.map((id) => musicLibrary.find((track) => track.id === id)).filter(Boolean)}
                isPlaying={isPlaying}
                currentTrackId={currentTrack?.id}
                likedTrackIds={likedTrackIds}
                onBack={() => setActiveView('library')}
                onPlay={() => playCollection(selectedPlaylist)}
                onPlayTrack={startTrack}
                onLike={toggleLike}
                onQueue={addToQueue}
                onAddToPlaylist={openPlaylistPicker}
                onRemove={selectedPlaylist.isCustom ? (trackId) => removeTrackFromPlaylist(selectedPlaylist.id, trackId) : null}
                onDelete={selectedPlaylist.isCustom ? () => deletePlaylist(selectedPlaylist.id) : null}
              />
            ) : null}

            {activeView === 'artist' && selectedArtist ? (
              <ArtistDetail
                artist={selectedArtist}
                tracks={selectedArtistTracks}
                currentTrackId={currentTrack?.id}
                isPlaying={isPlaying}
                likedTrackIds={likedTrackIds}
                onBack={() => setActiveView('library')}
                onPlay={() => {
                  setQueue(selectedArtistTracks.map((track) => track.id))
                  startTrack(selectedArtistTracks[0]?.id)
                }}
                onPlayTrack={startTrack}
                onLike={toggleLike}
                onQueue={addToQueue}
                onAddToPlaylist={openPlaylistPicker}
              />
            ) : null}
          </div>
        </section>
      </div>

      {isQueueOpen ? <QueuePanel queue={queue} currentTrackId={currentTrack?.id} onClose={() => setIsQueueOpen(false)} onPlay={startTrack} onRemove={removeFromQueue} onClear={clearQueue} /> : null}
      {isPlaylistModalOpen ? <PlaylistModal onClose={() => setIsPlaylistModalOpen(false)} onCreate={createPlaylist} /> : null}
      {isPlaylistPickerOpen ? <PlaylistPicker trackId={trackToAdd} playlists={customPlaylists} onClose={() => { setIsPlaylistPickerOpen(false); setTrackToAdd(null) }} onAdd={addTrackToPlaylist} onCreate={() => { setIsPlaylistPickerOpen(false); setIsPlaylistModalOpen(true) }} /> : null}
      <PlayerBar track={currentTrack} isPlaying={isPlaying} currentTime={currentTime} duration={duration} volume={volume} isShuffleOn={isShuffleOn} repeatMode={repeatMode} liked={likedTrackIds.includes(currentTrack?.id)} onTogglePlay={togglePlay} onPrevious={playPrevious} onNext={playNext} onShuffle={() => setIsShuffleOn((current) => !current)} onRepeat={changeRepeatMode} onLike={() => currentTrack && toggleLike(currentTrack.id)} onSeek={(event) => { const time = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = time; setCurrentTime(time) }} onVolume={(event) => setVolume(Number(event.target.value))} onQueue={() => setIsQueueOpen(true)} />
    </main>
  )
}

function TrackSection({ title, subtitle, tracks, currentTrackId, isPlaying, onPlay, onLike, likedTrackIds }) {
  return <section className="mt-10"><div className="mb-4 flex items-end justify-between"><div><h2 className="text-xl font-black tracking-tight sm:text-2xl">{title}</h2>{subtitle ? <p className="mt-1 text-sm text-[#b3b3b3]">{subtitle}</p> : null}</div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{tracks.map((track) => <TrackCard key={track.id} track={track} currentTrackId={currentTrackId} isPlaying={isPlaying} onPlay={onPlay} onLike={onLike} liked={likedTrackIds.includes(track.id)} />)}</div></section>
}

function TrackCard({ track, currentTrackId, isPlaying, onPlay, onLike, liked }) {
  const active = currentTrackId === track.id
  return <article className="group relative min-w-0 rounded-md bg-[#181818] p-4 transition hover:bg-[#282828]"><div className="relative aspect-square overflow-hidden rounded-sm shadow-lg"><Artwork item={track} /><span className="absolute bottom-2 right-2 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><PlayButton small playing={active && isPlaying} onClick={() => active ? onPlay(track.id, !isPlaying) : onPlay(track.id)} label={`${active && isPlaying ? 'Pause' : 'Play'} ${track.title}`} /></span></div><div className="mt-4 flex items-start gap-2"><div className="min-w-0 flex-1"><h3 className={`truncate text-sm font-bold ${active ? 'text-[#62e6a9]' : 'text-white'}`}>{track.title}</h3><p className="mt-1 truncate text-sm text-[#b3b3b3]">{track.artist}</p></div><button type="button" onClick={() => onLike(track.id)} aria-label={liked ? `Remove ${track.title} from Liked Songs` : `Like ${track.title}`} className={`mt-0.5 transition hover:scale-110 ${liked ? 'text-[#62e6a9]' : 'text-[#a7a7a7] opacity-0 group-hover:opacity-100'}`}><Icon name="heart" className="h-4 w-4" /></button></div></article>
}

function ArtistSection({ artists, onOpenArtist }) {
  return <section className="mt-10"><div className="mb-4"><h2 className="text-xl font-black tracking-tight sm:text-2xl">Artists</h2><p className="mt-1 text-sm text-[#b3b3b3]">Browse your collection by artist.</p></div><div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">{artists.map((artist) => <button type="button" key={artist.name} onClick={() => onOpenArtist(artist.name)} className="group rounded-md bg-[#181818] p-4 text-left transition hover:bg-[#282828]"><div className="relative aspect-square overflow-hidden rounded-full shadow-lg"><Artwork item={artist} /></div><p className="mt-4 truncate text-sm font-bold text-white">{artist.name}</p><p className="mt-1 text-xs text-[#b3b3b3]">Artist · {artist.tracks.length} songs</p></button>)}</div></section>
}

function CollectionSection({ title, collections, isPlaying, currentQueue, onPlay, onOpen, onDelete }) {
  return <section className={title ? 'mt-10' : ''}>{title ? <h2 className="mb-4 text-xl font-black tracking-tight sm:text-2xl">{title}</h2> : null}<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{collections.map((collection) => <article key={collection.id} className="group relative rounded-md bg-[#181818] p-4 transition hover:bg-[#282828]">{onDelete && collection.isCustom ? <button type="button" onClick={() => onDelete(collection.id)} aria-label={`Delete ${collection.name}`} className="absolute right-3 top-3 z-10 rounded-full bg-black/55 p-1.5 text-white opacity-0 transition hover:bg-red-500 group-hover:opacity-100"><Icon name="close" className="h-3.5 w-3.5" /></button> : null}<button type="button" onClick={() => onOpen?.(collection)} className="block w-full text-left"><div className="relative aspect-square overflow-hidden rounded-sm shadow-lg"><Artwork item={collection} /></div><h3 className="mt-4 truncate text-sm font-bold">{collection.name}</h3><p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-[#b3b3b3]">{collection.isCustom ? `${collection.trackIds.length} song${collection.trackIds.length === 1 ? '' : 's'}` : collection.description}</p></button><span className="absolute bottom-14 right-6 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><PlayButton small playing={isPlaying && currentQueue.join(',') === collection.trackIds.join(',')} onClick={() => onPlay(collection)} label={`Play ${collection.name}`} /></span></article>)}</div></section>
}

function TrackList({ tracks, currentTrackId, isPlaying, likedTrackIds, onPlay, onLike, onQueue, onAddToPlaylist, emptyMessage }) {
  if (!tracks.length) return <div className="rounded-md border border-dashed border-white/15 px-5 py-10 text-center text-sm text-[#b3b3b3]">{emptyMessage}</div>
  return <div className="overflow-hidden rounded-md border border-white/10 bg-[#181818]"><div className="hidden grid-cols-[32px_minmax(180px,1.5fr)_minmax(130px,1fr)_70px_32px] gap-3 border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.1em] text-[#b3b3b3] md:grid"><span>#</span><span>Title</span><span>Album</span><span>Time</span><span /></div>{tracks.map((track, index) => { const active = currentTrackId === track.id; return <div key={track.id} className={`group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 transition hover:bg-white/10 md:grid-cols-[32px_minmax(180px,1.5fr)_minmax(130px,1fr)_70px_32px] md:px-4 ${active ? 'bg-white/10' : ''}`}><button type="button" onClick={() => active ? onPlay(track.id, !isPlaying) : onPlay(track.id)} className={`w-7 text-center text-sm ${active ? 'text-[#62e6a9]' : 'text-[#b3b3b3]'}`} aria-label={`Play ${track.title}`}>{active && isPlaying ? <Icon name="pause" className="mx-auto h-3.5 w-3.5" /> : <><span className="group-hover:hidden">{index + 1}</span><Icon name="play" className="mx-auto hidden h-3.5 w-3.5 group-hover:block" /></>}</button><div className="flex min-w-0 items-center gap-3"><Artwork item={track} className="h-10 w-10 shrink-0 rounded-sm" /><div className="min-w-0"><p className={`truncate text-sm font-medium ${active ? 'text-[#62e6a9]' : 'text-white'}`}>{track.title}</p><p className="truncate text-xs text-[#b3b3b3] md:hidden">{track.artist}</p><p className="hidden truncate text-xs text-[#b3b3b3] md:block">{track.artist}</p></div></div><p className="hidden truncate text-sm text-[#b3b3b3] md:block">{track.album}</p><p className="hidden text-right text-sm text-[#b3b3b3] md:block">{track.duration}</p><div className="flex items-center gap-2"><button type="button" onClick={() => onLike(track.id)} aria-label={likedTrackIds.includes(track.id) ? `Remove ${track.title} from Liked Songs` : `Like ${track.title}`} className={likedTrackIds.includes(track.id) ? 'text-[#62e6a9]' : 'text-[#b3b3b3] opacity-0 transition group-hover:opacity-100'}><Icon name="heart" className="h-4 w-4" /></button><button type="button" onClick={() => onAddToPlaylist(track.id)} aria-label={`Add ${track.title} to a playlist`} className="text-[#b3b3b3] opacity-0 transition hover:text-white group-hover:opacity-100"><Icon name="plus" className="h-4 w-4" /></button><button type="button" onClick={() => onQueue(track.id)} aria-label={`Add ${track.title} to queue`} className="text-[#b3b3b3] opacity-0 transition hover:text-white group-hover:opacity-100"><Icon name="more" className="h-5 w-5" /></button></div></div>})}</div>
}

function QueuePanel({ queue, currentTrackId, onClose, onPlay, onRemove, onClear }) {
  const tracks = queue.map((id) => musicLibrary.find((track) => track.id === id)).filter(Boolean)
  return <aside className="fixed inset-y-0 right-0 z-40 w-full max-w-sm border-l border-white/10 bg-[#181818] p-5 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-lg font-black">Queue</h2><button type="button" onClick={onClose} aria-label="Close queue" className="rounded-full p-2 text-[#b3b3b3] hover:bg-white/10 hover:text-white"><Icon name="close" /></button></div><div className="mt-1 flex items-center justify-between gap-3"><p className="text-sm text-[#b3b3b3]">Up next</p><button type="button" onClick={onClear} className="text-xs font-bold text-[#b3b3b3] hover:text-white">Clear queue</button></div><div className="mt-5 space-y-2">{tracks.map((track) => <div key={track.id} className={`flex items-center gap-2 rounded-md p-2 transition hover:bg-white/10 ${currentTrackId === track.id ? 'bg-white/10' : ''}`}><button type="button" onClick={() => { onPlay(track.id); onClose() }} className="flex min-w-0 flex-1 items-center gap-3 text-left"><Artwork item={track} className="h-11 w-11 shrink-0 rounded-sm" /><span className="min-w-0"><span className={`block truncate text-sm font-semibold ${currentTrackId === track.id ? 'text-[#62e6a9]' : 'text-white'}`}>{track.title}</span><span className="block truncate text-xs text-[#b3b3b3]">{track.artist}</span></span></button>{currentTrackId === track.id ? <span className="px-2 text-xs font-bold text-[#62e6a9]">Playing</span> : <button type="button" onClick={() => onRemove(track.id)} aria-label={`Remove ${track.title} from queue`} className="rounded-full p-1.5 text-[#b3b3b3] hover:bg-white/10 hover:text-white"><Icon name="close" className="h-4 w-4" /></button>}</div>)}</div></aside>
}

function PlaylistDetail({ playlist, tracks, isPlaying, currentTrackId, likedTrackIds, onBack, onPlay, onPlayTrack, onLike, onQueue, onAddToPlaylist, onRemove, onDelete }) {
  return <section><button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#b3b3b3] transition hover:text-white"><Icon name="back" className="h-4 w-4" /> Your Library</button><div className="flex flex-col gap-6 bg-gradient-to-b from-white/15 to-transparent p-5 sm:flex-row sm:items-end sm:p-8"><Artwork item={playlist} className="h-40 w-40 shrink-0 rounded-sm shadow-2xl sm:h-52 sm:w-52" /><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.12em]">{playlist.isCustom ? 'Playlist' : 'PCC playlist'}</p><h2 className="mt-2 truncate text-3xl font-black tracking-tight sm:text-5xl">{playlist.name}</h2><p className="mt-3 text-sm text-[#d3d3d3]">{playlist.description}</p><p className="mt-2 text-sm font-semibold text-[#b3b3b3]">PCC Soundroom · {tracks.length} song{tracks.length === 1 ? '' : 's'}</p></div></div><div className="mt-6 flex items-center gap-4"><PlayButton playing={isPlaying && currentTrackId === tracks[0]?.id} onClick={onPlay} label={`Play ${playlist.name}`} />{onDelete ? <button type="button" onClick={onDelete} className="rounded-full border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-red-400 hover:text-red-300">Delete playlist</button> : null}</div><div className="mt-7"><TrackList tracks={tracks} currentTrackId={currentTrackId} isPlaying={isPlaying} likedTrackIds={likedTrackIds} onPlay={onPlayTrack} onLike={onLike} onQueue={onQueue} onAddToPlaylist={onAddToPlaylist} emptyMessage="This playlist has no songs yet. Add songs from All songs in Your Library." />{onRemove ? <div className="mt-3 space-y-2">{tracks.map((track) => <button type="button" key={track.id} onClick={() => onRemove(track.id)} className="text-xs font-bold text-[#b3b3b3] transition hover:text-red-300">Remove {track.title} from this playlist</button>)}</div> : null}</div></section>
}

function ArtistDetail({ artist, tracks, currentTrackId, isPlaying, likedTrackIds, onBack, onPlay, onPlayTrack, onLike, onQueue, onAddToPlaylist }) {
  const artwork = tracks[0]?.artwork || 'from-emerald-400 via-teal-600 to-cyan-950'
  return <section><button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#b3b3b3] transition hover:text-white"><Icon name="back" className="h-4 w-4" /> Your Library</button><div className="flex flex-col gap-6 bg-gradient-to-b from-white/15 to-transparent p-5 sm:flex-row sm:items-end sm:p-8"><Artwork item={{ artwork }} className="h-40 w-40 shrink-0 rounded-full shadow-2xl sm:h-52 sm:w-52" /><div><p className="text-xs font-bold uppercase tracking-[0.12em]">Artist</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">{artist}</h2><p className="mt-3 text-sm text-[#d3d3d3]">{tracks.length} song{tracks.length === 1 ? '' : 's'} in your PCC Soundroom library.</p></div></div><div className="mt-6"><PlayButton playing={isPlaying && currentTrackId === tracks[0]?.id} onClick={onPlay} label={`Play ${artist}`} /></div><div className="mt-7"><TrackList tracks={tracks} currentTrackId={currentTrackId} isPlaying={isPlaying} likedTrackIds={likedTrackIds} onPlay={onPlayTrack} onLike={onLike} onQueue={onQueue} onAddToPlaylist={onAddToPlaylist} emptyMessage="No songs for this artist yet." /></div></section>
}

function PlaylistModal({ onClose, onCreate }) {
  const [name, setName] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    if (onCreate(name)) onClose()
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="playlist-modal-title"><form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-[#282828] p-6 shadow-2xl"><div className="flex items-center justify-between gap-4"><h2 id="playlist-modal-title" className="text-xl font-black">Create playlist</h2><button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-[#b3b3b3] hover:bg-white/10 hover:text-white"><Icon name="close" /></button></div><label className="mt-6 block text-sm font-semibold" htmlFor="playlist-name">Playlist name</label><input id="playlist-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} maxLength="60" className="mt-2 w-full rounded-md border border-white/15 bg-[#121212] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#62e6a9]" placeholder="My playlist" /><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm font-bold text-white hover:bg-white/10">Cancel</button><button type="submit" disabled={!name.trim()} className="rounded-full bg-[#62e6a9] px-5 py-2 text-sm font-extrabold text-[#07130e] disabled:cursor-not-allowed disabled:opacity-45">Create</button></div></form></div>
}

function PlaylistPicker({ trackId, playlists, onClose, onAdd, onCreate }) {
  const track = musicLibrary.find((item) => item.id === trackId)
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="playlist-picker-title"><section className="w-full max-w-md rounded-xl bg-[#282828] p-6 shadow-2xl"><div className="flex items-center justify-between gap-4"><div><h2 id="playlist-picker-title" className="text-xl font-black">Add to playlist</h2><p className="mt-1 truncate text-sm text-[#b3b3b3]">{track?.title || 'Selected song'}</p></div><button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-[#b3b3b3] hover:bg-white/10 hover:text-white"><Icon name="close" /></button></div>{playlists.length ? <div className="mt-5 max-h-64 space-y-2 overflow-y-auto">{playlists.map((playlist) => { const alreadyAdded = playlist.trackIds.includes(trackId); return <button type="button" key={playlist.id} disabled={alreadyAdded} onClick={() => onAdd(playlist.id, trackId)} className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left transition hover:bg-white/10 disabled:cursor-default disabled:opacity-55"><span className="truncate text-sm font-semibold text-white">{playlist.name}</span><span className={alreadyAdded ? 'text-xs font-bold text-[#62e6a9]' : 'text-xs font-bold text-[#b3b3b3]'}>{alreadyAdded ? 'Added' : 'Add'}</span></button>})}</div> : <p className="mt-5 rounded-md border border-dashed border-white/15 px-4 py-6 text-center text-sm text-[#b3b3b3]">Create a playlist first, then you can add this song.</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm font-bold text-white hover:bg-white/10">Cancel</button><button type="button" onClick={onCreate} className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-black">New playlist</button></div></section></div>
}

function PlayerBar({ track, isPlaying, currentTime, duration, volume, isShuffleOn, repeatMode, liked, onTogglePlay, onPrevious, onNext, onShuffle, onRepeat, onLike, onSeek, onVolume, onQueue }) {
  if (!track) return null
  const safeDuration = Number.isFinite(duration) ? duration : 0
  const progressStyle = { '--range-progress': `${safeDuration ? (Math.min(currentTime, safeDuration) / safeDuration) * 100 : 0}%` }
  const volumeStyle = { '--range-progress': `${volume * 100}%` }
  return <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#181818] px-3 py-3 sm:px-5"><div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 lg:grid-cols-[minmax(260px,1fr)_minmax(320px,1.4fr)_minmax(260px,1fr)]"><div className="flex min-w-0 items-center gap-3"><Artwork item={track} className="h-12 w-12 shrink-0 rounded-sm" /><div className="min-w-0"><p className="truncate text-sm font-bold text-white">{track.title}</p><p className="truncate text-xs text-[#b3b3b3]">{track.artist}</p></div><button type="button" onClick={onLike} aria-label={liked ? 'Remove from Liked Songs' : 'Add to Liked Songs'} className={liked ? 'text-[#62e6a9]' : 'text-[#b3b3b3] hover:text-white'}><Icon name="heart" className="h-4 w-4" /></button></div><div className="hidden min-w-0 flex-col items-center gap-1.5 lg:flex"><div className="flex items-center gap-5"><button type="button" onClick={onShuffle} aria-label="Toggle shuffle" className={isShuffleOn ? 'text-[#62e6a9]' : 'text-[#b3b3b3] hover:text-white'}><Icon name="shuffle" className="h-4 w-4" /></button><button type="button" onClick={onPrevious} aria-label="Previous song" className="text-[#b3b3b3] hover:text-white"><Icon name="previous" className="h-5 w-5" /></button><PlayButton small playing={isPlaying} onClick={onTogglePlay} label={isPlaying ? 'Pause' : 'Play'} /><button type="button" onClick={onNext} aria-label="Next song" className="text-[#b3b3b3] hover:text-white"><Icon name="next" className="h-5 w-5" /></button><button type="button" onClick={onRepeat} aria-label="Change repeat mode" className={`relative ${repeatMode !== 'off' ? 'text-[#62e6a9]' : 'text-[#b3b3b3] hover:text-white'}`}><Icon name="repeat" className="h-4 w-4" />{repeatMode === 'one' ? <span className="absolute -right-1 -top-2 text-[9px] font-black">1</span> : null}</button></div><div className="flex w-full items-center gap-2 text-[10px] tabular-nums text-[#b3b3b3]"><span>{formatTime(currentTime)}</span><input type="range" min="0" max={safeDuration} step="0.1" value={Math.min(currentTime, safeDuration)} onChange={onSeek} aria-label="Song progress" className="soundroom-range h-1 w-full cursor-pointer" style={progressStyle} /><span>{formatTime(safeDuration)}</span></div></div><div className="flex items-center justify-end gap-3"><div className="flex items-center gap-2"><button type="button" onClick={onPrevious} aria-label="Previous song" className="text-[#b3b3b3] hover:text-white lg:hidden"><Icon name="previous" className="h-5 w-5" /></button><PlayButton small playing={isPlaying} onClick={onTogglePlay} label={isPlaying ? 'Pause' : 'Play'} /><button type="button" onClick={onNext} aria-label="Next song" className="text-[#b3b3b3] hover:text-white lg:hidden"><Icon name="next" className="h-5 w-5" /></button></div><div className="hidden items-center gap-2 xl:flex"><Icon name="volume" className="h-4 w-4 text-[#b3b3b3]" /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={onVolume} aria-label="Volume" className="soundroom-range h-1 w-24 cursor-pointer" style={volumeStyle} /></div><button type="button" onClick={onQueue} aria-label="Open queue" className="text-[#b3b3b3] hover:text-white"><Icon name="queue" className="h-5 w-5" /></button></div></div></footer>
}

export default MusicPage
