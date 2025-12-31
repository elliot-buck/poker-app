// Function to format chip number to 3 significant figures
export const formatNumber = (num) => {
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);

  if (absNum >= 1e9) {
    const value = (num / 1e9).toPrecision(3);
    return parseFloat(value) + 'B';
  }
  if (absNum >= 1e6) {
    const value = (num / 1e6).toPrecision(3);
    return parseFloat(value) + 'M';
  }
  if (absNum >= 1e3) {
    const value = (num / 1e3).toPrecision(3);
    return parseFloat(value) + 'K';
  }

  // For numbers less than 1000
  return parseFloat(num.toPrecision(3)).toString();
};

export default formatNumber;