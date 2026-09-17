const getNextIncrement = (currentBid, rules) => {
  let increment = 0;

  const sortedRules = rules.sort((a, b) => a.threshold - b.threshold);

  sortedRules.forEach((rule) => {
    if (currentBid >= rule.threshold) {
      increment = rule.incrementBy;
    }
  });

  return increment;
};

module.exports = getNextIncrement;
