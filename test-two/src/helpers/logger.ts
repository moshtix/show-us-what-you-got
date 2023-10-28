
export type LogInput = Parameters<typeof console.log>[0];

export const log = (message: LogInput) => {
  console.log(message);
};
