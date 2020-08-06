const toBool = {
  TRUE: true,
  FALSE: false,
};

const toString = {
  true: 'TRUE',
  false: 'FALSE',
};

const splitAtIndex = (string, index) => [
  string.slice(0, index),
  string.slice(index + 1, string.length),
];

const removePrefix = (string, prefix) => string.slice(prefix.length);

const evaluateInnermostBrackets = (string, evaluationFunction) => {
  const [substringBeforeClosingBracket, substringAfterBrackets] = splitAtIndex(
    string,
    string.indexOf(')'),
  );
  const [substringBeforeBrackets, substringInBrackets] = splitAtIndex(
    substringBeforeClosingBracket,
    substringBeforeClosingBracket.lastIndexOf('('),
  );
  const newString = `${substringBeforeBrackets}${
    toString[evaluationFunction(substringInBrackets)]
  }${substringAfterBrackets}`;
  return newString;
};

const toBoolean = (string) => {
  if (string.includes(')')) {
    return toBoolean(evaluateInnermostBrackets(string, toBoolean));
  }
  if (string.startsWith('TRUE OR ')) {
    return true;
  }
  if (string.startsWith('FALSE OR ')) {
    return toBoolean(removePrefix(string, 'FALSE OR '));
  }
  if (string.startsWith('TRUE AND ')) {
    return toBoolean(removePrefix(string, 'TRUE AND '));
  }
  if (string.startsWith('FALSE AND ')) {
    return !toBoolean(removePrefix(string, 'FALSE AND '));
  }
  if (string.startsWith('NOT TRUE')) {
    return toBoolean(string.replace('NOT TRUE', 'FALSE'));
  }
  if (string.startsWith('NOT ')) {
    return !toBoolean(removePrefix(string, 'NOT '));
  }
  return toBool[string];
};

export default toBoolean;
