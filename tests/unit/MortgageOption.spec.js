import { shallowMount } from '@vue/test-utils'
import MortgageOption from '@/components/MortgageOption.vue'

const factory = (values = {}) => {
  return shallowMount(MortgageOption, {
    props: {
      ...values
    },
  });
};

describe("MortgageOption.vue", () => {
  it("renders a title for Mortgage Option", () => {
    const wrapper = factory({ title: "some title", symbol: "$", optionValue: 5 });

    expect(wrapper.find(".mortgage-option__title").text()).toEqual(
      "some title"
    );
  });

  it("renders a value for Mortgage Option", () => {
    const wrapper = factory(
      { title: "some title", optionSymbol: "$", optionValue: 5 }
    );

    expect(wrapper.find(".mortgage-option__value").text()).toEqual(
      "5.00 $"
    );
  });

});