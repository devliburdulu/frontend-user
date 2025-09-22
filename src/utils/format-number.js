import { useLocales as getLocales } from "src/locales";

// ----------------------------------------------------------------------

/*
 * Locales code
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */

function getLocaleCode() {
  const {
    currentLang: {
      numberFormat: { code, currency },
    },
  } = getLocales();

  return {
    code: code ?? "en-US",
    currency: currency ?? "USD",
  };
}

function processInput(inputValue) {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

// ----------------------------------------------------------------------

export function fNumber(inputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

export const fPoin = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(value);
};

// ----------------------------------------------------------------------

export function fCurrency(inputValue, options) {
  const locale = { code: 'id-ID', currency: 'IDR' };
  const number = processInput(inputValue);
  if (number === null) return '';

  const fm = new Intl.NumberFormat(locale.code, {
    style: 'currency',
    currency: locale.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fPercent(inputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue) / 100;

  const fm = new Intl.NumberFormat(code, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue) {
  if (!inputValue) return "";

  if (inputValue === 0) return "0 Bytes";

  const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}
