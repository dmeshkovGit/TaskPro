export const determineBackground = board => {
  const screenWidth = window.innerWidth;
  const isRetina = window.devicePixelRatio > 1;
  let suffix = 'desktop';
  let postfix = '';

  if (screenWidth < 768) {
    suffix = 'mobile';
  } else if (screenWidth < 1024) {
    suffix = 'tablet';
  }

  if (isRetina) {
    suffix += '@2x';
    postfix += '@2x';
  }

  return `/backgrounds/${suffix}/${board.board.background}${postfix}.webp`;
};
