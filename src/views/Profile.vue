<template>
  <div class="app-page">

    <div>
      <div class="page-title">
        <h3>Профиль</h3>
      </div>

      <form class="form">
        <div class="input-field">
          <input
              id="description"
              type="text"
          >
          <label for="description">Имя</label>
          <span
              class="helper-text invalid">name</span>
        </div>
        <p>
          <label>
            <input name="ru" type="radio" checked />
            <span>Русский</span>
          </label>
        </p>
        <p>
          <label>
            <input name="eng" type="radio" />
            <span>English</span>
          </label>
        </p>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>

</style>