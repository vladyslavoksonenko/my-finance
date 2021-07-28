

export const message$ = (html) => {
  // eslint-disable-next-line no-undef
  return M.toast({"html": html})
}

export const error$ = (html) => {
  // eslint-disable-next-line no-undef
  return M.toast({"error": `Error: ${html}`})
}

