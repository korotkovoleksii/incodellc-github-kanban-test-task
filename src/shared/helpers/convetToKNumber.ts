const kFormatter = (num: number): string => {
  return Math.abs(num) > 999
    ? ((Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)) as number) + 'K'
    : Math.sign(num) * Math.abs(num) + '';
};
