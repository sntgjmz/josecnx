const wilbertRossArtwork = 'from-blue-950 via-slate-900 to-zinc-950'

// Map album names to their corresponding cover image paths using your exact filenames.
const wilbertRossAlbumCovers = {
  'Aking Musika': '/covers/wilbertross-akinmusika-album.png', 
  'Lampara': '/covers/wilbertross-lampara-album.png',
  'Sasabihin Ko Na': '/covers/wilbertross-sasabihinkona-album.png', 
  'Singles': '/covers/wilbertross-singles-album.png', 
};

const wilbertRossTracks = [
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "'Di Ko Alam",
    "src": "/Wilbert Ross/Aking Musika/'Di Ko Alam_spotdown.org.mp3",
    "duration": "3:40"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "Dulo Ng Pahina",
    "src": "/Wilbert Ross/Aking Musika/Dulo Ng Pahina_spotdown.org.mp3",
    "duration": "4:15"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "Ginintuang Tanawin",
    "src": "/Wilbert Ross/Aking Musika/Ginintuang Tanawin_spotdown.org.mp3",
    "duration": "4:20"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "LANGGA",
    "src": "/Wilbert Ross/Aking Musika/LANGGA_spotdown.org.mp3",
    "duration": "3:30"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "Makaluma",
    "src": "/Wilbert Ross/Aking Musika/Makaluma.mp3",
    "duration": "3:50"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "Maliwanag Mong Mundo",
    "src": "/Wilbert Ross/Aking Musika/Maliwanag Mong Mundo_spotdown.org.mp3",
    "duration": "4:05"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "Nakangiti",
    "src": "/Wilbert Ross/Aking Musika/Nakangiti_spotdown.org.mp3",
    "duration": "3:55"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "Sa Liwanag Ng Buwan",
    "src": "/Wilbert Ross/Aking Musika/Sa Liwanag Ng Buwan_spotdown.org.mp3",
    "duration": "4:10"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Aking Musika",
    "title": "Sasabihin Ko Na",
    "src": "/Wilbert Ross/Aking Musika/Sasabihin Ko Na_spotdown.org.mp3",
    "duration": "3:45"
  },

  // --- Lampara (Multi-track Album) ---
  {
    "artist": "Wilbert Ross",
    "album": "Lampara",
    "title": "Andito Lang Ako",
    "src": "/Wilbert Ross/Lampara/Andito Lang Ako.mp3",
    "duration": "4:00"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Lampara",
    "title": "Benteng Ukit",
    "src": "/Wilbert Ross/Lampara/Benteng Ukit.mp3",
    "duration": "3:45"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Lampara",
    "title": "Byahe Ng Buhay",
    "src": "/Wilbert Ross/Lampara/Byahe Ng Buhay_spotdown.org.mp3",
    "duration": "4:15"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Lampara",
    "title": "Dramatic Actor",
    "src": "/Wilbert Ross/Lampara/Dramatic Actor.mp3",
    "duration": "3:30"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Lampara",
    "title": "Handa Ako",
    "src": "/Wilbert Ross/Lampara/Handa Ako.mp3",
    "duration": "3:50"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Lampara",
    "title": "Nakangiti",
    "src": "/Wilbert Ross/Lampara/Nakangiti_spotdown.org.mp3",
    "duration": "3:55"
  },

  // --- Sasabihin Ko Na (Multi-track Album) ---
  {
    "artist": "Wilbert Ross",
    "album": "Sasabihin Ko Na",
    "title": "Sasabihin Ko Na - Acoustic Version",
    "src": "/Wilbert Ross/Sasabihin Ko Na/Sasabihin Ko Na - Acoustic Version.mp3",
    "duration": "3:50"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Sasabihin Ko Na",
    "title": "Sasabihin Ko Na",
    "src": "/Wilbert Ross/Sasabihin Ko Na/Sasabihin Ko Na.mp3",
    "duration": "3:45"
  },

  // --- Singles (Compressed Single-Song Releases) ---
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "'Di Ko Alam",
    "src": "/Wilbert Ross/'Di Ko Alam/'Di Ko Alam_spotdown.org.mp3",
    "duration": "3:40"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Andito Lang Ako",
    "src": "/Wilbert Ross/Andito Lang Ako/Andito Lang Ako_spotdown.org.mp3",
    "duration": "4:00"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Avianna",
    "src": "/Wilbert Ross/Avianna/Avianna_spotdown.org.mp3",
    "duration": "3:35"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Crush Kong Curly",
    "src": "/Wilbert Ross/Crush Kong Curly/Crush Kong Curly_spotdown.org.mp3",
    "duration": "3:20"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Di Na Umabot",
    "src": "/Wilbert Ross/Di Na Umabot/Di Na Umabot.mp3",
    "duration": "4:10"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Ginintuang Tanawin",
    "src": "/Wilbert Ross/Ginintuang Tanawin/Ginintuang Tanawin_spotdown.org.mp3",
    "duration": "4:20"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Ikaw Ang Musika",
    "src": "/Wilbert Ross/Ikaw Ang Musika/Ikaw Ang Musika_spotdown.org.mp3",
    "duration": "3:50"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Isa Isa Lang Kase",
    "src": "/Wilbert Ross/Isa Isa Lang Kase/Isa Isa Lang Kase.mp3",
    "duration": "3:25"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Kung Siya Man",
    "src": "/Wilbert Ross/Kung Siya Man/Kung Siya Man.mp3",
    "duration": "4:05"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "LANGGA",
    "src": "/Wilbert Ross/LANGGA/LANGGA_spotdown.org.mp3",
    "duration": "3:30"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Lil Things",
    "src": "/Wilbert Ross/Lil Things/Wilbert Ross - Lil Things (SPOTISAVER).mp3",
    "duration": "3:15"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Maaari Ba",
    "src": "/Wilbert Ross/Maaari Ba/Maaari Ba.mp3",
    "duration": "3:50"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Nakangiti",
    "src": "/Wilbert Ross/Nakangiti/Nakangiti_spotdown.org.mp3",
    "duration": "3:55"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Oh Jusko",
    "src": "/Wilbert Ross/Oh Jusko/Oh Jusko.mp4",
    "duration": "3:40"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Paggising Kong Muli",
    "src": "/Wilbert Ross/Paggising Kong Muli/Paggising Kong Muli.mp3",
    "duration": "4:00"
  },
  {
    "artist": "Wilbert Ross",
    "album": "Singles",
    "title": "Paruparo",
    "src": "/Wilbert Ross/Paruparo/Wilbert Ross - Paruparo (SPOTISAVER).mp3",
    "duration": "3:25"
  }
];

export const wilbertRossLibraryTracks = wilbertRossTracks.map((track, index) => ({
  id: `wilbert-ross-${index}-${track.src.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
  ...track,
  artwork: wilbertRossArtwork,
  artworkSrc: wilbertRossAlbumCovers[track.album],
  mood: 'Wilbert Ross collection',
}));