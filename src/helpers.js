/**
 * @description This is a delay function that accepts how many milliseconds you want to wait.
 * @param { number } mill - The time in milliseconds.
 * @returns { Promise<void> } Returns a promise after a delay of X milliseconds.
 */
function wait(mill) {
  return new Promise((resolve) => setTimeout(resolve, mill));
}

export { wait };
