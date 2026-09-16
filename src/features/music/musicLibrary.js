import { artistLibraryTracks } from './artistLibrary.js'
import { jojiLibraryTracks } from './jojiLibrary.js'
import { lanyLibraryTracks } from './lanyLibrary.js'
import { szaLibraryTracks } from './szaLibrary.js'
import { taylorSwiftLibraryTracks } from './taylorSwiftLibrary.js'

// Catalog index: every entry below comes from an artist folder in public/.
export const musicLibrary = [
  ...artistLibraryTracks,
  ...jojiLibraryTracks,
  ...lanyLibraryTracks,
  ...taylorSwiftLibraryTracks,
  ...szaLibraryTracks,
]

export const featuredCollections = []
