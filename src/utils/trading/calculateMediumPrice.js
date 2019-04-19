module.exports = (positions) =>
  positions.length > 1
    ? positions.reduce((total, current) => {
        return (total + current.enterPrice) / 2;
      }, positions[0].enterPrice)
    : positions[0].enterPrice;
