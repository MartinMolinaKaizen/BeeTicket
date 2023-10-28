export const formatDateARG = (date) => {
  // get yyyy-mm-dd and return dd-mm-yyyy
  const dateArray = date.split("-");
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
};

// export function formattedDate(date) {
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }

// export const formatMoneyPunto = (number) => {
//   number = parseInt(number, 10);
//   const formattedNumber = number.toLocaleString("es-AR");
//   return `${formattedNumber}`;
// };

export const formatMoneyPunto = (number) => {
  number = parseFloat(number);
  const formattedNumber = number.toLocaleString("es-AR", { maximumFractionDigits: 2 });
  return formattedNumber;
};

export const separarEnLaComa = (value) => {
  let valor = value?.toString().split(",");
  let decimal = valor[1] ? valor[1] : "00";
  let entero = valor[0] ? valor[0] : "0";
  let total = parseFloat(entero + "." + decimal);
  return total;
};

export const formatDate = (date) => {
  // get yyyy-mm-dd and return dd-mm-yyyy
  const dateArray = date?.split("-");
  return dateArray ? `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}` : null;
};
