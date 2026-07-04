// ============================================================
// TEMPORAL ORACLE — Wikipedia Historical Article Fetcher
// ============================================================
// Fetches Wikipedia article content as it existed on a given date
// using the MediaWiki API with CORS support.
// ============================================================

class WikiAPI {
  constructor() {
    this.baseUrl = 'https://en.wikipedia.org/w/api.php';
    this.cache = new Map();
  }

  /**
   * Build a URL with query parameters for the MediaWiki API.
   */
  buildUrl(params) {
    const url = new URL(this.baseUrl);
    params.origin = '*'; // CORS
    params.format = 'json';
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  }

  /**
   * Fetch the revision ID of an article as it existed on a given date.
   * Returns { revid, timestamp } or null if not found.
   */
  async getRevisionAtDate(articleTitle, dateStr) {
    const cacheKey = `rev:${articleTitle}:${dateStr}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    const timestamp = new Date(dateStr + 'T23:59:59Z').toISOString();
    const url = this.buildUrl({
      action: 'query',
      titles: articleTitle,
      prop: 'revisions',
      rvlimit: '1',
      rvstart: timestamp,
      rvdir: 'older',
      rvprop: 'ids|timestamp'
    });

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      if (!page.revisions || page.revisions.length === 0) return null;
      const rev = { revid: page.revisions[0].revid, timestamp: page.revisions[0].timestamp };
      this.cache.set(cacheKey, rev);
      return rev;
    } catch (e) {
      console.error('WikiAPI: Failed to get revision for', articleTitle, e);
      return null;
    }
  }

  /**
   * Parse (render to HTML) a specific revision of a Wikipedia article.
   * Returns { title, html, sections } or null.
   */
  async parseRevision(revid) {
    const cacheKey = `parse:${revid}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    const url = this.buildUrl({
      action: 'parse',
      oldid: revid.toString(),
      prop: 'text|sections',
      disableeditsection: 'true',
      disabletoc: 'true'
    });

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (!data.parse) return null;
      const result = {
        title: data.parse.title,
        html: data.parse.text['*'],
        sections: data.parse.sections
      };
      this.cache.set(cacheKey, result);
      return result;
    } catch (e) {
      console.error('WikiAPI: Failed to parse revision', revid, e);
      return null;
    }
  }

  /**
   * Fetch a Wikipedia article as it existed on a given date.
   * Returns rendered HTML (first ~N sections) or null.
   */
  async fetchHistoricalArticle(articleTitle, dateStr, maxSections = 3) {
    const rev = await this.getRevisionAtDate(articleTitle, dateStr);
    if (!rev) return null;

    const parsed = await this.parseRevision(rev.revid);
    if (!parsed) return null;

    // Trim to first N sections for readability
    let html = parsed.html;
    if (parsed.sections && parsed.sections.length > maxSections) {
      const cutSection = parsed.sections[maxSections];
      if (cutSection) {
        const headingPattern = `<h${cutSection.level}`;
        const idx = html.indexOf(headingPattern, html.indexOf(cutSection.anchor) > -1 ?
          html.indexOf(`id="${cutSection.anchor}"`) : html.length);
        if (idx > 0) {
          html = html.substring(0, idx);
        }
      }
    }

    return {
      title: parsed.title,
      html: html,
      revisionDate: rev.timestamp,
      revisionId: rev.revid
    };
  }

  /**
   * Fetch article diffs (revisions after a date) for the time-lapse feature.
   * Returns array of { timestamp, revid, comment } for revisions after the event.
   */
  async fetchPostEventRevisions(articleTitle, dateStr, count = 5) {
    const startTimestamp = new Date(dateStr + 'T00:00:00Z').toISOString();

    const url = this.buildUrl({
      action: 'query',
      titles: articleTitle,
      prop: 'revisions',
      rvlimit: String(count * 3), // fetch extras to filter
      rvstart: startTimestamp,
      rvdir: 'newer',
      rvprop: 'ids|timestamp|comment|size'
    });

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      if (!page.revisions) return [];

      // Space them out — pick revisions at meaningful intervals
      const revisions = page.revisions;
      const selected = [];
      const minGap = 6 * 60 * 60 * 1000; // 6 hours minimum between selected revisions
      let lastTimestamp = 0;

      for (const rev of revisions) {
        const t = new Date(rev.timestamp).getTime();
        if (t - lastTimestamp >= minGap || selected.length === 0) {
          selected.push({
            timestamp: rev.timestamp,
            revid: rev.revid,
            comment: rev.comment || '(no summary)',
            size: rev.size
          });
          lastTimestamp = t;
          if (selected.length >= count) break;
        }
      }

      return selected;
    } catch (e) {
      console.error('WikiAPI: Failed to fetch post-event revisions', e);
      return [];
    }
  }

  /**
   * Sanitize Wikipedia HTML for safe display.
   * Removes edit links, external links to Wikipedia, and scripts.
   */
  sanitizeHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    // Remove edit sections
    div.querySelectorAll('.mw-editsection').forEach(el => el.remove());
    // Remove reference links (keep text)
    div.querySelectorAll('sup.reference').forEach(el => el.remove());
    // Remove [citation needed] etc.
    div.querySelectorAll('.noprint').forEach(el => el.remove());
    // Remove any scripts
    div.querySelectorAll('script, style').forEach(el => el.remove());
    // Fix image src to absolute URLs
    div.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && src.startsWith('//')) {
        img.setAttribute('src', 'https:' + src);
      }
    });
    // Convert relative links to absolute
    div.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('/wiki/')) {
        a.setAttribute('href', 'https://en.wikipedia.org' + href);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
    });

    return div.innerHTML;
  }
}

// Global instance
const wikiAPI = new WikiAPI();
