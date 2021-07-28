import {reactive} from "vue";
import {minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export const getValidateCategoriesForm = (name, limited) => {

const stateCategoriesForm = reactive({
  name: name,
  limited: limited
})
const rules = {
  name: { required },
  limited: { minLength: minLength(1) }
}
const v$ = useVuelidate(rules, stateCategoriesForm)

return { v$, stateCategoriesForm }

}