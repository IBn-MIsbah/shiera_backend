let time = 10;
let countDown = (tiem) => {
    if(time <= 10 && time > 0){
        console.log(time--);
    } else if (time === 0){
        console.log("Times's up!");
        clearInterval(intervalId)
    }
};
const intervalId = setInterval(countDown,1000);
