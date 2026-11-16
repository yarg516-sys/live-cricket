/**
 * Video Streaming Player Controller
 * Handles modal display, stream server switching, dynamic canvas broadcast simulation,
 * interactive audio/video controls, live match stats, commentary feed, and fan chat.
 */

class SportsPlayer {
  constructor() {
    this.modal = document.getElementById('playerModal');
    this.videoCanvas = document.getElementById('broadcastCanvas');
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.volumeBtn = document.getElementById('volumeBtn');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.fullscreenBtn = document.getElementById('fullscreenBtn');
    this.theaterBtn = document.getElementById('theaterBtn');
    this.serverSelect = document.getElementById('serverSelect');
    this.qualityBadge = document.getElementById('playerQualityBadge');
    this.liveStatusBadge = document.getElementById('playerLiveStatus');
    this.chatInput = document.getElementById('chatInput');
    this.chatSendBtn = document.getElementById('chatSendBtn');
    this.chatMessagesContainer = document.getElementById('chatMessages');

    this.currentMatch = null;
    this.isPlaying = true;
    this.isMuted = false;
    this.volume = 0.8;
    this.isTheater = false;
    this.animationFrameId = null;
    this.canvasCtx = this.videoCanvas ? this.videoCanvas.getContext('2d') : null;

    this.initEvents();
  }

  initEvents() {
    // Close button & backdrop
    const closeBtn = document.getElementById('closePlayerBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen()) return;
      if (e.key === 'Escape') this.close();
      if (e.code === 'Space' && e.target !== this.chatInput) {
        e.preventDefault();
        this.togglePlay();
      }
      if (e.key === 'm' || e.key === 'M') {
        if (e.target !== this.chatInput) this.toggleMute();
      }
      if (e.key === 'f' || e.key === 'F') {
        if (e.target !== this.chatInput) this.toggleFullscreen();
      }
    });

    // Player controls
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    }

    if (this.volumeBtn) {
      this.volumeBtn.addEventListener('click', () => this.toggleMute());
    }

    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        this.volume = parseFloat(e.target.value);
        this.isMuted = this.volume === 0;
        this.updateVolumeUI();
      });
    }

    if (this.fullscreenBtn) {
      this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    if (this.theaterBtn) {
      this.theaterBtn.addEventListener('click', () => this.toggleTheater());
    }

    if (this.serverSelect) {
      this.serverSelect.addEventListener('change', (e) => {
        this.switchServer(e.target.value);
      });
    }

    // Tab switching in player sidebar
    const tabBtns = document.querySelectorAll('.player-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.player-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        const pane = document.getElementById(targetId);
        if (pane) pane.classList.add('active');
      });
    });

    // Chat room interactive
    if (this.chatSendBtn && this.chatInput) {
      this.chatSendBtn.addEventListener('click', () => this.sendChatMessage());
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendChatMessage();
      });
    }

    // Window resize canvas fit
    window.addEventListener('resize', () => {
      if (this.isOpen()) this.resizeCanvas();
    });
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('active');
  }

  open(match) {
    this.currentMatch = match;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Populate modal headers and match details
    document.getElementById('playerMatchTitle').textContent = `${match.team1.name} vs ${match.team2.name}`;
    document.getElementById('playerLeague').textContent = `${match.sportIcon} ${match.league}`;
    document.getElementById('playerVenue').textContent = match.venue || 'Global Stadium';
    document.getElementById('scorebugTeam1').textContent = match.team1.short || match.team1.name;
    document.getElementById('scorebugTeam2').textContent = match.team2.short || match.team2.name;
    document.getElementById('scorebugScore1').textContent = match.team1.score;
    document.getElementById('scorebugScore2').textContent = match.team2.score;
    document.getElementById('scorebugClock').textContent = match.matchTime || 'LIVE';

    // Populate server options
    if (this.serverSelect && match.streams) {
      this.serverSelect.innerHTML = match.streams.map((s, idx) => 
        `<option value="${s.id}">${s.name} (${s.quality})</option>`
      ).join('');
      if (match.streams[0]) {
        this.qualityBadge.textContent = match.streams[0].quality;
      }
    }

    // Render Stats
    this.renderStats(match);

    // Render Commentary
    this.renderCommentary(match);

    // Populate Initial Chat
    this.populateInitialChat(match);

    // Start Canvas Broadcast Simulation
    this.isPlaying = true;
    this.resizeCanvas();
    this.startBroadcastSimulation();
    this.showPlayerToast(`Connected to ${match.streams[0]?.name || 'HD Server'}`);
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.isTheater) {
      this.toggleTheater();
    }
  }

  switchServer(serverId) {
    if (!this.currentMatch || !this.currentMatch.streams) return;
    const selected = this.currentMatch.streams.find(s => s.id === serverId) || this.currentMatch.streams[0];
    if (this.qualityBadge) this.qualityBadge.textContent = selected.quality;

    // Show buffering indicator effect
    const overlay = document.getElementById('playerBufferOverlay');
    if (overlay) {
      overlay.classList.add('visible');
      setTimeout(() => {
        overlay.classList.remove('visible');
        this.showPlayerToast(`Switched stream: ${selected.name} (${selected.ping})`);
      }, 700);
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.playPauseBtn) {
      this.playPauseBtn.innerHTML = this.isPlaying 
        ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`
        : `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    }
    const pausedIndicator = document.getElementById('playerPausedIndicator');
    if (pausedIndicator) {
      pausedIndicator.style.display = this.isPlaying ? 'none' : 'flex';
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.updateVolumeUI();
  }

  updateVolumeUI() {
    if (this.volumeSlider) {
      this.volumeSlider.value = this.isMuted ? 0 : this.volume;
    }
    if (this.volumeBtn) {
      if (this.isMuted || this.volume === 0) {
        this.volumeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
      } else {
        this.volumeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
      }
    }
  }

  toggleFullscreen() {
    const playerWrapper = document.getElementById('playerContainer');
    if (!document.fullscreenElement) {
      if (playerWrapper.requestFullscreen) {
        playerWrapper.requestFullscreen();
      } else if (playerWrapper.webkitRequestFullscreen) {
        playerWrapper.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  toggleTheater() {
    this.isTheater = !this.isTheater;
    const playerCard = document.querySelector('.player-card');
    if (playerCard) {
      playerCard.classList.toggle('theater-mode', this.isTheater);
    }
    setTimeout(() => this.resizeCanvas(), 300);
  }

  resizeCanvas() {
    if (!this.videoCanvas) return;
    const rect = this.videoCanvas.parentElement.getBoundingClientRect();
    this.videoCanvas.width = rect.width || 800;
    this.videoCanvas.height = rect.height || 450;
  }

  /**
   * Generates dynamic visual sports broadcast animation on HTML5 Canvas
   * Simulates broadcast graphics, field/court radars, audio wave analyzers, and match status
   */
  startBroadcastSimulation() {
    if (!this.canvasCtx) return;
    let frame = 0;
    const ctx = this.canvasCtx;

    const render = () => {
      if (!this.isOpen()) return;

      const width = this.videoCanvas.width;
      const height = this.videoCanvas.height;

      if (this.isPlaying) {
        frame++;
      }

      // 1. Dynamic Studio/Pitch Background Gradient
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.7);
      if (this.currentMatch?.sport === 'cricket') {
        grad.addColorStop(0, '#0c2718');
        grad.addColorStop(1, '#050f09');
      } else if (this.currentMatch?.sport === 'basketball') {
        grad.addColorStop(0, '#2b1a0e');
        grad.addColorStop(1, '#0e0804');
      } else if (this.currentMatch?.sport === 'tennis') {
        grad.addColorStop(0, '#0d2238');
        grad.addColorStop(1, '#050c14');
      } else if (this.currentMatch?.sport === 'formula1') {
        grad.addColorStop(0, '#2e0f0f');
        grad.addColorStop(1, '#0e0404');
      } else {
        // Football default
        grad.addColorStop(0, '#0f2316');
        grad.addColorStop(1, '#060d09');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle pitch / grid markings
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Dynamic Center Broadcast Visualizer (Spectrogram / Radio Waves)
      ctx.save();
      const barCount = 42;
      const barWidth = 6;
      const barSpacing = 8;
      const totalWidth = barCount * (barWidth + barSpacing);
      const startX = (width - totalWidth) / 2;
      const centerY = height / 2 + 10;

      for (let i = 0; i < barCount; i++) {
        const wave = Math.sin((frame * 0.05) + i * 0.3) * Math.cos((frame * 0.02) + i * 0.1);
        const barHeight = this.isPlaying ? Math.abs(wave) * 60 + 10 : 8;
        const x = startX + i * (barWidth + barSpacing);

        const barGrad = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
        barGrad.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        barGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.9)');
        barGrad.addColorStop(1, 'rgba(59, 130, 246, 0.2)');

        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, 3);
        ctx.fill();
      }
      ctx.restore();

      // 4. Team Flags & Central Live Match Display
      if (this.currentMatch) {
        ctx.save();
        ctx.textAlign = 'center';
        
        // Team 1
        ctx.font = '600 22px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.currentMatch.team1.name, width * 0.28, height * 0.38);
        ctx.font = '700 36px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#10B981';
        ctx.fillText(String(this.currentMatch.team1.score), width * 0.28, height * 0.48);

        // VS Tag
        ctx.font = '700 16px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillText('VS', width * 0.5, height * 0.44);

        // Team 2
        ctx.font = '600 22px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.currentMatch.team2.name, width * 0.72, height * 0.38);
        ctx.font = '700 36px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#10B981';
        ctx.fillText(String(this.currentMatch.team2.score), width * 0.72, height * 0.48);

        // Subtitle details
        ctx.font = '400 13px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        const detailText = this.currentMatch.team1.detail || this.currentMatch.league;
        ctx.fillText(detailText, width * 0.5, height * 0.68);
        ctx.restore();
      }

      // 5. Broadcast Feed Telemetry Watermark
      ctx.save();
      ctx.font = '500 11px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.textAlign = 'left';
      ctx.fillText(`FEED: SATELLITE 1080p60 • LATENCY: 0.18s • FPS: 60`, 20, height - 16);
      ctx.textAlign = 'right';
      ctx.fillText(`LIVE WORLD BROADCAST FEED`, width - 20, height - 16);
      ctx.restore();

      this.animationFrameId = requestAnimationFrame(render);
    };

    render();
  }

  renderStats(match) {
    const statsContainer = document.getElementById('playerStatsContainer');
    if (!statsContainer) return;

    if (!match.stats) {
      statsContainer.innerHTML = `
        <div class="empty-stats">
          <p>Detailed live metrics and telemetry will unlock as match progresses.</p>
        </div>`;
      return;
    }

    let statsHtml = '<div class="stats-table">';
    for (const [key, val] of Object.entries(match.stats)) {
      const label = this.formatStatKey(key);
      if (Array.isArray(val) && val.length === 2) {
        const num1 = parseFloat(val[0]) || 50;
        const num2 = parseFloat(val[1]) || 50;
        const total = num1 + num2 === 0 ? 1 : num1 + num2;
        const pct1 = Math.round((num1 / total) * 100);
        statsHtml += `
          <div class="stat-row">
            <div class="stat-values">
              <span class="stat-v1">${val[0]}</span>
              <span class="stat-label">${label}</span>
              <span class="stat-v2">${val[1]}</span>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill team1" style="width: ${pct1}%"></div>
              <div class="stat-bar-fill team2" style="width: ${100 - pct1}%"></div>
            </div>
          </div>
        `;
      } else {
        statsHtml += `
          <div class="stat-single-row">
            <span class="stat-label">${label}</span>
            <span class="stat-highlight">${val}</span>
          </div>
        `;
      }
    }
    statsHtml += '</div>';
    statsContainer.innerHTML = statsHtml;
  }

  formatStatKey(key) {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }

  renderCommentary(match) {
    const container = document.getElementById('playerCommentaryList');
    if (!container) return;

    if (!match.commentary || match.commentary.length === 0) {
      container.innerHTML = `<div class="empty-commentary">Commentary commentary updates will stream here.</div>`;
      return;
    }

    container.innerHTML = match.commentary.map(c => `
      <div class="commentary-item ${c.highlight ? 'highlight' : ''}">
        <span class="commentary-badge">${c.minute}</span>
        <span class="commentary-text">${c.text}</span>
      </div>
    `).join('');
  }

  populateInitialChat(match) {
    if (!this.chatMessagesContainer) return;
    const simulatedChats = [
      { user: 'SoccerFan_09', team: match.team1.short, text: 'What an intense tempo so far! 🔥', time: '1m ago' },
      { user: 'Madridista_Pro', team: match.team1.short, text: 'Defense needs to stay compact on the wings!', time: '45s ago' },
      { user: 'GlobalViewer', team: match.team2.short, text: 'Stream 4K is buttery smooth. Let\'s go team!!', time: '12s ago' }
    ];

    this.chatMessagesContainer.innerHTML = simulatedChats.map(c => `
      <div class="chat-message">
        <div class="chat-meta">
          <span class="chat-user">${c.user}</span>
          <span class="chat-time">${c.time}</span>
        </div>
        <div class="chat-body">${this.escapeHtml(c.text)}</div>
      </div>
    `).join('');

    this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
  }

  sendChatMessage() {
    if (!this.chatInput) return;
    const text = this.chatInput.value.trim();
    if (!text) return;

    const newMsg = document.createElement('div');
    newMsg.className = 'chat-message my-message';
    newMsg.innerHTML = `
      <div class="chat-meta">
        <span class="chat-user">You</span>
        <span class="chat-time">Just now</span>
      </div>
      <div class="chat-body">${this.escapeHtml(text)}</div>
    `;
    this.chatMessagesContainer.appendChild(newMsg);
    this.chatInput.value = '';
    this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;

    // Simulated fan reply after 2-3 seconds
    setTimeout(() => {
      if (!this.isOpen()) return;
      const replies = [
        'Totally agree!',
        'Check that tackle replay!',
        'Match of the season hands down!',
        'Huge play right there! 🙌',
        'Defense held strong!'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message';
      botMsg.innerHTML = `
        <div class="chat-meta">
          <span class="chat-user">MatchWatcher_${Math.floor(Math.random() * 90 + 10)}</span>
          <span class="chat-time">Just now</span>
        </div>
        <div class="chat-body">${randomReply}</div>
      `;
      this.chatMessagesContainer.appendChild(botMsg);
      this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
    }, 2200);
  }

  showPlayerToast(msg) {
    const toast = document.getElementById('playerToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
