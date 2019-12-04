export const getUserWithToken = token => {
  const tokenParts = token.split('.');
  const encodedPayload = tokenParts[1];
  const rawPayload = atob(encodedPayload);
  const user = JSON.parse(rawPayload);
  return user;
};
