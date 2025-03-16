
const getTime = ()=>{
    let currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);
};

const showTime = setInterval(getTime, 1000)