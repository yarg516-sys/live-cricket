/**
 * Global Live Sports Application
 * Manages UI filtering, search, view routing (Matches / Blank News section),
 * favorites, themes, and handles match rendering when matches are added.
 */

class SportsApp {
  constructor() {
    this.matches = Array.isArray(SPORTS_DATA) ? [...SPORTS_DATA] : [];
    this.activeCategory = 'all';
    this.activeStatus = 'all';
    this.searchQuery = '';
    this.activeView = 'matches'; // 'matches' or 'news'
    this.pinnedMatches = new Set(JSON.parse(localStorage.getItem('fav_sports_matches') || '[]'));
    this.theme = localStorage.getItem('sports_theme') || 'dark';

    this.player = new SportsPlayer();
    this.liveEngine = null;

    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.initCategoryNav();
    this.initFilterTabs();
    this.initSearch();
    this.initViewSwitcher();
    this.initThemeToggle();
    this.renderMatches();
    this.updateStatsCounters();

    // Start Live Sync Engine
    this.liveEngine = new LiveEngine(
      this.matches,
      (updatedMatch, eventSummary) => this.onMatchScoreUpdated(updatedMatch, eventSummary),
      (notification) => this.showLiveBanner(notification)
    );

    // Event delegation for match card interactions
    const matchesGrid = document.getElementById('matchesGrid');
    if (matchesGrid) {
      matchesGrid.addEventListener('click', (e) => {
        const watchBtn = e.target.closest('.btn-watch');
        const pinBtn = e.target.closest('.btn-pin');
        const card = e.target.closest('.match-card');

        if (watchBtn) {
          const matchId = watchBtn.getAttribute('data-id');
          const match = this.matches.find(m => m.id === matchId);
          if (match) this.player.open(match);
        } else if (pinBtn) {
          const matchId = pinBtn.getAttribute('data-id');
          this.togglePin(matchId);
        } else if (card && !e.target.closest('button')) {
          const matchId = card.getAttribute('data-id');
          const match = this.matches.find(m => m.id === matchId);
          if (match) this.player.open(match);
        }
      });
    }

    // Ticker item click opens stream
    const tickerContainer = document.getElementById('liveScoresTicker');
    if (tickerContainer) {
      tickerContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.ticker-item');
        if (item) {
          const matchId = item.getAttribute('data-id');
          const match = this.matches.find(m => m.id === matchId);
          if (match) this.player.open(match);
        }
      });
    }
  }

  // --- THEME ---
  initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.theme);
        localStorage.setItem('sports_theme', this.theme);
      });
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.innerHTML = theme === 'dark'
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // --- ROUTING / VIEW SWITCHER ---
  initViewSwitcher() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const view = link.getAttribute('data-view');
        if (view) {
          e.preventDefault();
          this.switchView(view);
        }
      });
    });

    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }
  }

  switchView(view) {
    this.activeView = view;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-view') === view);
    });

    const matchesView = document.getElementById('matchesViewContainer');
    const newsView = document.getElementById('newsViewContainer');

    if (view === 'news') {
      if (matchesView) matchesView.style.display = 'none';
      if (newsView) newsView.style.display = 'block';
    } else {
      if (matchesView) matchesView.style.display = 'block';
      if (newsView) newsView.style.display = 'none';
    }

    // Close mobile nav drawer if open
    const navMenu = document.getElementById('navMenu');
    if (navMenu) navMenu.classList.remove('open');
  }

  // --- CATEGORY NAV ---
  initCategoryNav() {
    const container = document.getElementById('sportsCategoryList');
    if (!container) return;

    container.innerHTML = SPORT_CATEGORIES.map(cat => `
      <button class="category-pill ${cat.id === this.activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        <span class="cat-icon">${cat.icon}</span>
        <span class="cat-name">${cat.name}</span>
      </button>
    `).join('');

    container.addEventListener('click', (e) => {
      const pill = e.target.closest('.category-pill');
      if (pill) {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeCategory = pill.getAttribute('data-cat');
        this.renderMatches();
      }
    });
  }

  // --- STATUS FILTER TABS ---
  initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-tab-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeStatus = btn.getAttribute('data-status');
        this.renderMatches();
      });
    });
  }

  // --- SEARCH ---
  initSearch() {
    const searchInput = document.getElementById('matchSearchInput');
    const clearBtn = document.getElementById('searchClearBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = this.searchQuery ? 'block' : 'none';
        this.renderMatches();
      });
    }

    if (clearBtn && searchInput) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.searchQuery = '';
        clearBtn.style.display = 'none';
        this.renderMatches();
      });
    }
  }

  // --- PIN / FAVORITE ---
  togglePin(matchId) {
    if (this.pinnedMatches.has(matchId)) {
      this.pinnedMatches.delete(matchId);
    } else {
      this.pinnedMatches.add(matchId);
    }
    localStorage.setItem('fav_sports_matches', JSON.stringify([...this.pinnedMatches]));
    this.renderMatches();
  }

  // --- STATS COUNTERS ---
  updateStatsCounters() {
    const liveCount = this.matches.filter(m => m.status === 'live').length;
    const upcomingCount = this.matches.filter(m => m.status === 'upcoming').length;

    const liveBadge = document.getElementById('globalLiveCount');
    if (liveBadge) liveBadge.textContent = liveCount;

    const liveStatBadge = document.getElementById('statLiveCount');
    if (liveStatBadge) liveStatBadge.textContent = `${liveCount} Live`;

    const upcomingStatBadge = document.getElementById('statUpcomingCount');
    if (upcomingStatBadge) upcomingStatBadge.textContent = `${upcomingCount} Scheduled`;
  }

  // --- MATCH CARDS RENDERING ---
  getFilteredMatches() {
    return this.matches.filter(match => {
      // Category filter
      if (this.activeCategory !== 'all') {
        if (this.activeCategory === 'other') {
          const mainSports = ['football', 'cricket', 'basketball', 'tennis', 'formula1'];
          if (mainSports.includes(match.sport)) return false;
        } else if (match.sport !== this.activeCategory) {
          return false;
        }
      }

      // Status filter
      if (this.activeStatus !== 'all') {
        if (this.activeStatus === 'pinned') {
          if (!this.pinnedMatches.has(match.id)) return false;
        } else if (match.status !== this.activeStatus) {
          return false;
        }
      }

      // Search query
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchString = `${match.team1?.name || ''} ${match.team2?.name || ''} ${match.league || ''} ${match.region || ''} ${match.sportLabel || ''}`.toLowerCase();
        if (!matchString.includes(query)) return false;
      }

      return true;
    });
  }

  renderMatches() {
    const grid = document.getElementById('matchesGrid');
    if (!grid) return;

    if (this.matches.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🏟️</div>
          <h3>No Live Matches Scheduled</h3>
          <p>The live match board is currently empty. Matches will appear here once you add them.</p>
        </div>
      `;
      return;
    }

    const filtered = this.getFilteredMatches();

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No Matches Found</h3>
          <p>No matches match your current filters.</p>
          <button class="btn-reset" onclick="app.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(match => this.createMatchCardHtml(match)).join('');
  }

  createMatchCardHtml(match) {
    const isPinned = this.pinnedMatches.has(match.id);
    const isLive = match.status === 'live';
    const isUpcoming = match.status === 'upcoming';

    return `
      <article class="match-card ${isLive ? 'is-live' : ''}" data-id="${match.id}">
        <!-- Card Header: Sport, League & Status -->
        <div class="card-header">
          <div class="league-meta">
            <span class="sport-badge">${match.sportIcon || '🏆'} ${match.sportLabel || ''}</span>
            <span class="league-name" title="${match.league || ''}">${match.league || ''}</span>
          </div>
          <div class="header-actions">
            ${isLive ? `
              <span class="live-pill">
                <span class="pulse-dot"></span>
                <span>${match.matchTime || 'LIVE'}</span>
              </span>
            ` : isUpcoming ? `
              <span class="upcoming-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${match.timeDisplay || 'Upcoming'}</span>
              </span>
            ` : `
              <span class="finished-pill">Ended</span>
            `}
            <button class="btn-pin ${isPinned ? 'active' : ''}" data-id="${match.id}" title="${isPinned ? 'Unpin' : 'Pin to favorites'}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="${isPinned ? '#F59E0B' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
          </div>
        </div>

        <!-- Card Body: Teams & Scores -->
        <div class="teams-container">
          <!-- Team 1 -->
          <div class="team-row">
            <div class="team-identity">
              <span class="team-flag">${match.team1?.flag || '🏳️'}</span>
              <span class="team-name">${match.team1?.name || 'Team 1'}</span>
            </div>
            <div class="team-score-wrapper">
              <span class="team-score team1-score">${match.team1?.score !== undefined ? match.team1.score : '-'}</span>
            </div>
          </div>

          <!-- Team 2 -->
          <div class="team-row">
            <div class="team-identity">
              <span class="team-flag">${match.team2?.flag || '🏳️'}</span>
              <span class="team-name">${match.team2?.name || 'Team 2'}</span>
            </div>
            <div class="team-score-wrapper">
              <span class="team-score team2-score">${match.team2?.score !== undefined ? match.team2.score : '-'}</span>
            </div>
          </div>
        </div>

        <!-- Card Subtext / Additional Context -->
        <div class="match-subtext">
          <span class="venue-info">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${match.venue || match.region || 'Live Broadcast'}
          </span>
          ${match.team1?.detail ? `<span class="detail-info">${match.team1.detail}</span>` : ''}
        </div>

        <!-- Card Footer: Watch & Streaming Controls -->
        <div class="card-footer">
          <button class="btn-watch ${isLive ? 'btn-live' : 'btn-standard'}" data-id="${match.id}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>${isLive ? 'Watch Live Stream' : isUpcoming ? 'View Broadcast Feeds' : 'Watch Replay & Highlights'}</span>
          </button>
          <div class="stream-indicators" title="${match.streams ? match.streams.length : 1} Stream Servers Available">
            <span class="badge-hd">HD</span>
            <span class="badge-servers">${match.streams ? match.streams.length : 1} feeds</span>
          </div>
        </div>
      </article>
    `;
  }

  // --- MATCH UPDATE HANDLER ---
  onMatchScoreUpdated(match, eventSummary) {
    const card = document.querySelector(`.match-card[data-id="${match.id}"]`);
    if (card) {
      const score1 = card.querySelector('.team1-score');
      const score2 = card.querySelector('.team2-score');
      const timePill = card.querySelector('.live-pill span:last-child');

      if (score1) score1.textContent = match.team1?.score;
      if (score2) score2.textContent = match.team2?.score;
      if (timePill) timePill.textContent = match.matchTime;

      card.classList.remove('score-flash');
      void card.offsetWidth;
      card.classList.add('score-flash');
    }

    if (this.player && this.player.isOpen() && this.player.currentMatch?.id === match.id) {
      const scorebug1 = document.getElementById('scorebugScore1');
      const scorebug2 = document.getElementById('scorebugScore2');
      const scorebugClock = document.getElementById('scorebugClock');

      if (scorebug1) scorebug1.textContent = match.team1?.score;
      if (scorebug2) scorebug2.textContent = match.team2?.score;
      if (scorebugClock) scorebugClock.textContent = match.matchTime;

      this.player.renderCommentary(match);
      this.player.renderStats(match);
    }
  }

  showLiveBanner(text) {
    if (!text) return;
    const banner = document.getElementById('liveNotificationBanner');
    if (!banner) return;

    banner.textContent = text;
    banner.classList.add('visible');
    setTimeout(() => {
      banner.classList.remove('visible');
    }, 4000);
  }

  resetFilters() {
    this.activeCategory = 'all';
    this.activeStatus = 'all';
    this.searchQuery = '';
    const searchInput = document.getElementById('matchSearchInput');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.category-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-cat') === 'all');
    });
    document.querySelectorAll('.filter-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-status') === 'all');
    });
    this.renderMatches();
  }
}

// Global initialization
let app = null;
document.addEventListener('DOMContentLoaded', () => {
  app = new SportsApp();
});
