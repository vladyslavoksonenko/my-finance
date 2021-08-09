import {ref, onUnmounted} from "vue";

const dateTime = ref(null)
const date = ref(null)
const time = ref(null)
let yearMonth = null
let yearMonthDay = null



  export default function getTime () {
    const result = getNow()
    dateTime.value = `${result.date} ${result.time}`
    date.value = result.date
    time.value = result.time

    const interval = setInterval(() => {
       const result = getNow()
       dateTime.value = `${result.date} ${result.time}`
       date.value = result.date
       time.value = result.time
      yearMonth = result.date.toString().slice(0, -3).replace(/ /g, '-')
      yearMonthDay = result.date.toString().replace(/ /g, '-')
    }, 1000)

    onUnmounted(() => clearInterval(interval))


    return { dateTime, date, time, yearMonth, yearMonthDay }
  }


    const getNow = () => {
      const today = new Date();
      const date = `${today.getFullYear()} ${formatTime(today.getMonth()+1)} ${formatTime(today.getDate())}`;
      const time = `${today.getHours()}:${formatTime(today.getMinutes())}:${formatTime(today.getSeconds())}`;
      return { date, time };
    }

    const formatTime = (number) => {
      if (number < 10) {
        return `0${number}`
      } else {
        return `${number}`
      }
    }


