import {computed} from 'vue'
import {useStore} from "vuex";

export default function () {
  const $store = useStore();
  const models = computed(() => {
    return JSON.parse(JSON.stringify($store.getters['CarModelsModule/carModels']));
  });
  const brandsLength = models.value.length

 function filter(brand_id) {
  return  models.value.filter(e => {
      return parseInt(e.brand_id) === parseInt(brand_id)
    })
 }
  return {models,brandsLength}
}
