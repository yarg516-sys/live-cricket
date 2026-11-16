/**
 * Global Live Sports Database
 * 
 * Ready for your custom matches. 
 * Add your live, upcoming, or finished match objects to the SPORTS_DATA array below.
 * 
 * Example match structure for reference:
 * {
 *   id: 'match-01',
 *   sport: 'football', // 'football' | 'cricket' | 'basketball' | 'tennis' | 'formula1' | 'rugby' | 'baseball' | 'mma'
 *   sportLabel: 'Football',
 *   sportIcon: '⚽',
 *   league: 'Premier League',
 *   region: 'England',
 *   countryCode: 'gb-eng',
 *   status: 'live', // 'live' | 'upcoming' | 'finished'
 *   matchTime: '65\'',
 *   timeDisplay: 'LIVE 65\'',
 *   venue: 'Emirates Stadium, London',
 *   team1: {
 *     name: 'Team A',
 *     short: 'TMA',
 *     code: 'TMA',
 *     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
 *     score: 1,
 *     detail: 'Scorer Name 24\''
 *   },
 *   team2: {
 *     name: 'Team B',
 *     short: 'TMB',
 *     code: 'TMB',
 *     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
 *     score: 0,
 *     detail: ''
 *   },
 *   stats: {
 *     possession: ['55%', '45%'],
 *     shotsOnTarget: ['5', '2']
 *   },
 *   commentary: [
 *     { minute: '65\'', text: 'Second half underway.' }
 *   ],
 *   streams: [
 *     { id: 's1', name: 'Server 1 - HD Stream', quality: '1080p / 60fps', bitrate: '6.0 Mbps', ping: '20ms' },
 *     { id: 's2', name: 'Server 2 - Backup Feed', quality: '720p / 30fps', bitrate: '3.0 Mbps', ping: '30ms' }
 *   ]
 * }
 */

const SPORTS_DATA = [];

// Available sports categories
const SPORT_CATEGORIES = [
  { id: 'all', name: 'All Sports', icon: '🌐' },
  { id: 'football', name: 'Football', icon: '⚽' },
  { id: 'cricket', name: 'Cricket', icon: '🏏' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'tennis', name: 'Tennis', icon: '🎾' },
  { id: 'formula1', name: 'Formula 1', icon: '🏎️' },
  { id: 'other', name: 'More Sports', icon: '🏆' }
];
