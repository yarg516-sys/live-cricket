# GlobalSports Live — Worldwide Live Matches, Scores & Streaming

A clean, minimalist, responsive, and user-friendly web application for watching and tracking live sports matches from across the globe, with an automated **AI Intelligence Pipeline** running on **GitHub Actions**.

---

## 🤖 Automated AI Sports Pipeline (GitHub Actions)

The website features an automated GitHub Actions pipeline powered by **Google Gemini AI** that runs every 30 minutes (or on demand) to:

1. **AI Research**: Researches active and upcoming live sports matches worldwide across Cricket, Football, Basketball, Tennis, Formula 1, and more.
2. **Verification Engine**: Validates team identities, league details, match timing, and schema integrity before approving fixtures for publication.
3. **Automated Publish & Deploy**: Updates `js/data.js` and automatically commits and deploys to **GitHub Pages**.

### ⚙️ Setting Up the GitHub Secret

To enable the automation in your repository:

1. Go to your repository settings:
   👉 **`https://github.com/yarg516-sys/live-cricket/settings/secrets/actions`**
2. Click **"New repository secret"**.
3. Name: `GEMINI_API_KEY`
4. Value: Paste your Gemini API key.
5. Click **"Add secret"**.

### ⚡ Running the Pipeline Manually

1. Visit your GitHub Actions page:
   👉 **`https://github.com/yarg516-sys/live-cricket/actions`**
2. Select **"Gemini AI Live Sports Automation Pipeline"** on the left.
3. Click **"Run workflow"** ➔ **"Run workflow"** button.
4. The pipeline will research new matches, verify them, and publish them to your website in under 60 seconds!

---

## 📁 Complete Folder & File Structure

```text
sports web/
│
├── .github/
│   └── workflows/
│       └── match-updater.yml   # GitHub Actions scheduled & on-demand pipeline
│
├── scripts/
│   └── update-matches.mjs     # Gemini AI research & verification engine script
│
├── package.json               # Project manifest
├── index.html                 # Main Application (Matches, Live Streams & Blank News tab)
├── news.html                  # Standalone News page (Clean blank placeholder)
├── README.md                  # Documentation and setup instructions
│
├── css/
│   ├── style.css              # Global design system, colors, card layouts & animations
│   ├── player.css             # Live streaming video player modal, controls & sidebar
│   └── responsive.css         # Responsive media queries (mobile, tablet, desktop)
│
├── js/
│   ├── data.js                # Matches database (Clean, synchronized by AI pipeline)
│   ├── liveEngine.js          # Real-time score ticker tape and synchronization
│   ├── player.js              # Video player controller, broadcast simulation & fan chat
│   └── app.js                 # Main app controller, filtering, search & view routing
│
└── assets/
    └── icons/                 # Local icons and graphical assets
```

---

## ✍️ Manual Match Entry (Optional)

You can also manually add matches at any time in `js/data.js`:

```javascript
const SPORTS_DATA = [
  {
    id: 'match-01',
    sport: 'football', // Options: 'football', 'cricket', 'basketball', 'tennis', 'formula1', 'other'
    sportLabel: 'Football',
    sportIcon: '⚽',
    league: 'UEFA Champions League',
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
    streams: [
      { id: 's1', name: 'Server 1 - 4K Ultra HD', quality: '4K / 60fps', bitrate: '12 Mbps', ping: '18ms' },
      { id: 's2', name: 'Server 2 - 1080p HD', quality: '1080p / 60fps', bitrate: '6.5 Mbps', ping: '24ms' }
    ]
  }
];
```

---

## 🚀 Running Locally

Open `index.html` in any modern web browser or start a local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.
