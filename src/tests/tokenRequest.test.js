import tokenRequest from '../services/tokenRequest';

describe('Token is being retrieved successfully', () => {
  test('GET request', async () => {
    const {
      response_code: responseCode,
      response_message: responseMessage,
      token,
    } = await tokenRequest();
    expect(responseCode).toBe(0);
    expect(responseMessage).toBe('Token Generated Successfully!');
    expect(token).not.toBe(undefined);
  });
});
