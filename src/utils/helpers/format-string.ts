export function formatString(str: string, ...args) {
  let matches = -1;
  return str.replace(/\?\?/, () => {
    matches += 1;
    return args[matches] || '';
  });
}