// ============================================================
// TEMPORAL ORACLE — Scoring Engine
// ============================================================
// Brier score calculation, calibration tracking, spaced
// repetition, achievement checking, and localStorage persistence.
// ============================================================

class ScoringEngine {
  constructor() {
    this.storageKey = 'temporal_oracle_data';
    this.data = this.load();
  }

  /**
   * Load persisted data from localStorage.
   */
  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Migration: ensure all expected fields exist
        return {
          predictions: parsed.predictions || [],
          achievements: parsed.achievements || {},
          settings: parsed.settings || { difficulty: 'all', categories: [] },
          dailyHistory: parsed.dailyHistory || {},
          drillResults: parsed.drillResults || [],
          seenScenarios: parsed.seenScenarios || [],
          ...parsed
        };
      }
    } catch (e) {
      console.error('ScoringEngine: Failed to load data', e);
    }
    return {
      predictions: [],
      achievements: {},
      settings: { difficulty: 'all', categories: [] },
      dailyHistory: {},
      drillResults: [],
      seenScenarios: []
    };
  }

  /**
   * Save data to localStorage.
   */
  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error('ScoringEngine: Failed to save data', e);
    }
  }

  /**
   * Record a prediction.
   * @param {string} scenarioId
   * @param {number} probability - User's predicted probability (0-1)
   * @param {boolean} outcome - Actual outcome
   * @param {Object} scenario - Full scenario object for metadata
   * @returns {Object} Score details
   */
  recordPrediction(scenarioId, probability, outcome, scenario) {
    const brierScore = Math.pow(probability - (outcome ? 1 : 0), 2);
    const prediction = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      scenarioId,
      probability,
      outcome,
      brierScore,
      category: scenario.category,
      difficulty: scenario.difficulty,
      timestamp: new Date().toISOString(),
      scenarioTitle: scenario.title,
      question: scenario.question,
      scenarioDate: scenario.date
    };

    this.data.predictions.push(prediction);
    if (!this.data.seenScenarios.includes(scenarioId)) {
      this.data.seenScenarios.push(scenarioId);
    }

    // Check achievements
    const newAchievements = this.checkAchievements(prediction);

    this.save();

    return {
      brierScore,
      runningAverage: this.getAverageBrier(),
      totalPredictions: this.data.predictions.length,
      newAchievements,
      prediction
    };
  }

  /**
   * Get average Brier score across all predictions.
   */
  getAverageBrier() {
    if (this.data.predictions.length === 0) return 0;
    const sum = this.data.predictions.reduce((acc, p) => acc + p.brierScore, 0);
    return sum / this.data.predictions.length;
  }

  /**
   * Get Brier score per category.
   */
  getCategoryScores() {
    const categories = {};
    for (const p of this.data.predictions) {
      if (!categories[p.category]) {
        categories[p.category] = { total: 0, count: 0 };
      }
      categories[p.category].total += p.brierScore;
      categories[p.category].count += 1;
    }
    const result = {};
    for (const [cat, data] of Object.entries(categories)) {
      result[cat] = { average: data.total / data.count, count: data.count };
    }
    return result;
  }

  /**
   * Get Brier score per difficulty.
   */
  getDifficultyScores() {
    const difficulties = {};
    for (const p of this.data.predictions) {
      if (!difficulties[p.difficulty]) {
        difficulties[p.difficulty] = { total: 0, count: 0 };
      }
      difficulties[p.difficulty].total += p.brierScore;
      difficulties[p.difficulty].count += 1;
    }
    const result = {};
    for (const [diff, data] of Object.entries(difficulties)) {
      result[diff] = { average: data.total / data.count, count: data.count };
    }
    return result;
  }

  /**
   * Get calibration data: buckets of predictions grouped by probability.
   * Returns array of { bucket, avgPredicted, avgOutcome, count }
   */
  getCalibrationData() {
    const buckets = Array.from({ length: 10 }, (_, i) => ({
      min: i * 0.1,
      max: (i + 1) * 0.1,
      label: `${i * 10}-${(i + 1) * 10}%`,
      predictions: []
    }));

    for (const p of this.data.predictions) {
      const idx = Math.min(Math.floor(p.probability * 10), 9);
      buckets[idx].predictions.push(p);
    }

    return buckets.map(b => ({
      label: b.label,
      avgPredicted: b.predictions.length > 0
        ? b.predictions.reduce((s, p) => s + p.probability, 0) / b.predictions.length
        : (b.min + b.max) / 2,
      avgOutcome: b.predictions.length > 0
        ? b.predictions.reduce((s, p) => s + (p.outcome ? 1 : 0), 0) / b.predictions.length
        : null,
      count: b.predictions.length
    }));
  }

  /**
   * Get Brier scores over time (for timeline chart).
   */
  getBrierTimeline() {
    let running = 0;
    return this.data.predictions.map((p, i) => {
      running += p.brierScore;
      return {
        index: i + 1,
        brierScore: p.brierScore,
        runningAverage: running / (i + 1),
        timestamp: p.timestamp
      };
    });
  }

  /**
   * Get extremes analysis: predictions with >90% or <10% confidence.
   */
  getExtremesAnalysis() {
    const extremes = this.data.predictions.filter(
      p => p.probability >= 0.9 || p.probability <= 0.1
    );
    if (extremes.length === 0) return { count: 0, avgBrier: null, accuracy: null };
    const avgBrier = extremes.reduce((s, p) => s + p.brierScore, 0) / extremes.length;
    const correct = extremes.filter(p => {
      if (p.probability >= 0.9) return p.outcome === true;
      if (p.probability <= 0.1) return p.outcome === false;
      return false;
    }).length;
    return { count: extremes.length, avgBrier, accuracy: correct / extremes.length };
  }

  /**
   * Spaced repetition: get categories where user is weakest.
   * Returns array of category names sorted by worst Brier score.
   */
  getWeakCategories() {
    const catScores = this.getCategoryScores();
    return Object.entries(catScores)
      .sort(([, a], [, b]) => b.average - a.average)
      .map(([cat]) => cat);
  }

  /**
   * Select next scenario with spaced repetition weighting.
   * Biases toward weak categories after 10+ predictions.
   */
  selectNextScenario(scenarios, mode = 'freeplay', settings = {}) {
    let pool = scenarios.filter(s => !s.chainLabel || s.chainLabel.includes('Part 1'));

    // Filter by difficulty
    if (settings.difficulty && settings.difficulty !== 'all') {
      pool = pool.filter(s => s.difficulty === settings.difficulty);
    }

    // Filter by category
    if (settings.categories && settings.categories.length > 0) {
      pool = pool.filter(s => settings.categories.includes(s.category));
    }

    // Remove seen scenarios (in freeplay)
    if (mode === 'freeplay') {
      const unseen = pool.filter(s => !this.data.seenScenarios.includes(s.id));
      if (unseen.length > 0) pool = unseen;
      else this.data.seenScenarios = []; // reset if all seen
    }

    // Daily challenge: deterministic based on date
    if (mode === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      if (this.data.dailyHistory[today]) {
        return { scenario: null, alreadyDone: true, scenarioId: this.data.dailyHistory[today] };
      }
      const hash = this.hashString(today);
      const scenario = scenarios[hash % scenarios.length];
      return { scenario, alreadyDone: false };
    }

    // Extremes training: pick only scenarios with extreme expected probabilities
    if (mode === 'extremes') {
      const extremePool = pool.filter(s => s.difficulty === 'easy' || s.difficulty === 'hard');
      if (extremePool.length > 0) pool = extremePool;
    }

    // Spaced repetition weighting (after 10+ predictions)
    if (this.data.predictions.length >= 10 && mode === 'freeplay') {
      const weakCats = this.getWeakCategories();
      if (weakCats.length > 0 && Math.random() < 0.6) {
        const weakPool = pool.filter(s => s.category === weakCats[0]);
        if (weakPool.length > 0) pool = weakPool;
      }
    }

    // Random selection from pool
    const scenario = pool[Math.floor(Math.random() * pool.length)];
    return { scenario, alreadyDone: false };
  }

  /**
   * Simple string hash for daily challenge determinism.
   */
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  /**
   * Record daily challenge completion.
   */
  recordDailyChallenge(scenarioId) {
    const today = new Date().toISOString().split('T')[0];
    this.data.dailyHistory[today] = scenarioId;
    this.save();
  }

  /**
   * Check how many consecutive days user has done the daily challenge.
   */
  getDailyStreak() {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      if (this.data.dailyHistory[key]) streak++;
      else break;
    }
    return streak;
  }

  // ── Achievement Definitions ──

  static ACHIEVEMENTS = {
    first_sight: { name: 'First Sight', emoji: '🔮', description: 'Complete your first prediction', icon: 'crystal-ball' },
    calibrated: { name: 'Calibrated', emoji: '🎯', description: 'Brier score < 0.25 after 10+ predictions', icon: 'bullseye' },
    statistician: { name: 'Statistician', emoji: '📊', description: 'Brier score < 0.15 after 20+ predictions', icon: 'chart' },
    oracle: { name: 'Oracle', emoji: '🏆', description: '10 predictions in a row with individual Brier < 0.1', icon: 'trophy' },
    on_fire: { name: 'On Fire', emoji: '🔥', description: '5 correct predictions in a row (>60% confidence, correct)', icon: 'flame' },
    cold_read: { name: 'Cold Read', emoji: '🧊', description: 'Correctly predict a "hard" scenario with >70% confidence', icon: 'snowflake' },
    humble: { name: 'Humble', emoji: '🤔', description: 'Correctly assign <30% to something that didn\'t happen', icon: 'thinking' },
    contrarian: { name: 'Contrarian', emoji: '⚡', description: 'Correctly predict against expert consensus', icon: 'lightning' },
    polymath: { name: 'Polymath', emoji: '🌍', description: 'Make predictions in all 6 categories', icon: 'globe' },
    daily_reader: { name: 'Daily Reader', emoji: '📰', description: 'Complete 7 daily challenges', icon: 'newspaper' },
    drill_sergeant: { name: 'Drill Sergeant', emoji: '🎰', description: 'Complete 5 calibration drills', icon: 'slot-machine' },
    extreme_precision: { name: 'Extreme Precision', emoji: '🔬', description: 'Score < 0.05 on 3 extremes predictions', icon: 'microscope' },
    chain_master: { name: 'Chain Master', emoji: '⛓️', description: 'Complete a full multi-part scenario chain', icon: 'chain' },
    fog_walker: { name: 'Fog Walker', emoji: '🌫️', description: 'Score < 0.2 with maximum fog-of-war', icon: 'fog' }
  };

  /**
   * Check and unlock achievements based on the latest prediction.
   * Returns array of newly unlocked achievement keys.
   */
  checkAchievements(latestPrediction) {
    const newlyUnlocked = [];
    const a = this.data.achievements;
    const preds = this.data.predictions;

    // First Sight
    if (!a.first_sight && preds.length >= 1) {
      a.first_sight = new Date().toISOString();
      newlyUnlocked.push('first_sight');
    }

    // Calibrated
    if (!a.calibrated && preds.length >= 10 && this.getAverageBrier() < 0.25) {
      a.calibrated = new Date().toISOString();
      newlyUnlocked.push('calibrated');
    }

    // Statistician
    if (!a.statistician && preds.length >= 20 && this.getAverageBrier() < 0.15) {
      a.statistician = new Date().toISOString();
      newlyUnlocked.push('statistician');
    }

    // Oracle: 10 in a row with brier < 0.1
    if (!a.oracle && preds.length >= 10) {
      const last10 = preds.slice(-10);
      if (last10.every(p => p.brierScore < 0.1)) {
        a.oracle = new Date().toISOString();
        newlyUnlocked.push('oracle');
      }
    }

    // On Fire: 5 correct in a row (>60% conf, correct)
    if (!a.on_fire && preds.length >= 5) {
      const last5 = preds.slice(-5);
      if (last5.every(p => (p.probability > 0.6 && p.outcome) || (p.probability < 0.4 && !p.outcome))) {
        a.on_fire = new Date().toISOString();
        newlyUnlocked.push('on_fire');
      }
    }

    // Cold Read
    if (!a.cold_read && latestPrediction.difficulty === 'hard') {
      const wasRight = (latestPrediction.probability > 0.7 && latestPrediction.outcome) ||
                       (latestPrediction.probability < 0.3 && !latestPrediction.outcome);
      if (wasRight) {
        a.cold_read = new Date().toISOString();
        newlyUnlocked.push('cold_read');
      }
    }

    // Humble
    if (!a.humble && latestPrediction.probability < 0.3 && !latestPrediction.outcome) {
      a.humble = new Date().toISOString();
      newlyUnlocked.push('humble');
    }

    // Polymath
    if (!a.polymath) {
      const cats = new Set(preds.map(p => p.category));
      if (cats.size >= 6) {
        a.polymath = new Date().toISOString();
        newlyUnlocked.push('polymath');
      }
    }

    // Daily Reader
    if (!a.daily_reader && this.getDailyStreak() >= 7) {
      a.daily_reader = new Date().toISOString();
      newlyUnlocked.push('daily_reader');
    }

    // Extreme Precision
    if (!a.extreme_precision) {
      const extremePreds = preds.filter(p => (p.probability >= 0.9 || p.probability <= 0.1) && p.brierScore < 0.05);
      if (extremePreds.length >= 3) {
        a.extreme_precision = new Date().toISOString();
        newlyUnlocked.push('extreme_precision');
      }
    }

    this.save();
    return newlyUnlocked;
  }

  /**
   * Manually unlock an achievement (for chain_master, fog_walker, etc.)
   */
  unlockAchievement(key) {
    if (!this.data.achievements[key]) {
      this.data.achievements[key] = new Date().toISOString();
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Get all achievements with unlock status.
   */
  getAllAchievements() {
    return Object.entries(ScoringEngine.ACHIEVEMENTS).map(([key, def]) => ({
      key,
      ...def,
      unlocked: !!this.data.achievements[key],
      unlockedAt: this.data.achievements[key] || null
    }));
  }

  /**
   * Get overall stats summary.
   */
  getStats() {
    const preds = this.data.predictions;
    if (preds.length === 0) {
      return {
        totalPredictions: 0,
        averageBrier: null,
        bestBrier: null,
        worstBrier: null,
        dailyStreak: this.getDailyStreak(),
        achievementsUnlocked: Object.keys(this.data.achievements).length,
        totalAchievements: Object.keys(ScoringEngine.ACHIEVEMENTS).length
      };
    }
    return {
      totalPredictions: preds.length,
      averageBrier: this.getAverageBrier(),
      bestBrier: Math.min(...preds.map(p => p.brierScore)),
      worstBrier: Math.max(...preds.map(p => p.brierScore)),
      dailyStreak: this.getDailyStreak(),
      achievementsUnlocked: Object.keys(this.data.achievements).length,
      totalAchievements: Object.keys(ScoringEngine.ACHIEVEMENTS).length,
      categoryScores: this.getCategoryScores(),
      difficultyScores: this.getDifficultyScores(),
      extremes: this.getExtremesAnalysis()
    };
  }

  /**
   * Reset all data (for testing).
   */
  reset() {
    this.data = {
      predictions: [],
      achievements: {},
      settings: { difficulty: 'all', categories: [] },
      dailyHistory: {},
      drillResults: [],
      seenScenarios: []
    };
    this.save();
  }
}

// Global instance
const scoringEngine = new ScoringEngine();
