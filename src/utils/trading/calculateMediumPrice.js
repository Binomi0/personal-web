module.exports = (positions) =>
  positions.length > 1
    ? positions.reduce((total, current) => {
        const currentTotal =
          (current.enterPrice * current.quantity) / current.quantity;
        return (total + currentTotal) / 2;
      }, positions[0].enterPrice)
    : positions[0].enterPrice;
