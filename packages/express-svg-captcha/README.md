# express-svg-captcha

为 express 添加 svg-captcha 验证码中间件。

## 使用

文档或未及时更新，最新示例请查看仓库 src 的示例。

```typescript
import express from "express";
import { captchaGenerator, captchaValidator } from "../lib";
import session from "express-session";
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/captcha", captchaGenerator());
app.post("/verify", captchaValidator(), (req, res) => {
  console.log(`123`, 123);
  res.send("success");
});
app.listen(3000, () => {
  console.log("服务器已启动，监听端口 3000");
});
```
