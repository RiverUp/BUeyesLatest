import { like, collect } from "@/request/UserActionController";
describe("UserActionController", () => {
  test("对userId:60a754ac634ba154596e8c6d,newsId:556c0115-2f93-4e62-8997-44791e5e5a9e点赞,返回点赞成功", async () => {
    const res = await like(
      "60a754ac634ba154596e8c6d",
      "556c0115-2f93-4e62-8997-44791e5e5a9e"
    );
    expect(res.data.msg).toBe("点赞成功");
  });
  test("对userId:60a754ac634ba154596e8c6d,newsId:556c0115-2f93-4e62-8997-44791e5e5a9e收藏,返回收藏成功", async () => {
    const res = await collect(
      "60a754ac634ba154596e8c6d",
      "556c0115-2f93-4e62-8997-44791e5e5a9e"
    );
    expect(res.data.msg).toBe("收藏成功");
  });
});
