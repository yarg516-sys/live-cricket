/**
 * Live Engine & Real-Time Sync
 * Manages the live scores ticker tape and handles match updates.
 * (All fake simulations and mock notifications have been disabled).
 */

class LiveEngine {
  constructor(matches, onMatchUpdated, onNotification) {
    this.matches = matches || [];
    this.onMatchUpdated = onMatchUpdated;
    this.onNotification = onNotification;
    this.tickerInterval = null;
    this.init();
  }

  init() {
    this.updateLiveTicker();
    // Periodically sync ticker if new matches are added dynamically
    this.tickerInterval = setInterval(() => {
      this.updateLiveTicker();
    }, 15000);
  }

  updateLiveTicker() {
    const tickerContainer = document.getElementById('liveScoresTicker');
    if (!tickerContainer) return;

    const liveMatches = this.matches.filter(m => m.status === 'live');

    if (liveMatches.length === 0) {
      tickerContainer.innerHTML = `
        <div class="ticker-empty" style="padding: 0 16px; color: var(--text-muted); font-size: 0.8rem;">
          No live matches in progress at this moment. Live scores will appear here automatically.
        </div>
      `;
      return;
    }

    const tickerItems = liveMatches.map(m => `
      <div class="ticker-item" data-id="${m.id}">
        <span class="ticker-sport">${m.sportIcon || '🏆'}</span>
        <span class="ticker-team">${m.team1?.short || m.team1?.name}</span>
        <span class="ticker-score">${m.team1?.score ?? '-'} - ${m.team2?.score ?? '-'}</span>
        <span class="ticker-team">${m.team2?.short || m.team2?.name}</span>
        <span class="ticker-time">${m.matchTime || 'LIVE'}</span>
      </div>
    `).join('');

    // Duplicate list to achieve continuous infinite marquee scrolling
    tickerContainer.innerHTML = tickerItems + tickerItems;
  }
}
