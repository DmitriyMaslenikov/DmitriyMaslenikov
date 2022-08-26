export const isNumber = (res: number | undefined): res is number => {
  return res !== undefined;
};

export const isString = (param: string | undefined): param is string => {
  return param !== undefined;
};
