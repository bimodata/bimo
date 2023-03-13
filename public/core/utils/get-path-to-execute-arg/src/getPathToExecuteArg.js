function getPathToExecuteArg(executeArgInfo) {
  if (!executeArgInfo) {
    return { defaultValue: '' };
  }
  return { path: executeArgInfo.path ?? `mainExecuteArgs.${executeArgInfo.name}` };
}

module.exports = getPathToExecuteArg;
