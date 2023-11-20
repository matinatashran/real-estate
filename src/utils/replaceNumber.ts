// separate number by ','
const sp = (number: string) => {
  const separatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = separatedNumber?.join(",");
  return joinedNumber || "";
};

// remove separator ','
const rsp = (phrase: string) => {
  const splitedPhrase = phrase.split(",");
  const joinedPhrase = splitedPhrase.join("");
  return joinedPhrase;
};

export { sp, rsp };
