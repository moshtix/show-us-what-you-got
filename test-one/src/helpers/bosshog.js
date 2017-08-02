export const BossHog = function (n) {
  return (n % 3 && n % 5) ? n : (n % 3 ? '' : 'Boss') + (n % 5 ? '' : 'Hog');
}
