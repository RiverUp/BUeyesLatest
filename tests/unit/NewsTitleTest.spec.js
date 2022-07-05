import { NewsTitle } from "@/components/NewsTitle";
import { mount } from "@vue/test-utils";

describe("NewsTitle", () => {
  test("node", () => {
    {
      const wrapper = mount(NewsTitle);
      var value = wrapper.find({ id: "10" }).value;
      expect(value).toBe("用户信息");
    }
  });
});
