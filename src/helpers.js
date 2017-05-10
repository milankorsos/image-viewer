/* eslint-disable import/prefer-default-export */

/**
 * Debounce function to limit the rate what a function is called with
 */
export function debounce(fn, wait) {
  let timeout = null;
  return (...args) => {
    const context = this;

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
