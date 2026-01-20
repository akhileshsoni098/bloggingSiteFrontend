const isLogIn = () => {
  const token = localStorage.getItem("x-api-key");
  return token ? true : false;
};

export default isLogIn;
