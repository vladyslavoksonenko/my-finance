import {watch, ref} from "vue";

export const paginated = () => {
  const sortOperations = ref([])
  const pageSize = ref(10)
  const pageNumber = ref(0)
  const paginatedData = ref(null)
  const pageCount = ref(null)
  const pageAmount = ref([])
  const selectList = ref([])

  const nextPage = () => {
    pageNumber.value++
  }

  const prevPage = () => {
    pageNumber.value--
  }

  const editPageSize = (size) => {
    pageSize.value = size.value
    pageNumber.value = 0
  }

  const getPaginated = (operations) => {
    sortOperations.value = operations.value
    initPaginated()
    getPageAmount()
  }

  watch(pageSize, () => {
    initPaginated()
    getPageAmount()
  })

  watch(pageNumber, () => {
    initPaginated()
  })

  const initPaginated = () => {
    let start = pageNumber.value * pageSize.value
    console.log(pageSize.value)
    let end = Number(start) + pageSize.value
    console.log(pageSize.value)
    paginatedData.value = sortOperations.value.slice(start, end);
    getPageCount()
  }

  const getPageCount = () => {
    let l = paginatedData.value.length
    let s = pageSize.value
    pageCount.value = l / Number(s)
  }

  const getPageAmount = () => {
    pageAmount.value = []
    const result = sortOperations.value.length / pageSize.value
    for (let i = 0; i < result; i++) {
      pageAmount.value.push(i)
    }
  }

  const getSelectList = () => {
    if (sortOperations.value.length / 10 >= 1) {
      selectList.value.push(10)
    }
    if (sortOperations.value.length / 50 >= 1) {
      selectList.value.push(50)
    }
    if (sortOperations.value.length / 100 >= 1) {
      selectList.value.push(100)
    }
    selectList.value.push(sortOperations.value.length)
  }

  watch(sortOperations, getSelectList)

  return {
    nextPage,
    prevPage,
    selectList,
    paginatedData,
    pageNumber,
    pageAmount,
    getPaginated,
    editPageSize
  }
}