export const Logger = {
  log: (message: string): void => {
    console.log(message);
  },
  info: (message: string): void => {
    console.info(message);
  },
  warn: (message: string): void => {
    console.warn(message);
  },
  error: (message: string): void => {
    console.error(message);
  }
};
