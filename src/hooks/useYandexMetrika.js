const YM_ID = 'XXXXXXXX'; // Replace with real Yandex Metrika ID before deploy

export const ymGoal = (goalName) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YM_ID, 'reachGoal', goalName);
  }
};

export const useYandexMetrika = () => {
  return { ymGoal };
};
