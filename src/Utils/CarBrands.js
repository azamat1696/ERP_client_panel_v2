import {computed} from 'vue'
import {useStore} from "vuex";

export default function () {
const $store = useStore();
const brands = computed(() => {
  return JSON.parse(JSON.stringify($store.getters['CarBrandsModule/getCarBrandsState']));
});
const brandsLength = brands.value.length
return {brands,brandsLength}
}
