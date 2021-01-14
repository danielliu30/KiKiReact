const ValidateLohnMod10 = (number) => {
  let doubledSum = 0;
  for (let i = number.length - 2; i >= 0; i -= 2) {
    let doubled = parseInt(number.charAt(i), 10) * 2;
    if (doubled >= 10) {
      let rem = doubled % 10;

      doubled = parseInt(doubled / 10, 10);

      doubled += rem;
    }
    doubledSum += doubled;
  }

  for (let i = number.length - 1; i >= 0; i -= 2) {
    doubledSum += parseInt(number.charAt(i), 10);
  }

  return doubledSum % 10 === 0;
};

export default ValidateLohnMod10;
