import {watch, ref} from "vue";
import { getEntries } from "../firebase";

export const paginated = (list, pageSize) => {
  console.log("Run UsePaginated")

  const { operations } = getEntries()
  const pageNumber = ref(0)
  const paginatedData = ref(null)
  const pageCount = ref(null)
  const pageAmount = ref([])
  const selectList = ref([])

  const nextPage = () => {
    pageNumber.value++
    console.log(pageNumber.value)
  }

  const prevPage = () => {
    pageNumber.value--
    console.log(pageNumber.value)
  }

  watch(operations,() => {
    console.log(operations.value)
    initPaginated()
    getPageAmount()
    getSelectList()
  })

  watch(pageSize, () => {
    initPaginated()
    getPageAmount()
  })

  watch(pageNumber, () => {
    initPaginated()
  })

  const initPaginated = () => {
    if (operations.value !== null) {
    let start = pageNumber.value * pageSize.value
    let end = start + pageSize.value
    paginatedData.value = operations.value.slice(start, end);
    getPageCount()
    }
  }

  const getPageCount = () => {
    let l = paginatedData.value.length
    let s = pageSize.value
    const result = l / Number(s)
    pageCount.value = result
    return result
  }

  const getPageAmount = () => {
    pageAmount.value = []
    const result = operations.value.length / pageSize.value
    for (let i = 0; i < result; i++) {
      pageAmount.value.push(i)
    }
  }

  const getSelectList = () => {
    if (operations.value.length / 10 >= 1) {
      selectList.value.push(10)
    }
    if (operations.value.length / 50 >= 1) {
      selectList.value.push(50)
    }
    if (operations.value.length / 100 >= 1) {
      selectList.value.push(100)
    }
    selectList.value.push(operations.value.length)
  }

  return {
    nextPage,
    prevPage,
    selectList,
    paginatedData,
    pageNumber,
    pageAmount
  }
}