import { shallowMount } from "@vue/test-utils";
import NewsTitle from "@/components/NewsTitle.vue";

describe("NewsTitle.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(NewsTitle, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
