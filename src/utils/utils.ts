import data from "../mock/country.json";
import { countryData } from "../types/country";

const COUNTRY: countryData = data;

export function fetchCoordinate(location: string) {
  const targetCountry = COUNTRY.ref_country_codes.filter(
    (country) => country.country.toLowerCase() === location.toLowerCase()
  );
  return targetCountry;
}

export function getImageURL(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export function getMonthString(monthNumber: number): string {
  switch (monthNumber + 1) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      throw new Error("Invalid month number. Must be between 1 and 12.");
  }
}

export function getDateString(date: Date) {
  return date.getDate().toString() + " " + getMonthString(date.getMonth());
}
