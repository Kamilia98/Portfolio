import '@testing-library/jest-dom/vitest'

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
globalThis.IntersectionObserver = IntersectionObserverStub as unknown as typeof IntersectionObserver

// jsdom has no matchMedia; report "no match" unless a test stubs it.
window.matchMedia = ((query: string) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
})) as unknown as typeof window.matchMedia
