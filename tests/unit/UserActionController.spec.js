import { like, collect } from "@/request/UserActionController";
describe("UserActionController", () => {
  test("对userId:60a754ac634ba154596e8c6d,newsId:cc49548c-f39e-4f4b-bc22-a44aa95f2d85点赞,返回点赞成功", async () => {
    const res = await like(
      "60a754ac634ba154596e8c6d",
      "cc49548c-f39e-4f4b-bc22-a44aa95f2d85"
    );
    expect(res.data.msg).toBe("点赞成功");
  });
  test("对userId:60a754ac634ba154596e8c6d,newsId:cc49548c-f39e-4f4b-bc22-a44aa95f2d85收藏,返回收藏成功", async () => {
    const res = await collect(
      "60a754ac634ba154596e8c6d",
      "cc49548c-f39e-4f4b-bc22-a44aa95f2d85"
    );
    expect(res.data.msg).toBe("收藏成功");
  });
});
