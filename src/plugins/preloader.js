export const preloader = (function() {
  const body = document.body;

  return {
    hide() {
      body.classList.remove("overflow");
      body.classList.add("loaded");
    },
    showWithDelay(delay) {
      return new Promise(resolve => {
        this.show();
        setTimeout(() => {
          resolve();
        }, delay);
      });
    },
    hideWithDelay(delay) {
      setTimeout(() => this.hide(), delay);
    },
    show() {
      body.classList.add("overflow");
      body.classList.remove("loaded");
    }
  };
})();
