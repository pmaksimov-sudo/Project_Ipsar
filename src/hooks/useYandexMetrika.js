const YM_ID = 108486565;

export const ymGoal = (goalName) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YM_ID, 'reachGoal', goalName);
  }
};

export const useYandexMetrika = () => {
  return { ymGoal };
};
