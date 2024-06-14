export function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

const setUserIdCookie = (userId) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000); // 1 hour
  document.cookie = `user_id=${userId}; expires=${expirationDate.toUTCString()}; path=/`;
};

const getUserIdFromCookie = () => {
  const cookieName = "user_id";
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());

  for (let cookie of cookies) {
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  return null;
};

export { setUserIdCookie, getUserIdFromCookie };
