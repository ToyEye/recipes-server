export const calculateRating = (votes) => {
  let totalScore = 0;
  let totalVotes = 0;

  for (let score in votes) {
    if (votes.hasOwnProperty(score)) {
      totalScore += parseInt(score) * votes[score];
      totalVotes += votes[score];
    }
  }

  if (totalVotes === 0) {
    return 0;
  }

  const rating = totalScore / totalVotes;

  return Number(rating.toFixed(2));
};
