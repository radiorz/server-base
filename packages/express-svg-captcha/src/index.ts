import express from "express";
import { captchaGenerator, captchaValidator } from "../lib";
import session from "express-session";
const app = express();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/captcha", captchaGenerator());
app.post("/verify", express.json(), captchaValidator(), (req, res) => {
  console.log(`123`, 123);
  res.send("success");
});
app.listen(3000, () => {
  console.log("服务器已启动，监听端口 3000");
});
