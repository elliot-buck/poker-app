let pendingActionResolver = null;

export const PlayerAction = {
  CHECK: 'CHECK',
  CALL: 'CALL',
  RAISE: 'RAISE',
  FOLD: 'FOLD',
};

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
