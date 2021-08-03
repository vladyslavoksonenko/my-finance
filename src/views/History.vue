<template>
  <div class="app-page">
    <div>
      <div>
        <div class="page-title">
          <h3>История</h3>
        </div>
        <div class="history-table">
          <table class="highlight responsive-table">
            <thead>
            <tr>
              <th v-for="item in typeSorting" :key="item" @click="toggleSort(item)">
                <span class="history-table__title">{{ item.title }}</span>
                <i v-if="item.status ==='down'" class="material-icons icon-filter-history">arrow_drop_down</i>
                <i v-else-if="item.status ==='up'" class="material-icons icon-filter-history">arrow_drop_up</i>
                <i v-else class="material-icons icon-filter-history"></i>
              </th>
            </tr>
            </thead>
            <tbody class="history-table__body">
              <template v-for="(operation) in paginatedData" :key="operation.id">
                <tr>
                  <td>{{ operation.category.title }}</td>
                  <td>{{ operation.description }}</td>
                  <td>
                    <template v-if="operation.type === 'outcome'">
                      <span class="badge red">Расход</span>
                    </template>
                    <template v-else-if="operation.type === 'income'">
                      <span class="badge green">Доход</span>
                    </template>
                  </td>
                  <td>{{ operation.date }}</td>
                  <td>{{ operation.sum }} ₴</td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="row">
<!--            <div class="input-field col s6">-->
<!--              <select class="select-size browser-default" ref="selectTable"  v-model="pageSize">-->
<!--                <option-->
<!--                  v-for="(item, index) in selectList"-->
<!--                  :key="item"-->
<!--                  :selected="index === 0"-->
<!--                >-->
<!--                  {{ item }}-->
<!--                </option>-->
<!--              </select>-->
<!--            </div>-->
            <ul class="pagination col s6">
              <li
                :disabled="pageNumber === 0"
                :class="pageNumber === 0 ? 'disabled' : ''"
              >
                <a @click="prevPage(index)">
                  <i class="material-icons">chevron_left</i>
                </a>
              </li>
              <li
                v-for="item in pageAmount"
                :class="item === pageNumber ? 'active' : ''"
                :key="item"
              >
                <a @click="pageNumber = item">
                  {{`${item + 1}`}}
                </a>
              </li>
              <li :disabled="pageCount < 1" :class="pageCount < 1 ? 'disabled' : ''" class="waves-effect">
                <a @click="nextPage" >
                  <i class="material-icons">chevron_right</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch, reactive} from "vue";
import {getEntries} from "../firebase";

export default {
  name: "History",
  setup () {
    const selectTable = ref(null)
    const operations = ref([])
    const pageSize = ref(10)
    const groupsOperation = ref([])
    const pageNumber = ref(0)
    const paginatedData = ref(null)
    const pageCount = ref(null)
    const pageAmount = ref([])
    const selectList = ref([])


    const gOperations = async () => {
      operations.value = await getEntries()
      initPaginated()
      getPageAmount()
      // getSelectList()
    }
    onMounted(gOperations)

    const nextPage = () => {
      pageNumber.value++
    }
    const prevPage = () => {
      pageNumber.value--
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
      const result = getPageCount()
      for (let i = 0; i < result + 1; i++) {
        pageAmount.value.push(i)
      }
    }

    // const getSelectList = () => {
    //   if (operations.value.length / 10 >= 1) {
    //     selectList.value.push(10)
    //   }
    //   if (operations.value.length / 50 >= 1) {
    //     selectList.value.push(50)
    //   }
    //   if (operations.value.length / 100 >= 1) {
    //     selectList.value.push(100)
    //   }
    //   selectList.value.push(operations.value.length)
    //   getPageAmount()
    // }


    const initPaginated = () => {
      let start = pageNumber.value * pageSize.value
      let end = start + pageSize.value

       paginatedData.value = operations.value.slice(start, end);
      getPageCount()
    }

    watch(pageNumber, initPaginated)
    watch(pageSize, initPaginated)


    const initMSelect = () => {
      // eslint-disable-next-line no-undef
      selectTable.value = M.FormSelect.init(selectTable.value);
    }
    onMounted(initMSelect)


    // Sorting

    const typeSorting = reactive({
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

    const toggleSort = (item) => {
      for (let key in typeSorting) {
        if (typeSorting[key] === item) {
          switch (item.status) {
            case "none":
              item.status = "down"
              break;
            case "down":
              item.status = "up"
              break;
            case "up":
              item.status = "none"
              break;
          }
        } else {
          typeSorting[key].status = "none"
        }
      }
    }

    const sortTable = () => {
      for (let key in typeSorting) {
        if (typeSorting[key].status !== "none") {
          console.log(typeSorting[key])
        } else {
          console.log(typeSorting[key])
          console.log(typeSorting[key])
        }

      }
    }

    watch(typeSorting, sortTable)


    return {
      selectTable,
      pageSize,
      groupsOperation,
      nextPage,
      prevPage,
      paginatedData,
      pageCount,
      pageNumber,
      pageAmount,
      selectList,
      typeSorting,
      toggleSort

    }
  }
}
</script>

<style scoped>

.badge {
  color: white;
  border-radius: 2px;
}

a {
  cursor: pointer;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;

}

.pagination {
  display: flex;
  justify-content: center;
}

.select-size {
  max-width: 100px;
}

.icon-filter-history {
  margin: auto;
  position: absolute;
}

.history-table__title {
  cursor: pointer;
}
</style>