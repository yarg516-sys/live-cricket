# GlobalSports Live — Worldwide Live Matches, Scores & Streaming

A clean, minimalist, responsive, and user-friendly web application for watching and tracking live sports matches from across the globe.

---

## 📁 Complete Folder & File Structure

```text
sports web/
│
├── index.html              # Main Application (Matches, Live Streams & Blank News tab)
├── news.html               # Standalone News page (Clean blank placeholder)
├── README.md               # Documentation and setup instructions
│
├── css/
│   ├── style.css           # Global design system, colors, card layouts & animations
│   ├── player.css          # Live streaming video player modal, controls & sidebar
│   └── responsive.css      # Responsive media queries (mobile, tablet, desktop)
│
├── js/
│   ├── data.js             # Matches database (Clean, ready for manual match entries)
│   ├── liveEngine.js       # Real-time score ticker tape and synchronization
│   ├── player.js           # Video player controller, broadcast simulation & fan chat
│   └── app.js              # Main app controller, filtering, search & view routing
│
└── assets/
    └── icons/              # Local icons and graphical assets
```

---

## ✍️ How to Manually Add Matches

To add your own live, upcoming, or finished matches, open `js/data.js` and add match objects to the `SPORTS_DATA` array:

```javascript
const SPORTS_DATA = [
  {
    id: 'match-01',
    sport: 'football', // Options: 'football', 'cricket', 'basketball', 'tennis', 'formula1', 'other'
    sportLabel: 'Football',
    sportIcon: '⚽',
    league: 'UEFA Champions League',
    region: 'Europe',
    status: 'live', // Options: 'live', 'upcoming', 'finished'
    matchTime: '72\'',
    timeDisplay: 'LIVE 72\'',
    venue: 'Wembley Stadium, London',
    team1: {
      name: 'Real Madrid',
      short: 'RMA',
      flag: '🇪🇸',
      score: 2,
      detail: 'Vinícius Jr 34\', Bellingham 62\''
    },
    team2: {
      name: 'Manchester City',
      short: 'MCI',
      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      score: 1,
      detail: 'Haaland 21\''
    },
    stats: {
      possession: ['52%', '48%'],
      shotsOnTarget: ['6', '4'],
      fouls: ['8', '11']
    },
    commentary: [
      { minute: '72\'', text: 'Corner kick awarded to Real Madrid.' }
    ],
    streams: [
      { id: 's1', name: 'Server 1 - 4K Ultra HD', quality: '4K / 60fps', bitrate: '12 Mbps', ping: '18ms' },
      { id: 's2', name: 'Server 2 - 1080p High Bitrate', quality: '1080p / 60fps', bitrate: '6.5 Mbps', ping: '24ms' }
    ]
  }
];
```

The website will automatically:
1. Render the match card into the grid under the correct sport filter.
2. Display the live score, team names, flags, timings, and venue.
3. Update the Live counter badges (`LIVE 🔴`).
4. Display the match in the top live score ticker tape.
5. Enable the interactive streaming player with the specified streaming servers when users click **"Watch Live Stream"**.

---

## 🚀 How to Run

1. Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
2. Or use any local development server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`.
