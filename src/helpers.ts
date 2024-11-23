export function wait(mill: number) {
  return new Promise((resolve) => setTimeout(resolve, mill));
}
