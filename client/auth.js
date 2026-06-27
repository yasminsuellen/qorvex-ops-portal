export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function decodeToken(token) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

export function isTokenExpired(token) {
  const { exp } = decodeToken(token);
  return Date.now() / 1000 > exp;
}