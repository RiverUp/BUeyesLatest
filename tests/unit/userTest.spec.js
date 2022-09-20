import { login } from "@/request/UserController";
test("正常人脸能否登录", () => {
  expect.assertions(1);
  return login(
    "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"
  ).then((res) => {
    expect(res.data.msg).toBe("登录成功");
  });
});