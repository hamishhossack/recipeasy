export default (str, options) => {
  return str.length > 150 ? `${str.substring(0, 150)}...` : str;
};
