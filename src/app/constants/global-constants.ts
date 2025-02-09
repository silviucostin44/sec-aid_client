export const CONSTANTS = {
  totalQuestionsNo: 106,
  jwtToken: 'jwtToken',
  username: 'username',
  dateFormat: 'dd-MM-yyyy-HH:mm',
};

export const RISK_SCORE_FUNCTION = (implLevel: number, impact: number) =>
  (((100 - implLevel) / 100) * (impact - 1) * 25);
