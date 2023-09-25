import { BigNumber } from '@ijstech/eth-wallet';
import { FormatUtils } from "@ijstech/components";

export const isNumeric = (value: string | number | BigNumber): boolean => {
  if (value instanceof BigNumber) {
    return !value.isNaN() && value.isFinite();
  }
  if (typeof value === 'string') {
    const parsed = new BigNumber(value);
    return !parsed.isNaN() && parsed.isFinite();
  }
  return !isNaN(value) && isFinite(value);
}

export const formatNumber = (num: number, options?: { format?: string, decimals?: number, percentValues?: boolean }) => {
  if (num === null) return '-';
  const { decimals, format, percentValues } = options || {};
  if (percentValues) {
    return `${FormatUtils.formatNumber(num, { decimalFigures: 2 })}%`;
  }
  if (format) {
    return formatNumberByFormat(num, format);
  }
  const absNum = Math.abs(num);
  // if (absNum >= 1000000000) {
  //   return FormatUtils.formatNumber((num / 1000000000), { decimalFigures: decimals || 3 }) + 'B';
  // }
  // if (absNum >= 1000000) {
  //   return FormatUtils.formatNumber((num / 1000000), { decimalFigures: decimals || 3 }) + 'M';
  // }
  // if (absNum >= 1000) {
  //   return FormatUtils.formatNumber((num / 1000), { decimalFigures: decimals || 3 }) + 'K';
  // }
  if (absNum < 0.0000001) {
    return FormatUtils.formatNumber(num, { decimalFigures: 0 });
  }
  if (absNum < 0.00001) {
    return FormatUtils.formatNumber(num, { decimalFigures: 6 });
  }
  if (absNum < 0.001 || absNum < 1) {
    return FormatUtils.formatNumber(num, { decimalFigures: 4 });
  }
  // if (absNum < 1) {
  //   return FormatUtils.formatNumber(num, { decimalFigures: 4 });
  // }
  if (absNum >= 1000) {
    return FormatUtils.formatNumber(num, { decimalFigures: decimals || 3, shortScale: true, roundingMethod: 'round' })
  }
  return FormatUtils.formatNumber(num, { decimalFigures: 2 });
}

export const formatNumberByFormat = (num: number, format: string, separators?: boolean) => {
  if (!format) return FormatUtils.formatNumber(num, { decimalFigures: 0 });
  const decimalFigures = format.split('.')[1] ? format.split('.')[1].length : 0;
  if (format.includes('%')) {
    return FormatUtils.formatNumber((num * 100), { decimalFigures }) + '%';
  }
  const currencySymbol = format.indexOf('$') !== -1 ? '$' : '';
  const roundedNum = FormatUtils.formatNumber(num, { decimalFigures });
  if (separators || !(format.includes('m') || format.includes('a'))) {
    return format.indexOf('$') === 0 ? `${currencySymbol}${roundedNum}` : `${roundedNum}${currencySymbol}`;
  }
  const parts = roundedNum.split('.');
  const decimalPart = parts.length > 1 ? parts[1] : '';
  const integerPart = formatNumber(parseInt(parts[0].replace(/,/g, '')), { decimals: decimalPart.length });
  return `${currencySymbol}${integerPart}`;
}

// export const FormatUtils.formatNumber = (value: number | string | BigNumber, options: IFormatNumberOptions): string => {
//   let bigValue: BigNumber;
//   if (value instanceof BigNumber) {
//     bigValue = value;
//   }
//   else {
//     bigValue = new BigNumber(value);
//   }

//   if (bigValue.isNaN() || !bigValue.isFinite()) {
//     return '0';
//   }

//   if (options.precision || options.precision === 0) {
//     let outputStr = '';
//     if (bigValue.gte(1)) {
//       outputStr = bigValue.toFormat(options.precision, options.roundingMode || BigNumber.ROUND_HALF_CEIL);
//     }
//     else {
//       outputStr = bigValue.toNumber().toLocaleString('en-US', { maximumSignificantDigits: options.precision || 2 });
//     }
//     if (outputStr.length > 18) {
//       outputStr = outputStr.substring(0, 18) + '...';
//     }
//     return outputStr;
//   }

//   return bigValue.toFormat();
// }

export const groupArrayByKey = (arr: [Date | string, string | number][]) => {
  const groups = new Map<string, number | string>();
  for (const [key, value] of arr) {
    const strKey = key instanceof Date ? key.getTime().toString() : key.toString();
    const existingValue = groups.get(strKey);
    if (existingValue !== undefined) {
      if (typeof existingValue === 'number' && typeof value === 'number') {
        groups.set(strKey, existingValue + value);
      } else {
        groups.set(strKey, value);
      }
    } else {
      groups.set(strKey, value);
    }
  }
  return Array.from(groups.entries()).map(([key, value]) => {
    const parsedKey = isNaN(Number(key)) ? key : new Date(Number(key));
    return [parsedKey, value];
  });
}

export const groupByCategory = (data: { [key: string]: any }[], category: string, xAxis: string, yAxis: string) => {
  return data.reduce((result, item) => {
    const _category = item[category];
    if (!result[_category]) {
      result[_category] = {};
    }
    result[_category][item[xAxis]] = item[yAxis];
    return result;
  }, {});
}

export const extractUniqueTimes = (data: { [key: string]: any }[], keyValue: string) => {
  return data.reduce((acc, cur) => {
    if (!acc.hasOwnProperty(cur[keyValue])) {
      acc[cur[keyValue]] = null;
    }
    return acc;
  }, {});
}

export const concatUnique = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
  const merged = { ...obj1, ...obj2 };
  return Object.keys(merged).reduce((acc, key) => {
    if (!acc.hasOwnProperty(key)) {
      acc[key] = merged[key];
    }
    return acc;
  }, {});
}
