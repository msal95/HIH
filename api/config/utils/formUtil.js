import { isArray, isBoolean, isObject } from 'lodash';
import { fToInteger } from './formatBoolean';

/**
 * Convert the JSON object to FormData() object
 * @param {1} data JSON Object. Only arrays of one nested level are allowed
 * @returns  FormData
 */
export function getFormData(data) {
  const formData = new FormData();
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in data) {
    const value = data[key];
    if (value !== null) {
      if (isBoolean(value)) {
        formData.append(key, fToInteger(value));
      } else if (isArray(value) && value.length > 0) {
        if (isObject(value[0])) {
          let index = 0;
          for (const values of Object.values(value)) {
            for (const [key2, value2] of Object.entries(values)) {
              formData.append(`${key}[${index}][${key2}]`, value2);
            }

            index += 1;
          }
        } else {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
        }
      } else if (isObject(value)) {
        for (const [key2, value2] of Object.entries(value)) {
          formData.append(`${key}[${key2}]`, value2);
        }
      } else if (!isArray(value)) {
        formData.append(key, value);
      }
    }
  }

  return formData;
}
