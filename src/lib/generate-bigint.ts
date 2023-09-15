export const generateRandomBigint = () => {
  const randomNum = BigInt(Math.floor(Math.random() * 10 ** 19)); // generate a random number between 0 and 10^19 - 1
  const bigintStr = randomNum.toString();
  return bigintStr;
};
