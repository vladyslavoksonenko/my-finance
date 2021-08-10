export const convertMoney = (number) => {
  return String(number).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1\'')
}