import svgCaptcha, { ConfigObject, CaptchaObj } from "svg-captcha-embed";
export interface CaptchaCreateOptions extends ConfigObject {
  type: "text" | "mathExpr";
  reChars: string;
}
export const captchaCreateDefaultOptions: CaptchaCreateOptions = Object.freeze({
  type: "text",
  size: 4, // 验证码长度
  reChars: "0 o 1 i",
  noise: 2, // 干扰线条数
  color: true, // 验证码字符颜色
  background: "#fff", // 背景色
});
export function createCaptcha(
  options?: Partial<typeof captchaCreateDefaultOptions>
): CaptchaObj {
  const { type, reChars, ...opts } = Object.assign(
    captchaCreateDefaultOptions,
    options
  );
  // 如果出现 0o1i等字样的重新
  let data: any,
    text: string = "";
  while (!text || reChars.includes(text)) {
    const value =
      type === "text"
        ? svgCaptcha.create(opts)
        : svgCaptcha.createMathExpr(opts);
    data = value.data;
    text = value.text;
  }
  return { data, text };
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
