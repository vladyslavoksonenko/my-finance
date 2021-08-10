<template>
  <form @submit.prevent="onSubmit" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="formState.email"
            @blur="v$.email.$touch()"
            :class="{'invalid': v$.email.$error}"
        >
        <label for="email">Email</label>
        <small
            v-if="v$.email.$error"
            class="helper-text invalid">Введите корректно Email</small>
        <small
            v-else
            class="helper-text invalid"></small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            @blur="v$.password.$touch()"
            v-model.trim ="formState.password"
            :class="{'invalid': (v$.password.$error)}"
        >
        <label for="password">Пароль</label>
        <small
            v-if="v$.password.$error"
            class="helper-text invalid">Пароль минимум {{ v$.password.minLength.$params.min }} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn auth-submit waves-effect waves-light darken-3"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from  '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import messages from '../utils/messages'
import { useRouter, useRoute } from 'vue-router'
import { message$ } from '../utils/message.plugin'
import { onMounted, reactive } from "vue";
import { useAuth } from "../firebase"

export default {
  name: "Login",
  setup() {
    const { user, isLogin, signIn } = useAuth()
    const route = useRoute()
    const router = useRouter()
    const formState = reactive({
      email: '',
      password: ''
    })
    const rules = {
      email: { email, required },
      password: { minLength: minLength(6), required }
    }

    const v$ = useVuelidate(rules, formState)

    onMounted(() => {
      if (messages[route.query.message]) {
        message$(messages[route.query.message] )
      }
    })

    const onSubmit = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch()
        return
      }

      const result = await signIn(formState.email, formState.password)
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
      formState,
      isLogin,
      user,
      signIn,
      onSubmit,
      v$,
    }
  },
}
</script>

<style scoped>

.mdl-card {
  margin: auto;
}

</style>