module.exports = (positions) =>
  positions.length > 1
    ? positions.reduce((total, current) => {
        return total + current.quantity;
      }, 0)
    : positions[0].quantity;
