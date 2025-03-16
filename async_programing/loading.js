const loading = ()=>{
    let output = ['Loading .', 'Loading . .', 'Loading . . .']
    let index = 0;

    const display = setInterval(()=>{
        console.log(output[index]);
       index = (index + 1) % output.length
    },1000)

    setTimeout(() => {
        clearInterval(display)
        console.log('Time out');
    }, 5000);
};

loading();