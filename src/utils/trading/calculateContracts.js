module.exports = (positions) =>
  positions.length > 1
    ? Number(
        positions
          .reduce((total, current) => {
            return total + current.quantity;
          }, 0)
          .toFixed(2),
      )
    : Number(positions[0].quantity);
