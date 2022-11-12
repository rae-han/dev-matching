const ROUTER_CHANGE_EVENT = 'router-change';

export const init = (onRouteChange) => {
  window.addEventListener(ROUTER_CHANGE_EVENT, () => {
    onRouteChange();
  })
}

export const routeChange = (url, params) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTER_CHANGE_EVENT, params))
};