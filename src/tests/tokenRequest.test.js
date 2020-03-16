import tokenRequest from '../services/tokenRequest';

describe('Token is being retrieved successfully', () => {
  const { response_code: responseCode, response_message: responseMessage, token } = tokenRequest;
  test('GET request', () => {
    expect(responseCode).toBe(0);
    expect(responseMessage).toBe('Token Generated Successfully!');
    expect(token).not.toBe(undefined);
  });
});
