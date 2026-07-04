// ============================================================
// TEMPORAL ORACLE — Main Application Controller
// ============================================================

(function() {
  'use strict';

  // ── State ──
  const state = {
    view: 'landing',
    mode: 'freeplay',
    currentScenario: null,
    prediction: null,
    fogLevel: 0,
    difficulty: 'all',
    categories: [],
    // Drill
    drillQueue: [],
    drillIndex: 0,
    drillResults: [],
    // Chain
    chainActive: false,
    chainResults: [],
    // Last score result
    lastResult: null
  };

  // ── DOM Helpers ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ── View Management ──
  function navigate(viewName) {
    $$('.view').forEach(v => v.classList.remove('active'));
    const view = $(`#view-${viewName}`);
    if (view) {
      view.classList.add('active');
      state.view = viewName;
      window.scrollTo(0, 0);
    }
  }

  // ── Date Formatting ──
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00Z');
    return d.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function formatShortDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00Z');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // ── Landing View ──
  function renderLanding() {
    const stats = scoringEngine.getStats();
    $('#stat-predictions').textContent = stats.totalPredictions;
    $('#stat-brier').textContent = stats.averageBrier !== null
      ? stats.averageBrier.toFixed(3)
      : '—';
    $('#stat-streak').textContent = stats.dailyStreak;
    $('#stat-achievements').textContent = `${stats.achievementsUnlocked}/${stats.totalAchievements}`;

    // Check daily challenge status
    const dailyResult = scoringEngine.selectNextScenario(SCENARIOS, 'daily');
    const dailyCard = $('#mode-daily');
    if (dailyResult.alreadyDone) {
      dailyCard.classList.add('disabled');
      dailyCard.querySelector('.mode-desc').textContent = '✅ Today\'s challenge completed! Come back tomorrow.';
    } else {
      dailyCard.classList.remove('disabled');
      dailyCard.querySelector('.mode-desc').textContent = 'Same scenario for everyone today. Come back tomorrow for a new one.';
    }
  }

  // ── Scenario View ──
  function startScenario(mode) {
    state.mode = mode;

    if (mode === 'drill') {
      // Build drill queue of 10 random scenarios
      state.drillQueue = [];
      state.drillIndex = 0;
      state.drillResults = [];
      const shuffled = [...SCENARIOS].sort(() => Math.random() - 0.5);
      state.drillQueue = shuffled.slice(0, Math.min(10, shuffled.length));
      loadScenario(state.drillQueue[0]);
      return;
    }

    const settings = {
      difficulty: state.difficulty,
      categories: state.categories
    };

    const result = scoringEngine.selectNextScenario(SCENARIOS, mode, settings);

    if (result.alreadyDone) {
      alert('You\'ve already completed today\'s daily challenge!');
      return;
    }

    if (!result.scenario) {
      alert('No scenarios match your filters. Try changing difficulty or category.');
      return;
    }

    loadScenario(result.scenario);
  }

  function loadScenario(scenario) {
    state.currentScenario = scenario;
    state.prediction = null;
    state.fogLevel = 0;

    navigate('scenario');

    // Reset fog
    $('#fog-slider').value = 0;
    $('#fog-value').textContent = '0%';

    // Masthead
    $('#masthead-date').textContent = formatDate(scenario.date);
    $('#masthead-subtitle').textContent = scenario.title;

    // Chain badge
    const chainBadge = $('#chain-badge');
    if (scenario.chainLabel) {
      chainBadge.textContent = scenario.chainLabel;
      chainBadge.classList.remove('hidden');
    } else {
      chainBadge.classList.add('hidden');
    }

    // Drill progress
    const drillProgress = $('#drill-progress');
    if (state.mode === 'drill') {
      drillProgress.classList.remove('hidden');
      renderDrillProgress();
    } else {
      drillProgress.classList.add('hidden');
    }

    // News ticker
    renderTicker(scenario.headlines);

    // Context
    $('#context-text').textContent = scenario.context;

    // Stock chart
    if (scenario.stockTicker) {
      $('#stock-chart-container').classList.remove('hidden');
      $('#stock-label').textContent = `${scenario.stockTicker.symbol} — ${scenario.stockTicker.label}`;
      renderStockChart(scenario.stockTicker.prices);
    } else {
      $('#stock-chart-container').classList.add('hidden');
    }

    // Base rate
    if (scenario.baseRate) {
      $('#base-rate-toggle').classList.remove('hidden');
      $('#base-rate-content').textContent = scenario.baseRate;
      $('#base-rate-content').classList.remove('visible');
    } else {
      $('#base-rate-toggle').classList.add('hidden');
    }

    // Question
    $('#prediction-question').textContent = scenario.question;

    // Reset slider
    $('#probability-slider').value = 50;
    $('#probability-display').textContent = '50';

    // Wiki
    $('#wiki-date-label').textContent = `as of ${formatShortDate(scenario.date)}`;
    $('#wiki-content').innerHTML = '<div class="wiki-loading"><div class="spinner"></div>Loading historical article...</div>';

    // Fetch Wikipedia content
    if (scenario.wikiArticles && scenario.wikiArticles.length > 0) {
      fetchWikiContent(scenario.wikiArticles[0], scenario.date);
    }
  }

  async function fetchWikiContent(articleTitle, dateStr) {
    try {
      const result = await wikiAPI.fetchHistoricalArticle(articleTitle, dateStr);
      if (result) {
        const sanitized = wikiAPI.sanitizeHtml(result.html);
        $('#wiki-content').innerHTML = sanitized;
      } else {
        $('#wiki-content').innerHTML = '<div class="wiki-loading">Article not available for this date.</div>';
      }
    } catch (e) {
      console.error('Failed to fetch wiki content:', e);
      $('#wiki-content').innerHTML = '<div class="wiki-loading">Failed to load article. Wikipedia may be unavailable.</div>';
    }
  }

  // ── News Ticker ──
  function renderTicker(headlines) {
    const track = $('#ticker-track');
    // Double the headlines for seamless loop
    const items = [...headlines, ...headlines].map(h =>
      `<span class="ticker-item">${h}</span>`
    ).join('');
    track.innerHTML = items;
  }

  // ── Stock Chart ──
  function renderStockChart(prices) {
    const canvas = $('#stock-chart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const pad = { top: 10, right: 10, bottom: 5, left: 10 };

    const min = Math.min(...prices) * 0.98;
    const max = Math.max(...prices) * 1.02;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#252d44';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 4; i++) {
      const y = pad.top + (i / 3) * (h - pad.top - pad.bottom);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    // Price line
    const color = prices[prices.length - 1] >= prices[0] ? '#2ecc71' : '#e74c3c';

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
    gradient.addColorStop(0, color + '30');
    gradient.addColorStop(1, color + '00');

    ctx.beginPath();
    ctx.moveTo(pad.left, h - pad.bottom);

    prices.forEach((price, i) => {
      const x = pad.left + (i / (prices.length - 1)) * (w - pad.left - pad.right);
      const y = pad.top + ((max - price) / (max - min)) * (h - pad.top - pad.bottom);
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.lineTo(w - pad.right, h - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    prices.forEach((price, i) => {
      const x = pad.left + (i / (prices.length - 1)) * (w - pad.left - pad.right);
      const y = pad.top + ((max - price) / (max - min)) * (h - pad.top - pad.bottom);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // End dot (abrupt stop)
    const lastX = w - pad.right;
    const lastY = pad.top + ((max - prices[prices.length - 1]) / (max - min)) * (h - pad.top - pad.bottom);
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#0a0e1a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Price label
    ctx.fillStyle = '#faf3e0cc';
    ctx.font = '11px "Space Grotesk", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`$${prices[prices.length - 1].toFixed(2)}`, lastX - 10, lastY - 8);
  }

  // ── Fog-of-War ──
  function applyFog(level) {
    state.fogLevel = level;
    const contextSection = $('#context-section');
    const wikiSection = $('#wiki-section');
    const ticker = $('#news-ticker');
    const stockChart = $('#stock-chart-container');

    // Level 0: everything visible
    // Level 33: hide wiki
    // Level 66: hide wiki + headlines
    // Level 100: hide wiki + headlines + context (only date + question)

    if (level < 33) {
      wikiSection.classList.remove('fog-hidden');
      ticker.classList.remove('fog-hidden');
      contextSection.classList.remove('fog-hidden');
    } else if (level < 66) {
      wikiSection.classList.add('fog-hidden');
      ticker.classList.remove('fog-hidden');
      contextSection.classList.remove('fog-hidden');
    } else if (level < 100) {
      wikiSection.classList.add('fog-hidden');
      ticker.classList.add('fog-hidden');
      contextSection.classList.remove('fog-hidden');
    } else {
      wikiSection.classList.add('fog-hidden');
      ticker.classList.add('fog-hidden');
      contextSection.classList.add('fog-hidden');
    }

    if (level >= 66 && stockChart) {
      stockChart.classList.add('fog-hidden');
    }
  }

  // ── Drill Progress ──
  function renderDrillProgress() {
    const bar = $('#drill-bar');
    const label = $('#drill-label');
    const total = state.drillQueue.length;

    bar.innerHTML = Array.from({ length: total }, (_, i) => {
      let cls = 'drill-dot';
      if (i < state.drillIndex) cls += ' done';
      else if (i === state.drillIndex) cls += ' current';
      return `<div class="${cls}"></div>`;
    }).join('');

    label.textContent = `Question ${state.drillIndex + 1} of ${total}`;
  }

  // ── Submit Prediction ──
  function submitPrediction() {
    const scenario = state.currentScenario;
    if (!scenario) return;

    const probability = parseInt($('#probability-slider').value) / 100;
    state.prediction = probability;

    const result = scoringEngine.recordPrediction(
      scenario.id,
      probability,
      scenario.outcome,
      scenario
    );

    state.lastResult = result;

    // Track daily
    if (state.mode === 'daily') {
      scoringEngine.recordDailyChallenge(scenario.id);
    }

    // Track drill
    if (state.mode === 'drill') {
      state.drillResults.push({
        scenario,
        probability,
        brierScore: result.brierScore,
        outcome: scenario.outcome
      });
    }

    // Check fog_walker achievement
    if (state.fogLevel >= 100 && result.brierScore < 0.2) {
      scoringEngine.unlockAchievement('fog_walker');
      result.newAchievements.push('fog_walker');
    }

    renderReveal(scenario, probability, result);
  }

  // ── Reveal View ──
  function renderReveal(scenario, probability, result) {
    navigate('reveal');

    const isCorrect = (probability >= 0.5 && scenario.outcome) ||
                      (probability < 0.5 && !scenario.outcome);

    // Outcome stamp
    const stamp = $('#outcome-stamp');
    stamp.className = `outcome-stamp ${isCorrect ? 'correct' : 'incorrect'}`;
    stamp.textContent = isCorrect ? 'Correct' : 'Incorrect';

    // Confetti for correct
    if (isCorrect) {
      spawnConfetti();
    }

    // Question & answer
    $('#reveal-question').textContent = scenario.question;
    $('#reveal-answer').textContent = scenario.outcome ? 'Yes — it happened.' : 'No — it did not.';

    // Score breakdown
    const brierClass = result.brierScore < 0.1 ? 'good' : result.brierScore < 0.3 ? 'neutral' : 'bad';
    const avgClass = result.runningAverage < 0.15 ? 'good' : result.runningAverage < 0.25 ? 'neutral' : 'bad';

    $('#score-breakdown').innerHTML = `
      <div class="score-item">
        <div class="score-item-value ${brierClass}">${result.brierScore.toFixed(3)}</div>
        <div class="score-item-label">This Prediction</div>
      </div>
      <div class="score-item">
        <div class="score-item-value ${avgClass}">${result.runningAverage.toFixed(3)}</div>
        <div class="score-item-label">Running Average</div>
      </div>
      <div class="score-item">
        <div class="score-item-value neutral">${(probability * 100).toFixed(0)}%</div>
        <div class="score-item-label">Your Prediction</div>
      </div>
    `;

    // Explanation
    $('#explanation-body').textContent = scenario.outcomeExplanation;

    // Expert consensus
    $('#experts-body').textContent = scenario.expertConsensus;

    // Key signals
    if (scenario.keySignals && scenario.keySignals.length > 0) {
      $('#signals-body').innerHTML = '<ul>' +
        scenario.keySignals.map(s => `<li>${s}</li>`).join('') +
        '</ul>';
      $('#panel-signals').classList.remove('hidden');
    } else {
      $('#panel-signals').classList.add('hidden');
    }

    // Cognitive biases
    if (scenario.biases && scenario.biases.length > 0) {
      $('#biases-body').innerHTML = '<div class="bias-grid">' +
        scenario.biases.map(b => `
          <div class="bias-card">
            <div class="bias-name">${b.name}</div>
            <div class="bias-desc">${b.description}</div>
          </div>
        `).join('') +
        '</div>';
      $('#panel-biases').classList.remove('hidden');
    } else {
      $('#panel-biases').classList.add('hidden');
    }

    // Wikipedia time-lapse
    loadTimelapse(scenario);

    // Achievement toasts
    if (result.newAchievements.length > 0) {
      result.newAchievements.forEach((key, i) => {
        setTimeout(() => showAchievementToast(key), 1000 + i * 800);
      });
    }

    // Update next button text for chain/drill
    const nextBtn = $('#btn-next');
    if (state.mode === 'drill') {
      if (state.drillIndex < state.drillQueue.length - 1) {
        nextBtn.textContent = `Next (${state.drillIndex + 1}/${state.drillQueue.length}) →`;
      } else {
        nextBtn.textContent = '📊 View Drill Results';
      }
    } else if (scenario.chainNext) {
      nextBtn.textContent = '⛓️ Continue Chain →';
    } else {
      nextBtn.textContent = 'Next Scenario →';
    }
  }

  // ── Wikipedia Time-lapse ──
  async function loadTimelapse(scenario) {
    const container = $('#timelapse-container');
    container.innerHTML = '<div class="wiki-loading"><div class="spinner"></div>Loading revision history...</div>';

    try {
      const articleTitle = scenario.wikiArticles[0];
      const revisions = await wikiAPI.fetchPostEventRevisions(
        articleTitle,
        scenario.revealDate || scenario.date
      );

      if (revisions.length > 0) {
        container.innerHTML = revisions.map(rev => `
          <div class="timelapse-entry">
            <span class="timelapse-date">${new Date(rev.timestamp).toLocaleString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}</span>
            <span class="timelapse-comment">${escapeHtml(rev.comment)}</span>
          </div>
        `).join('');
        $('#panel-timelapse').classList.remove('hidden');
      } else {
        $('#panel-timelapse').classList.add('hidden');
      }
    } catch (e) {
      console.error('Timelapse error:', e);
      $('#panel-timelapse').classList.add('hidden');
    }
  }

  // ── Next Scenario ──
  function handleNext() {
    const scenario = state.currentScenario;

    // Drill mode
    if (state.mode === 'drill') {
      state.drillIndex++;
      if (state.drillIndex < state.drillQueue.length) {
        loadScenario(state.drillQueue[state.drillIndex]);
      } else {
        renderDrillSummary();
      }
      return;
    }

    // Chain mode
    if (scenario && scenario.chainNext) {
      const nextScenario = SCENARIOS.find(s => s.id === scenario.chainNext);
      if (nextScenario) {
        state.chainActive = true;
        loadScenario(nextScenario);

        // Check chain completion
        if (!nextScenario.chainNext) {
          scoringEngine.unlockAchievement('chain_master');
        }
        return;
      }
    }

    // Normal next
    state.chainActive = false;
    startScenario(state.mode === 'daily' ? 'freeplay' : state.mode);
  }

  // ── Drill Summary ──
  function renderDrillSummary() {
    navigate('drill-summary');

    const avgBrier = state.drillResults.reduce((s, r) => s + r.brierScore, 0) / state.drillResults.length;
    const correct = state.drillResults.filter(r =>
      (r.probability >= 0.5 && r.outcome) || (r.probability < 0.5 && !r.outcome)
    ).length;

    const brierClass = avgBrier < 0.15 ? 'text-correct' : avgBrier < 0.25 ? 'text-amber' : 'text-incorrect';

    $('#drill-summary-content').innerHTML = `
      <div class="drill-summary-title">⚡ Drill Complete!</div>
      <div class="drill-summary-score ${brierClass}">${avgBrier.toFixed(3)}</div>
      <div class="stat-label">Average Brier Score</div>
      <div class="drill-summary-results">
        <div class="score-breakdown" style="max-width:500px;margin:1rem auto">
          <div class="score-item">
            <div class="score-item-value neutral">${correct}/${state.drillResults.length}</div>
            <div class="score-item-label">Directionally Correct</div>
          </div>
          <div class="score-item">
            <div class="score-item-value ${brierClass}">${avgBrier.toFixed(3)}</div>
            <div class="score-item-label">Avg Brier Score</div>
          </div>
          <div class="score-item">
            <div class="score-item-value neutral">${Math.min(...state.drillResults.map(r => r.brierScore)).toFixed(3)}</div>
            <div class="score-item-label">Best Prediction</div>
          </div>
        </div>
        <div style="margin-top:1.5rem">
          ${state.drillResults.map((r, i) => `
            <div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0;border-bottom:1px solid var(--ink-surface);text-align:left">
              <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--fog);min-width:1.5rem">${i + 1}.</span>
              <span style="flex:1;font-size:0.85rem;color:var(--cream-dim)">${r.scenario.title}</span>
              <span class="brier-badge ${r.brierScore < 0.1 ? 'excellent' : r.brierScore < 0.3 ? 'good' : 'poor'}">${r.brierScore.toFixed(3)}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="reveal-actions">
        <button class="btn btn-primary" onclick="document.getElementById('btn-drill-home').click()">← Back to Home</button>
        <button class="btn btn-secondary" onclick="document.getElementById('btn-drill-dashboard').click()">📊 Dashboard</button>
      </div>
      <button class="hidden" id="btn-drill-home"></button>
      <button class="hidden" id="btn-drill-dashboard"></button>
    `;

    // Track drill completion
    scoringEngine.data.drillResults.push({
      timestamp: new Date().toISOString(),
      avgBrier,
      results: state.drillResults.length
    });
    scoringEngine.save();

    // Check drill_sergeant achievement
    if (scoringEngine.data.drillResults.length >= 5) {
      scoringEngine.unlockAchievement('drill_sergeant');
    }
  }

  // ── Dashboard ──
  function renderDashboard() {
    navigate('dashboard');
    const stats = scoringEngine.getStats();

    // Stats grid
    const statsGrid = $('#dashboard-stats');
    if (stats.totalPredictions === 0) {
      statsGrid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state-emoji">🔮</div>
          <div class="empty-state-title">No predictions yet</div>
          <div class="empty-state-desc">Complete some scenarios to see your calibration data.</div>
        </div>
      `;
      $('#chart-grid').classList.add('hidden');
      return;
    }

    $('#chart-grid').classList.remove('hidden');

    statsGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-value">${stats.totalPredictions}</div>
        <div class="stat-label">Total Predictions</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:${stats.averageBrier < 0.2 ? 'var(--correct)' : 'var(--amber)'}">${stats.averageBrier.toFixed(3)}</div>
        <div class="stat-label">Avg Brier Score</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.bestBrier.toFixed(3)}</div>
        <div class="stat-label">Best Score</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.dailyStreak}</div>
        <div class="stat-label">Day Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.achievementsUnlocked}/${stats.totalAchievements}</div>
        <div class="stat-label">Achievements</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${stats.extremes.count > 0 ? (stats.extremes.accuracy * 100).toFixed(0) + '%' : '—'}</div>
        <div class="stat-label">Extremes Accuracy</div>
      </div>
    `;

    // Charts
    renderCalibrationChart();
    renderBrierTimeline();
    renderCategoryChart();
    renderDifficultyChart();

    // Achievements
    renderAchievements();

    // History
    renderHistory();
  }

  // ── Calibration Chart ──
  function renderCalibrationChart() {
    const canvas = $('#chart-calibration');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#141928';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#252d44';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = pad.left + (i / 10) * plotW;
      const y = pad.top + (i / 10) * plotH;
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + plotH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
    }

    // Perfect calibration line
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + plotH);
    ctx.lineTo(pad.left + plotW, pad.top);
    ctx.strokeStyle = '#8a9bb040';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Calibration data
    const calData = scoringEngine.getCalibrationData();
    const validBuckets = calData.filter(b => b.count > 0);

    if (validBuckets.length > 0) {
      // Points and lines
      ctx.beginPath();
      validBuckets.forEach((b, i) => {
        const x = pad.left + b.avgPredicted * plotW;
        const y = pad.top + (1 - b.avgOutcome) * plotH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#f5a623';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Dots
      validBuckets.forEach(b => {
        const x = pad.left + b.avgPredicted * plotW;
        const y = pad.top + (1 - b.avgOutcome) * plotH;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#f5a623';
        ctx.fill();
        ctx.strokeStyle = '#0a0e1a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Count label
        ctx.fillStyle = '#8a9bb0';
        ctx.font = '10px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`n=${b.count}`, x, y - 12);
      });
    }

    // Axis labels
    ctx.fillStyle = '#8a9bb0';
    ctx.font = '11px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 10; i += 2) {
      const x = pad.left + (i / 10) * plotW;
      ctx.fillText(`${i * 10}%`, x, h - 8);
    }
    ctx.textAlign = 'right';
    for (let i = 0; i <= 10; i += 2) {
      const y = pad.top + ((10 - i) / 10) * plotH;
      ctx.fillText(`${i * 10}%`, pad.left - 8, y + 4);
    }

    // Axis titles
    ctx.fillStyle = '#8a9bb080';
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Predicted Probability', w / 2, h - 0);

    ctx.save();
    ctx.translate(12, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Actual Frequency', 0, 0);
    ctx.restore();

    // Legend
    ctx.fillStyle = '#8a9bb060';
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = '#8a9bb040';
    ctx.beginPath(); ctx.moveTo(pad.left + 10, pad.top + 10); ctx.lineTo(pad.left + 30, pad.top + 10); ctx.stroke();
    ctx.fillText('Perfect', pad.left + 35, pad.top + 14);
    ctx.setLineDash([]);
    ctx.strokeStyle = '#f5a623';
    ctx.beginPath(); ctx.moveTo(pad.left + 10, pad.top + 26); ctx.lineTo(pad.left + 30, pad.top + 26); ctx.stroke();
    ctx.fillText('You', pad.left + 35, pad.top + 30);
  }

  // ── Brier Timeline Chart ──
  function renderBrierTimeline() {
    const canvas = $('#chart-brier-timeline');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#141928';
    ctx.fillRect(0, 0, w, h);

    const timeline = scoringEngine.getBrierTimeline();
    if (timeline.length < 2) {
      ctx.fillStyle = '#8a9bb060';
      ctx.font = '14px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Need 2+ predictions to show timeline', w / 2, h / 2);
      return;
    }

    const maxBrier = Math.max(0.5, ...timeline.map(t => t.runningAverage));

    // Grid
    ctx.strokeStyle = '#252d44';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (i / 5) * plotH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
      ctx.fillStyle = '#8a9bb0';
      ctx.font = '10px "Space Grotesk", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(((5 - i) / 5 * maxBrier).toFixed(2), pad.left - 8, y + 4);
    }

    // Running average line
    ctx.beginPath();
    timeline.forEach((t, i) => {
      const x = pad.left + (i / (timeline.length - 1)) * plotW;
      const y = pad.top + (1 - t.runningAverage / maxBrier) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#f5a623';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Individual scores as dots
    timeline.forEach((t, i) => {
      const x = pad.left + (i / (timeline.length - 1)) * plotW;
      const y = pad.top + (1 - t.brierScore / maxBrier) * plotH;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = t.brierScore < 0.1 ? '#2ecc71' : t.brierScore < 0.3 ? '#f5a62380' : '#e74c3c80';
      ctx.fill();
    });

    // X-axis
    ctx.fillStyle = '#8a9bb0';
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Prediction #', w / 2, h - 5);
    for (let i = 0; i <= Math.min(timeline.length - 1, 10); i++) {
      const idx = Math.floor(i / Math.min(timeline.length - 1, 10) * (timeline.length - 1));
      const x = pad.left + (idx / (timeline.length - 1)) * plotW;
      ctx.fillText(String(idx + 1), x, pad.top + plotH + 18);
    }
  }

  // ── Category Chart (Bar Chart) ──
  function renderCategoryChart() {
    const canvas = $('#chart-category');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const pad = { top: 20, right: 20, bottom: 50, left: 50 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#141928';
    ctx.fillRect(0, 0, w, h);

    const catScores = scoringEngine.getCategoryScores();
    const categories = Object.entries(catScores);

    if (categories.length === 0) {
      ctx.fillStyle = '#8a9bb060';
      ctx.font = '14px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data yet', w / 2, h / 2);
      return;
    }

    const maxScore = Math.max(0.5, ...categories.map(([, v]) => v.average));
    const barWidth = Math.min(50, plotW / categories.length * 0.6);
    const gap = (plotW - barWidth * categories.length) / (categories.length + 1);

    const catColors = {
      politics: '#3b82f6', economics: '#f5a623', tech: '#8b5cf6',
      science: '#2ecc71', geopolitics: '#e74c3c', sports: '#06b6d4'
    };

    categories.forEach(([cat, data], i) => {
      const x = pad.left + gap + i * (barWidth + gap);
      const barH = (data.average / maxScore) * plotH;
      const y = pad.top + plotH - barH;

      const color = catColors[cat] || '#f5a623';
      const gradient = ctx.createLinearGradient(0, y, 0, pad.top + plotH);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '40');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Value
      ctx.fillStyle = '#faf3e0cc';
      ctx.font = '11px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data.average.toFixed(3), x + barWidth / 2, y - 6);

      // Label
      ctx.fillStyle = '#8a9bb0';
      ctx.font = '9px "Space Grotesk", sans-serif';
      ctx.save();
      ctx.translate(x + barWidth / 2, pad.top + plotH + 10);
      ctx.rotate(-0.4);
      ctx.textAlign = 'left';
      ctx.fillText(cat, 0, 0);
      ctx.restore();

      // Count
      ctx.fillStyle = '#8a9bb060';
      ctx.font = '9px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`(${data.count})`, x + barWidth / 2, pad.top + plotH + 35);
    });

    // Y-axis
    ctx.fillStyle = '#8a9bb0';
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (i / 5) * plotH;
      ctx.fillText(((5 - i) / 5 * maxScore).toFixed(2), pad.left - 8, y + 4);
      ctx.strokeStyle = '#252d44';
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
    }
  }

  // ── Difficulty Chart ──
  function renderDifficultyChart() {
    const canvas = $('#chart-difficulty');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const pad = { top: 20, right: 20, bottom: 50, left: 50 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#141928';
    ctx.fillRect(0, 0, w, h);

    const diffScores = scoringEngine.getDifficultyScores();
    const diffs = ['easy', 'medium', 'hard'];
    const diffColors = { easy: '#2ecc71', medium: '#f5a623', hard: '#e74c3c' };

    const data = diffs.filter(d => diffScores[d]).map(d => ({
      label: d,
      ...diffScores[d]
    }));

    if (data.length === 0) {
      ctx.fillStyle = '#8a9bb060';
      ctx.font = '14px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data yet', w / 2, h / 2);
      return;
    }

    const maxScore = Math.max(0.5, ...data.map(d => d.average));
    const barWidth = Math.min(80, plotW / data.length * 0.5);
    const gap = (plotW - barWidth * data.length) / (data.length + 1);

    data.forEach((d, i) => {
      const x = pad.left + gap + i * (barWidth + gap);
      const barH = (d.average / maxScore) * plotH;
      const y = pad.top + plotH - barH;
      const color = diffColors[d.label];

      const gradient = ctx.createLinearGradient(0, y, 0, pad.top + plotH);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '40');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#faf3e0cc';
      ctx.font = '12px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.average.toFixed(3), x + barWidth / 2, y - 8);

      ctx.fillStyle = '#8a9bb0';
      ctx.font = '11px "Space Grotesk", sans-serif';
      ctx.fillText(d.label.toUpperCase(), x + barWidth / 2, pad.top + plotH + 18);
      ctx.fillStyle = '#8a9bb060';
      ctx.font = '10px "Space Grotesk", sans-serif';
      ctx.fillText(`(${d.count} predictions)`, x + barWidth / 2, pad.top + plotH + 34);
    });

    // Y-axis
    ctx.strokeStyle = '#252d44';
    ctx.lineWidth = 0.5;
    ctx.fillStyle = '#8a9bb0';
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (i / 5) * plotH;
      ctx.fillText(((5 - i) / 5 * maxScore).toFixed(2), pad.left - 8, y + 4);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
    }
  }

  // ── Achievements Gallery ──
  function renderAchievements() {
    const achievements = scoringEngine.getAllAchievements();
    const gallery = $('#achievements-gallery');

    gallery.innerHTML = achievements.map(a => `
      <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
        <span class="achievement-emoji">${a.emoji}</span>
        <div class="achievement-name">${a.name}</div>
        <div class="achievement-desc">${a.description}</div>
      </div>
    `).join('');
  }

  // ── History Table ──
  function renderHistory() {
    const predictions = [...scoringEngine.data.predictions].reverse();
    const container = $('#history-container');

    if (predictions.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-emoji">📋</div>
          <div class="empty-state-title">No history yet</div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <table class="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Question</th>
            <th>You Said</th>
            <th>Outcome</th>
            <th>Brier</th>
          </tr>
        </thead>
        <tbody>
          ${predictions.map(p => {
            const brierClass = p.brierScore < 0.1 ? 'excellent' : p.brierScore < 0.3 ? 'good' : 'poor';
            return `
              <tr>
                <td style="white-space:nowrap;font-family:var(--font-mono);font-size:0.75rem">${formatShortDate(p.scenarioDate)}</td>
                <td style="max-width:250px">${p.scenarioTitle}</td>
                <td style="font-family:var(--font-mono)">${(p.probability * 100).toFixed(0)}%</td>
                <td>${p.outcome ? '✅ Yes' : '❌ No'}</td>
                <td><span class="brier-badge ${brierClass}">${p.brierScore.toFixed(3)}</span></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  // ── Share Card ──
  function renderShareCard() {
    const canvas = $('#share-canvas');
    const ctx = canvas.getContext('2d');
    const w = 600, h = 400;
    canvas.width = w;
    canvas.height = h;

    const stats = scoringEngine.getStats();

    // Background
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = '#f5a623';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Title
    ctx.fillStyle = '#faf3e0';
    ctx.font = 'bold 28px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Temporal Oracle', w / 2, 55);

    ctx.fillStyle = '#8a9bb0';
    ctx.font = '14px "Source Serif 4", serif';
    ctx.fillText('Calibration Report', w / 2, 78);

    // Divider
    ctx.strokeStyle = '#252d44';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 92); ctx.lineTo(w - 40, 92); ctx.stroke();

    // Stats
    const statItems = [
      { label: 'PREDICTIONS', value: String(stats.totalPredictions) },
      { label: 'BRIER SCORE', value: stats.averageBrier !== null ? stats.averageBrier.toFixed(3) : '—' },
      { label: 'ACHIEVEMENTS', value: `${stats.achievementsUnlocked}/${stats.totalAchievements}` },
      { label: 'STREAK', value: `${stats.dailyStreak} days` }
    ];

    const statWidth = (w - 80) / statItems.length;
    statItems.forEach((s, i) => {
      const x = 40 + i * statWidth + statWidth / 2;
      ctx.fillStyle = '#f5a623';
      ctx.font = 'bold 32px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.value, x, 140);
      ctx.fillStyle = '#8a9bb0';
      ctx.font = '10px "Space Grotesk", sans-serif';
      ctx.fillText(s.label, x, 158);
    });

    // Mini calibration chart
    const calData = scoringEngine.getCalibrationData();
    const chartX = 50, chartY = 180, chartW = w - 100, chartH = 170;

    ctx.strokeStyle = '#252d44';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = chartY + (i / 4) * chartH;
      ctx.beginPath(); ctx.moveTo(chartX, y); ctx.lineTo(chartX + chartW, y); ctx.stroke();
    }

    // Perfect line
    ctx.beginPath();
    ctx.moveTo(chartX, chartY + chartH);
    ctx.lineTo(chartX + chartW, chartY);
    ctx.strokeStyle = '#8a9bb030';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // User's calibration
    const validBuckets = calData.filter(b => b.count > 0);
    if (validBuckets.length > 0) {
      ctx.beginPath();
      validBuckets.forEach((b, i) => {
        const x = chartX + b.avgPredicted * chartW;
        const y = chartY + (1 - b.avgOutcome) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#f5a623';
      ctx.lineWidth = 2;
      ctx.stroke();

      validBuckets.forEach(b => {
        const x = chartX + b.avgPredicted * chartW;
        const y = chartY + (1 - b.avgOutcome) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#f5a623';
        ctx.fill();
      });
    }

    // Chart labels
    ctx.fillStyle = '#8a9bb060';
    ctx.font = '9px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Predicted →', chartX + chartW / 2, chartY + chartH + 18);

    // Footer
    ctx.fillStyle = '#8a9bb040';
    ctx.font = '11px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('temporaloracle.app — Train your epistemic calibration', w / 2, h - 22);

    // Show modal
    $('#share-overlay').classList.remove('hidden');
  }

  function downloadShareCard() {
    const canvas = $('#share-canvas');
    const link = document.createElement('a');
    link.download = 'temporal-oracle-calibration.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // ── Confetti ──
  function spawnConfetti() {
    const container = $('#confetti-container');
    container.classList.remove('hidden');
    container.innerHTML = '';

    const colors = ['#f5a623', '#2ecc71', '#3b82f6', '#e74c3c', '#8b5cf6', '#faf3e0'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(piece);
    }

    setTimeout(() => container.classList.add('hidden'), 4000);
  }

  // ── Achievement Toast ──
  function showAchievementToast(key) {
    const def = ScoringEngine.ACHIEVEMENTS[key];
    if (!def) return;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <span class="achievement-toast-emoji">${def.emoji}</span>
      <div class="achievement-toast-text">
        <div class="achievement-toast-label">Achievement Unlocked</div>
        <div class="achievement-toast-name">${def.name}</div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4500);
  }

  // ── HTML Escaping ──
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Event Listeners ──
  function initEventListeners() {
    // Mode selection
    $$('.mode-card').forEach(card => {
      card.addEventListener('click', () => {
        const mode = card.dataset.mode;
        if (card.classList.contains('disabled')) return;
        startScenario(mode);
      });
    });

    // Difficulty filters
    $$('#filter-bar .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        $$('#filter-bar .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.difficulty = chip.dataset.difficulty;
      });
    });

    // Category filters
    $$('#category-bar .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cat = chip.dataset.category;
        if (cat === 'all') {
          $$('#category-bar .filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          state.categories = [];
        } else {
          $$('#category-bar .filter-chip[data-category="all"]').forEach(c => c.classList.remove('active'));
          chip.classList.toggle('active');
          const activeCats = Array.from($$('#category-bar .filter-chip.active'))
            .map(c => c.dataset.category)
            .filter(c => c !== 'all');
          state.categories = activeCats;
          if (activeCats.length === 0) {
            $$('#category-bar .filter-chip[data-category="all"]').forEach(c => c.classList.add('active'));
          }
        }
      });
    });

    // Probability slider
    $('#probability-slider').addEventListener('input', (e) => {
      $('#probability-display').textContent = e.target.value;

      // Update slider fill color
      const val = parseInt(e.target.value);
      const slider = e.target;
      const pct = val + '%';
      slider.style.background = `linear-gradient(to right, #f5a623 0%, #f5a623 ${pct}, #252d44 ${pct}, #252d44 100%)`;
    });

    // Submit prediction
    $('#submit-prediction').addEventListener('click', submitPrediction);

    // Fog slider
    $('#fog-slider').addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      $('#fog-value').textContent = val + '%';
      applyFog(val);
    });

    // Base rate toggle
    $('#base-rate-toggle').addEventListener('click', () => {
      const content = $('#base-rate-content');
      content.classList.toggle('visible');
      $('#base-rate-toggle').textContent = content.classList.contains('visible')
        ? '📊 Hide Base Rate'
        : '📊 Show Base Rate';
    });

    // Next scenario
    $('#btn-next').addEventListener('click', handleNext);

    // Back to home
    $('#btn-back-home').addEventListener('click', () => {
      state.chainActive = false;
      navigate('landing');
      renderLanding();
    });

    // Dashboard
    $('#btn-dashboard').addEventListener('click', renderDashboard);
    $('#btn-dashboard-home').addEventListener('click', () => {
      navigate('landing');
      renderLanding();
    });

    // Share
    $('#btn-share-result').addEventListener('click', renderShareCard);
    $('#btn-share-dashboard').addEventListener('click', renderShareCard);
    $('#btn-download-share').addEventListener('click', downloadShareCard);
    $('#btn-close-share').addEventListener('click', () => {
      $('#share-overlay').classList.add('hidden');
    });

    // Close share on overlay click
    $('#share-overlay').addEventListener('click', (e) => {
      if (e.target === $('#share-overlay')) {
        $('#share-overlay').classList.add('hidden');
      }
    });

    // Drill summary buttons
    document.addEventListener('click', (e) => {
      if (e.target.id === 'btn-drill-home') {
        navigate('landing');
        renderLanding();
      }
      if (e.target.id === 'btn-drill-dashboard') {
        renderDashboard();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (state.view === 'scenario' && e.key === 'Enter') {
        submitPrediction();
      }
    });
  }

  // ── Initialize ──
  function init() {
    initEventListeners();
    renderLanding();

    // Handle window resize for charts
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (state.view === 'dashboard') renderDashboard();
        if (state.currentScenario?.stockTicker && state.view === 'scenario') {
          renderStockChart(state.currentScenario.stockTicker.prices);
        }
      }, 250);
    });
  }

  // Start
  init();
})();
