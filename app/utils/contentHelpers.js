import { NONE } from 'app/constants/content';

export function getExpenseParameterValue(value) {
  if (!value) {
    return NONE;
  }

  return value;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
