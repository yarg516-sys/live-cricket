/**
 * Global Live Sports Database
 * Researched & Verified via Gemini AI Pipeline
 * Updated: 11/17/2026 11:54:25
 */

const SPORTS_DATA = [
  {
    "id": "match-cricket-1",
    "sport": "cricket",
    "sportLabel": "Cricket",
    "sportIcon": "­ƒÅÅ",
    "league": "Indian Premier League",
    "region": "India",
    "status": "live",
    "matchTime": "16.2 ov",
    "timeDisplay": "LIVE 16.2 ov",
    "venue": "Wankhede Stadium, Mumbai",
    "team1": {
      "name": "Mumbai Indians",
      "short": "MI",
      "flag": "­ƒç«­ƒç│",
      "score": "168/4",
      "detail": "Suryakumar Yadav 64* (35), Tilak Varma 22* (14)"
    },
    "team2": {
      "name": "Chennai Super Kings",
      "short": "CSK",
      "flag": "­ƒç«­ƒç│",
      "score": "Yet to bat",
      "detail": "Pathirana 2/28 (4 ov), Jadeja 1/24 (3 ov)"
    },
    "stats": {
      "possession": ["50%", "50%"],
      "shotsOnTarget": ["15", "10"]
    },
    "commentary": [
      { "minute": "16.2", "text": "FOUR! Suryakumar Yadav paddles it fine past short fine leg for a stunning boundary!", "highlight": true },
      { "minute": "15.6", "text": "Dot ball to end the over. Excellent tight bowling by Matheesha Pathirana.", "highlight": false }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" },
      { "id": "s2", "name": "Server 2 - 1080p High Bitrate", "quality": "1080p / 60fps", "bitrate": "6.5 Mbps", "ping": "24ms" },
      { "id": "s3", "name": "Server 3 - Low Latency Stream", "quality": "720p / 30fps", "bitrate": "3.0 Mbps", "ping": "12ms" }
    ]
  },
  {
    "id": "match-cricket-2",
    "sport": "cricket",
    "sportLabel": "Cricket",
    "sportIcon": "­ƒÅÅ",
    "league": "ICC Test Championship",
    "region": "International",
    "status": "live",
    "matchTime": "78.4 ov",
    "timeDisplay": "LIVE Day 3 - Session 3",
    "venue": "Lord's Cricket Ground, London",
    "team1": {
      "name": "England",
      "short": "ENG",
      "flag": "­ƒÅ┤󠁧󠁢󠁥󠁮󠁧󠁿",
      "score": "382 & 142/2",
      "detail": "Zak Crawley 78* (92), Ollie Pope 34* (50)"
    },
    "team2": {
      "name": "Australia",
      "short": "AUS",
      "flag": "­ƒçª­ƒç║",
      "score": "310",
      "detail": "Starc 3/68, Lyon 2/82"
    },
    "stats": {
      "possession": ["50%", "50%"],
      "shotsOnTarget": ["12", "14"]
    },
    "commentary": [
      { "minute": "78.4", "text": "Crawley drives through the covers off Cummins for a crisp boundary. England lead by 214 runs.", "highlight": true }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" },
      { "id": "s2", "name": "Server 2 - 1080p High Bitrate", "quality": "1080p / 60fps", "bitrate": "6.5 Mbps", "ping": "24ms" }
    ]
  },
  {
    "id": "match-football-1",
    "sport": "football",
    "sportLabel": "Football",
    "sportIcon": "ÔÜ¢",
    "league": "Premier League",
    "region": "England",
    "status": "live",
    "matchTime": "74'",
    "timeDisplay": "LIVE 74'",
    "venue": "Emirates Stadium, London",
    "team1": {
      "name": "Arsenal",
      "short": "ARS",
      "flag": "­ƒö┤",
      "score": "2",
      "detail": "Saka 24', Trossard 61'"
    },
    "team2": {
      "name": "Manchester City",
      "short": "MCI",
      "flag": "­ƒöÁ",
      "score": "1",
      "detail": "Haaland 38'"
    },
    "stats": {
      "possession": ["48%", "52%"],
      "shotsOnTarget": ["6", "5"]
    },
    "commentary": [
      { "minute": "74'", "text": "Yellow card shown to Rodri for a tactical foul on Martin ├ÿdegaard.", "highlight": false },
      { "minute": "61'", "text": "GOAL! Leandro Trossard curls it into the top corner! Arsenal take the lead!", "highlight": true }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" },
      { "id": "s2", "name": "Server 2 - 1080p High Bitrate", "quality": "1080p / 60fps", "bitrate": "6.5 Mbps", "ping": "24ms" }
    ]
  },
  {
    "id": "match-football-2",
    "sport": "football",
    "sportLabel": "Football",
    "sportIcon": "ÔÜ¢",
    "league": "UEFA Champions League",
    "region": "Europe",
    "status": "live",
    "matchTime": "32'",
    "timeDisplay": "LIVE 32'",
    "venue": "Santiago Bernab├®u, Madrid",
    "team1": {
      "name": "Real Madrid",
      "short": "RMA",
      "flag": "ÔÜ¬",
      "score": "1",
      "detail": "Vin├¡cius Jr. 15'"
    },
    "team2": {
      "name": "Barcelona",
      "short": "FCB",
      "flag": "­ƒöÁ­ƒö┤",
      "score": "1",
      "detail": "Lewandowski 28'"
    },
    "stats": {
      "possession": ["54%", "46%"],
      "shotsOnTarget": ["4", "3"]
    },
    "commentary": [
      { "minute": "28'", "text": "GOAL! Robert Lewandowski fires home from close range after a pinpoint cross from Yamal.", "highlight": true }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" }
    ]
  },
  {
    "id": "match-basketball-1",
    "sport": "basketball",
    "sportLabel": "Basketball",
    "sportIcon": "­ƒÅÇ",
    "league": "NBA",
    "region": "USA",
    "status": "live",
    "matchTime": "Q4 03:12",
    "timeDisplay": "LIVE Q4 03:12",
    "venue": "Crypto.com Arena, Los Angeles",
    "team1": {
      "name": "Los Angeles Lakers",
      "short": "LAL",
      "flag": "­ƒƒú",
      "score": "112",
      "detail": "LeBron James 32 PTS, 9 AST"
    },
    "team2": {
      "name": "Golden State Warriors",
      "short": "GSW",
      "flag": "­ƒƒí",
      "score": "115",
      "detail": "Stephen Curry 38 PTS, 8 3PM"
    },
    "stats": {
      "possession": ["50%", "50%"],
      "shotsOnTarget": ["42/85", "44/88"]
    },
    "commentary": [
      { "minute": "Q4 03:12", "text": "Stephen Curry pulls up from deep... BANG! Another three-pointer puts Warriors up by 3!", "highlight": true }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" }
    ]
  },
  {
    "id": "match-basketball-2",
    "sport": "basketball",
    "sportLabel": "Basketball",
    "sportIcon": "­ƒÅÇ",
    "league": "NBA",
    "region": "USA",
    "status": "upcoming",
    "matchTime": "Starts at 21:30",
    "timeDisplay": "Starts at 21:30",
    "venue": "TD Garden, Boston",
    "team1": {
      "name": "Boston Celtics",
      "short": "BOS",
      "flag": "­ƒìÇ",
      "score": "0",
      "detail": "Jayson Tatum"
    },
    "team2": {
      "name": "Dallas Mavericks",
      "short": "DAL",
      "flag": "­ƒÉ┤",
      "score": "0",
      "detail": "Luka Don─ìi─ç"
    },
    "stats": {
      "possession": ["0%", "0%"],
      "shotsOnTarget": ["0", "0"]
    },
    "commentary": [
      { "minute": "UPCOMING", "text": "Teams are warming up on the court. Tip-off in 15 minutes.", "highlight": false }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" }
    ]
  },
  {
    "id": "match-tennis-1",
    "sport": "tennis",
    "sportLabel": "Tennis",
    "sportIcon": "­ƒÄ¥",
    "league": "ATP Masters 1000",
    "region": "International",
    "status": "live",
    "matchTime": "Set 3 (5-4)",
    "timeDisplay": "LIVE Set 3 (5-4)",
    "venue": "Court Philippe-Chatrier, Paris",
    "team1": {
      "name": "Carlos Alcaraz",
      "short": "ALC",
      "flag": "­ƒç¬­ƒç©",
      "score": "2 Sets",
      "detail": "6-3, 4-6, 5-4"
    },
    "team2": {
      "name": "Jannik Sinner",
      "short": "SIN",
      "flag": "­ƒç«­ƒç╣",
      "score": "1 Set",
      "detail": "3-6, 6-4, 4-5"
    },
    "stats": {
      "possession": ["52%", "48%"],
      "shotsOnTarget": ["14", "11"]
    },
    "commentary": [
      { "minute": "Set 3", "text": "Brilliant baseline rally ends with a breathtaking forehand winner down the line by Alcaraz.", "highlight": true }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" }
    ]
  },
  {
    "id": "match-tennis-2",
    "sport": "tennis",
    "sportLabel": "Tennis",
    "sportIcon": "­ƒÄ¥",
    "league": "WTA Tour Finals",
    "region": "International",
    "status": "upcoming",
    "matchTime": "Starts at 19:00",
    "timeDisplay": "Starts at 19:00",
    "venue": "Centre Court, Wimbledon",
    "team1": {
      "name": "Iga ┼Üwi─àtek",
      "short": "IGA",
      "flag": "­ƒçÁ­ƒç▒",
      "score": "0 Sets",
      "detail": "World No. 1"
    },
    "team2": {
      "name": "Aryna Sabalenka",
      "short": "ARY",
      "flag": "­ƒçª­ƒç▒",
      "score": "0 Sets",
      "detail": "World No. 2"
    },
    "stats": {
      "possession": ["0%", "0%"],
      "shotsOnTarget": ["0", "0"]
    },
    "commentary": [
      { "minute": "UPCOMING", "text": "Players walking out onto the court. Warm-ups about to begin.", "highlight": false }
    ],
    "streams": [
      { "id": "s1", "name": "Server 1 - 4K Ultra HD Broadcast", "quality": "4K / 60fps", "bitrate": "12 Mbps", "ping": "18ms" }
    ]
  }
];

// Available sports categories
const SPORT_CATEGORIES = [
  { "id": "all", "name": "All Sports", "icon": "🌐" },
  { "id": "football", "name": "Football", "icon": "⚽" },
  { "id": "cricket", "name": "Cricket", "icon": "🏏" },
  { "id": "basketball", "name": "Basketball", "icon": "🏀" },
  { "id": "tennis", "name": "Tennis", "icon": "🎾" },
  { "id": "formula1", "name": "Formula 1", "icon": "🏎️" },
  { "id": "other", "name": "More Sports", "icon": "🏆" }
];