module.exports = function(name) {
  return name.match(/[A-Z]/g).join('');
};