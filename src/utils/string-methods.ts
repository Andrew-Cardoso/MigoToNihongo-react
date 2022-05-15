export const isNullOrEmpty = (value?: string): boolean => !value || /^\s*$/.test(value);
