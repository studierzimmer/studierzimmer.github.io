module.exports = function removeInheritedIgnoreRules(git) {
  return git.exec("rm", "-f", "--ignore-unmatch", ".gitignore");
};
