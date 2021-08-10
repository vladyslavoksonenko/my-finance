<template>
  <form @submit.prevent="onSubmit" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="formState.email"
          @blur="v$.email.$touch"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="v$.email.$error">Введите корректно Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model.trim="formState.password"
          @blur="v$.password.$touch"
        >
        <label for="password">Пароль</label>
        <small v-if="v$.password.$error"
          class="helper-text invalid">
          Введите более {{ v$.password.minLength.$params.min }} символов
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model.trim="formState.name"
            @blur="v$.name.$touch"
        >
        <label for="name">Имя</label>
        <small v-if="v$.name.$error" class="helper-text invalid">Введите корректное имя</small>
      </div>
      <p>
        <label>
          <input v-model="formState.isAccepted" type="checkbox" />
          <span>С правилами согласен</span>
        </label>
        <small v-if="v$.isAccepted.$error" class="helper-text invalid">Вы не согласны из правилами</small>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { minLength, email, required } from "@vuelidate/validators";
import { useAuth } from "../firebase";
import messages from "../utils/messages";
import { message$ } from "../utils/message.plugin";
import { reactive } from "vue"
import { useRouter } from "vue-router"


export default {
  name: "Register",
  setup () {
    const { signUp, user } = useAuth()
    const router = useRouter()
    // const route = useRoute()
    const formState = reactive({
      email: '',
      password: '',
      name: '',
      isAccepted: false
    })
    const rules = {
      email: {email, required},
      password: {minLength: minLength(6), required},
      name: {minLength: minLength(2), required},
      isAccepted: {checked: v => v}
    }

    const v$ = useVuelidate(rules, formState)

    const onSubmit = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch()
        return
      }

      const result = await signUp(formState.name, formState.email, formState.password)

      if (result.user) {
        message$(messages["welcom"])
        router.push('/')
      }

      for (let key in messages) {
        if (result.code === key) {
          message$(messages[result.code])
          return
        }
      }
    }


    return {
      user,
      signUp,
      v$,
      onSubmit,
      formState
    }
  },
  // data () {
  //   return {
  //     email: '',
  //     password: '',
  //     name: '',
  //     isAccepted: false
  //   }
  // },
  // validations () {
  //   return {
  //     email: {email, required},
  //     password: {minLength: minLength(6), required},
  //     name: {minLength: minLength(2), required},
  //     isAccepted: {checked: v => v}
  //   }
  // },
  // methods: {
    // async onSubmit () {
    //   if (this.v$.$invalid) {
    //     this.v$.$touch()
    //     return
    //   }
    //   const dataRegistration = {
    //     name: this.name,
    //     email: this.email,
    //     password: this.password
    //   }
    //   const result = await this.signUp(dataRegistration.name, dataRegistration.email, dataRegistration.password)
    //
    //   console.log(result)
    //
    //   if (result.user) {
    //     message$(messages["welcom"])
    //     this.$router.push('/')
    //   }
    //
    //   for (let key in messages) {
    //     if (result.code === key) {
    //       message$(messages[result.code])
    //       return
    //     }
    //   }
    // }
  // }
}
</script>

<style scoped>
.mdl-card {
  margin: auto;
}
</style>