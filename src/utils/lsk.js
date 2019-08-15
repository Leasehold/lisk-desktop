import BigNumber from 'bignumber.js';
import numeral from 'numeral';
import 'numeral/locales';

BigNumber.config({ ERRORS: false });

export const fromRawLsk = value => (
  new BigNumber(value || 0).dividedBy(new BigNumber(10).pow(8)).toFixed()
);

export const toRawLsk = value => (
  new BigNumber(value * new BigNumber(10).pow(8)).decimalPlaces(0).toNumber()
);

export const formatBasedOnLocale = ({
  value,
  locale = 'en',
  format = '0,0.[0000000000000000]',
}) => {
  numeral.locale(locale);
  return numeral(parseFloat(value, 10)).format(format);
};
