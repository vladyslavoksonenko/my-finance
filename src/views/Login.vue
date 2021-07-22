<template>
  <form @submit.prevent="onSubmit" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
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
            v-model.trim ="password"
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
            class="btn waves-effect waves-light auth-submit"
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
import { useAuth } from "../firebase"

export default {
  name: "Login",
  setup() {
    const { user, isLogin, signIn } = useAuth()

    return {
      isLogin,
      user,
      signIn,
      v$: useVuelidate()
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations () {
    return {
      email: { email, required },
      password: { minLength: minLength(6), required }
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message] )
    }
  },
  methods: {
    async onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      const result = await this.signIn(formData.email, formData.password)

      if (result.user) {
        this.$message(messages["welcom"])
        this.$router.push('/')
      }

      for (let key in messages) {
        if (result.code === key) {
          this.$message(messages[result.code])
          return
        }
      }

    }
  }
}
</script>

<style scoped>

.mdl-card {
  margin: auto;
}

</style>