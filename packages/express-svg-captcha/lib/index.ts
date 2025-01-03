import { Handler, NextFunction, Request, Response } from "express";
import {
  type CaptchaCreateOptions,
  createCaptcha,
  validateCaptcha,
} from "./captcha";
import { CaptchaObj } from "svg-captcha-embed";
declare module "express-session" {
  interface SessionData {
    captcha: string;
  }
}
export const captchaGenerator = (
  options?: Partial<CaptchaCreateOptions>
): Handler => {
  return function captchaGeneratorHandler(req: Request, res: Response) {
    let result: CaptchaObj | null = null;
    try {
      result = createCaptcha(options);
    } catch (error: any) {
      res.status(500).json({
        message: error?.message,
      });
      return;
    }
    if (!result) {
      res.status(500).json({
        message: "captcha create failed",
      });
      return;
    }
    // 存储
    req.session.captcha = result?.text;
    // 返回数据
    res.type("svg");
    res.send(result?.data);
  };
};
export interface CaptchaValidatorOptions {
  allowLowerCase?: boolean;
}
export const captchaValidator = (options?: CaptchaValidatorOptions) => {
  return function captchaValidatorMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.method === "OPTIONS") {
      next();
    }
    const captcha = req.session.captcha;
    delete req.session.captcha;
    const captchaValue = req.body.captcha;
    const result = validateCaptcha({
      captchaText: captcha,
      captchaUserInput: captchaValue,
      allowLowerCase: options?.allowLowerCase,
    });
    if (!result.success) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }
    next();
  };
};
