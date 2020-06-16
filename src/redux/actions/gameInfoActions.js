const correctAnswer = (score, assertions) => ({
  type: 'CORRECT_ANSWER',
  score,
  assertions,
});

export default correctAnswer;
