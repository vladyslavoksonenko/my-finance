import {onMounted, ref} from "vue";

const time = ref(null)

  export default function getTime () {
     onMounted(() => {
       setInterval(() => {
         time.value = getNow()
      }, 1000)

    })
    return { time }
  }



    const getNow = () => {
      const today = new Date();
      const date = `${today.getFullYear()} ${(today.getMonth()+1)} ${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const dateTime = `${date} ${time}`;
      return dateTime

    }
    //onUnmounted(() => clearInterval(interval))


