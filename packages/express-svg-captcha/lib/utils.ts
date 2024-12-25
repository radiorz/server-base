export function removeCharacters(
  original: string,
  charactersToRemove: string
): string {
  // 创建一个正则表达式，匹配要删除的字符
  const regex = new RegExp("[" + charactersToRemove + "]", "g");

  // 使用正则表达式的replace方法删除所有匹配的字符
  return original.replace(regex, "");
}
