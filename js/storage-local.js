(function () {
  const STORAGE_KEYS = {
    theme: 'cae-theme',
    bookmarks: 'cae-bookmarks',
    progress: 'cae-progress'
  };

  function safeParse(value, fallback) {
    try {
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function getItem(key, fallback) {
    try {
      return safeParse(localStorage.getItem(key), fallback);
    } catch (error) {
      return fallback;
    }
  }

  window.StorageLocal = {
    keys: STORAGE_KEYS,
    getTheme() {
      return getItem(STORAGE_KEYS.theme, 'dark');
    },
    setTheme(theme) {
      return setItem(STORAGE_KEYS.theme, theme);
    },
    getBookmarks() {
      return getItem(STORAGE_KEYS.bookmarks, []);
    },
    setBookmarks(bookmarks) {
      return setItem(STORAGE_KEYS.bookmarks, bookmarks);
    },
    toggleBookmark(label) {
      const current = this.getBookmarks();
      const next = current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label];
      this.setBookmarks(next);
      return next;
    },
    getProgress() {
      return getItem(STORAGE_KEYS.progress, {
        cpu: 0,
        memory: 0,
        storage: 0,
        io: 0,
        os: 0,
        dataFlow: 0,
        search: 0,
        glossary: 0
      });
    },
    setProgress(progressMap) {
      return setItem(STORAGE_KEYS.progress, progressMap);
    },
    setSectionProgress(sectionName, value) {
      const existing = this.getProgress();
      existing[sectionName] = Math.max(existing[sectionName] || 0, value);
      return this.setProgress(existing);
    }
  };
})();
