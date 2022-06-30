import { getTime } from "@/request/GetTime";

test("getTime()可以获取当前系统时间", () => {
  expect(getTime()).toBe("2022-06-29 15:52");
});
