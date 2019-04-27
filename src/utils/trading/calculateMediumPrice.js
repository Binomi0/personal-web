module.exports = (positions) => {
  const contracts = positions.reduce((total, currentTotal) => {
    return total + currentTotal.quantity;
  }, 0);

  const totalPrice = positions.reduce((total, currentTotal) => {
    return total + currentTotal.enterPrice * currentTotal.quantity;
  }, 0);

  const currentTotal = totalPrice / contracts;

  return positions.length > 1
    ? currentTotal.toFixed(2)
    : positions[0].enterPrice.toFixed(2);
};
