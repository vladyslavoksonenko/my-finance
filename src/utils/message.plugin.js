
export default {
  install: (app) => {
    app.config.globalProperties.$message = function (html) {
      // eslint-disable-next-line no-undef
      return M.toast({"html": html})
    },
    app.config.globalProperties.$error = function (html) {
      // eslint-disable-next-line no-undef
      return M.toast({"error": `Error: ${html}`})
    }
    app.provide('message')
  }

}