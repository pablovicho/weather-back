export const monthParse = (month) => {
    if (month < 10) {
        return "0" + (month + 1);
      } else return String(month + 1);
}

export const dayParse = (day) => {
    if (day < 10) {
        return "0" + day;
      } else return String(day);
}
