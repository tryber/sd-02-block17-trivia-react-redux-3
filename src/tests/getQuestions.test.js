import { getQuestionsApi } from '../services/getQuestionsApi';
import tokenRequest from '../services/tokenRequest';

describe('testing getQuestions API', () => {
  it('questions are retrieved from API when theres a token', async () => {
    const { token } = await tokenRequest();
    const selected = { id: ''}
    const props = { token, selected };
    const { response_code: responseCode, results } = await getQuestionsApi(props);
    const resultModel = [{
      category: expect.any(String),
      type: expect.any(String),
      difficulty: expect.any(String),
      question: expect.any(String),
      correct_answer: expect.any(String),
      incorrect_answers: [
        expect.any(String),
        expect.any(String),
        expect.any(String),
      ],
    }];
    expect(responseCode).toBe(0);
    expect(results).toEqual(expect.arrayContaining(resultModel));
  });

  it('response 3 and empty array is retrieved when no token is provided', async () => {
    const { response_code: responseCode, results } = await getQuestionsApi();
    expect(responseCode).toBe(2);
    expect(results).toEqual(expect.arrayContaining([]));
  });
});
