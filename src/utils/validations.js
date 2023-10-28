export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  return regex.test(email);
};

export const validateLegajo = (legajo) => {
  const regex = /^[a-zA-Z0-9]{1,5}$/;
  return regex.test(legajo);
};

export const validateText = (text) => {
  const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  return regex.test(text);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};

export const validateAddress = (address) => {
  const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\s,'-.]*$/;
  return regex.test(address);
};

export const validateDNI = (dni) => {
  const regex = /^[0-9]{7,8}$/;
  return regex.test(dni);
};

export const validateCUIL = (cuil) => {
  let base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let cuilArray = cuil.split("-");
  let cuilNumber = cuilArray[0] + cuilArray[1];
  let cuilDigit = cuilArray[2];
  let sum = 0;
  for (let i = 0; i < cuilNumber.length; i++) {
    sum += cuilNumber[i] * base[i];
  }

  let result = 11 - (sum % 11);
  if (result === 11) {
    result = 0;
  }
  if (result === 10) {
    result = 9;
  }
  return result === parseInt(cuilDigit);
};

export const validateNumber = (number) => {
  const regex = /^[0-9]+$/;
  return regex.test(number);
};

export const validateMoney = (money) => {
  const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
  return regex.test(money);
};

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(username);
};

export const validarName = (param) => {
  const regex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü0-9\s]+$/;
  const espacios = /^\s|\s$/;
  return regex.test(param) && !espacios.test(param);
};

export const validarLowerCaseText = (param) => {
  const regex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const espacios = /^\s|\s$/;
  return regex.test(param) && !espacios.test(param);
};