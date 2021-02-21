const validText = (string) => {
  return typeof string === 'string' && string.trim().length > 0 //making sure it is a string and also making sure that it's not empty or string that contains spaces
}

module.exports = validText
