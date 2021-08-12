// Sorting
import {ref, reactive} from "vue";

export default function useSortOperations() {
  const resultSortOperations = ref([])
  const typeSorting = reactive ({
    categories: {
      title: "Категории",
      status: "none",
    },
    description: {
      title: "Описание",
      status: "none",
    },
    type: {
      title: "Тип",
      status: "none",
    },
    date: {
      title: "Дата",
      status: "none",
    },
    sum: {
      title: "Сумма",
      status: "none",
    }
  })

  const toggleSort = (operations, item) => {
    for (let key in typeSorting) {
      if (typeSorting[key] !== item && item !== typeSorting.categories && item !== typeSorting.description ) {
        typeSorting[key].status = "none"
      }
    }
    for (let key in typeSorting) {
      if (typeSorting[key] === item && item !== typeSorting.categories && item !== typeSorting.description ) {
        switch (item.status) {
          case "none":
            item.status = "down"
            break;
          case "down":
            item.status = "up"
            break;
          case "up":
            item.status = "down"
            break;
        }
        chooseSortTable(item, operations)
      }
    }
  }

  const chooseSortTable = (item, operations) => {
    if (item.title === "Тип") {
      sortType(item.status, operations)
    }
    if (item.title === "Дата") {
      sortDate(item.status, operations)
    }
    if (item.title === "Сумма") {
      sortSum(item.status, operations)
    }
  }


  const sortType = (status, operations) => {
    if (status === "down") {
      resultSortOperations.value = operations.value.sort((a, b) => {
        if (a.type > b.type) {
          return 1
        }
        if (a.type < b.type) {
          return -1
        }
        return 0
      })
    }
    if (status === "up") {
      resultSortOperations.value = operations.value.sort((a, b) => {
        if (a.type < b.type) {
          return 1
        }
        if (a.type > b.type) {
          return -1
        }
        return 0
      })
    }

  }

  const sortDate = (status, operations) => {
    if (operations.value !== null) {
      if (status === "down") {
        resultSortOperations.value = operations.value.sort((a, b) => {
          const dateA = a.date.replace(/-/g, "")
          const dateB = b.date.replace(/-/g, "")
          if (dateA < dateB) {
            return 1
          }
          if (dateA > dateB) {
            return -1
          }
          return 0
        })
      }
      if (status === "up") {
        resultSortOperations.value = operations.value.sort((a, b) => {
          const dateA = a.date.replace(/-/g, "")
          const dateB = b.date.replace(/-/g, "")
          if (dateA < dateB) {
            return -1
          }
          if (dateB > dateB) {
            return 1
          }
          return 0
        })
      }
    }

  }

  const sortSum = (status, operations) => {
    if (status === "down") {
      resultSortOperations.value = operations.value.sort((a, b) => {
        const dateA = parseInt(a.sum)
        const dateB = parseInt(b.sum)
        if (dateA < dateB) {
          return 1
        }
        if (dateA > dateB) {
          return -1
        }
        return 0
      })
    }
    if (status === "up") {
      resultSortOperations.value = operations.value.sort((a, b) => {
        const dateA = parseInt(a.sum)
        const dateB = parseInt(b.sum)
        if (dateA < dateB) {
          return -1
        }
        if (dateB > dateB) {
          return 1
        }
        return 0
      })
    }

  }

  return {
    typeSorting,
    toggleSort,
    resultSortOperations,
    chooseSortTable,
  }

}

// Все передаю через параметры!!! РЕВ
