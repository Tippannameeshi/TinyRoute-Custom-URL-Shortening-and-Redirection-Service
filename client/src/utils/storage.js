const TOKEN_KEY = "tinyroute_access_token";
const USER_KEY = "tinyroute_user";

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
export const setStoredToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeStoredToken = () => localStorage.removeItem(TOKEN_KEY);

export const getStoredUser = () => {
  const data = localStorage.getItem(USER_KEY);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};
export const setStoredUser = (user) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));
export const removeStoredUser = () => localStorage.removeItem(USER_KEY);

export const clearStorage = () => {
  removeStoredToken();
  removeStoredUser();
};
