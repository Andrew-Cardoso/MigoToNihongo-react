export const isNullOrEmpty = {
	String: (value?: string): boolean => !value || /^\s*$/.test(value),
	Number: (value?: number): boolean => !value && value !== 0,
	Object: (obj?: Object): boolean => !obj || !Object.entries(obj).length,
};
