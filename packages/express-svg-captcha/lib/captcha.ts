import svgCaptcha, { ConfigObject, CaptchaObj } from "svg-captcha-embed";
export interface CaptchaCreateOptions extends ConfigObject {
  type: "text" | "mathExpr";
  charPresetIgnore: string;
}
export const captchaCreateDefaultOptions: CaptchaCreateOptions = Object.freeze({
  type: "text",
  size: 4, // 验证码长度
  charPresetIgnore: "0o1i",
  noise: 2, // 干扰线条数
  color: true, // 验证码字符颜色
  background: "#fff", // 背景色
});
// 默认的 char preset
export const charPreset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export function createCaptcha(
  options?: Partial<typeof captchaCreateDefaultOptions>
): CaptchaObj {
  const { type, charPresetIgnore, ...opts } = Object.assign(
    captchaCreateDefaultOptions,
    options
  );
  const ignoredCharPreset = removeCharacters(charPreset, charPresetIgnore);
  // 这里由于同时升成 svg 和 text 所以会有一定的性能消耗
  const result =
    type === "text"
      ? svgCaptcha.create({ ...opts, charPreset: ignoredCharPreset })
      : svgCaptcha.createMathExpr({ ...opts, charPreset: ignoredCharPreset });

  return result;
}
export function removeCharacters(
  original: string,
  charactersToRemove: string
): string {
  // 创建一个正则表达式，匹配要删除的字符
  const regex = new RegExp("[" + charactersToRemove + "]", "g");

  // 使用正则表达式的replace方法删除所有匹配的字符
  return original.replace(regex, "");
}
export interface CaptchaValidateOptions {
  captchaText?: string;
  captchaUserInput?: string;
  allowLowerCase?: boolean;
}
class Result {
  constructor(public success: boolean, public error: string | null) {}
}
export function validateCaptcha(options: CaptchaValidateOptions) {
  let result: Result | null = null;
  if (!options.captchaUserInput) {
    result = new Result(false, "captchaUserInput is required");
  }
  if (!options.captchaText) {
    result = new Result(false, "captchaText isn't init");
  }
  if (options.allowLowerCase) {
    options.captchaText = options.captchaText?.toLowerCase?.();
    options.captchaUserInput = options.captchaUserInput?.toLowerCase?.();
  }
  if (options.captchaText !== options.captchaText) {
    result = new Result(false, "captcha is incorrect");
  }
  result = new Result(true, null);
  return result;
}
