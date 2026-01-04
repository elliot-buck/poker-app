import { ACTIONS } from '.';

let pendingActionResolver = null;

export const PLAYER_ACTIONS = ACTIONS;

export const waitForUserAction = () => {
  return new Promise((resolve) => {
    pendingActionResolver = resolve;
  });
};

export const resolveUserAction = (action) => {
  if (pendingActionResolver) {
    pendingActionResolver(action);
    pendingActionResolver = null;
  }
};
