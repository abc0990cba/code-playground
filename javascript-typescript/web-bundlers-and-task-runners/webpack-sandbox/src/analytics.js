

function createAnalytics() {
  let counter = 0;
  let isDestroyed = false;

  const listener = () => counter++;

  document.addEventListener("click", listener);

  return {
    destroy() {
      document.removeEventListener("click", listener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed!";
      }
      return counter;
    },
  };
}

window.analytics = createAnalytics();

import * as _ from "lodash";
console.log("lodash(_.partition([2, 4, 6, -2, 4, -1], num => num > 0)): ", _.partition([2, 4, 6, -2, 4, -1], num => num > 0));

// Lazy loading?.
// import('lodash').then(_ => {
//   console.log('Lodash', _.random(0, 42, true))
// })