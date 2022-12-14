// let intro = document.querySelector('.intro');
// document.addEventListener('DOMContentLoaded', (e)=>{
//     setTimeout(()=>{
//         intro.classList.remove('intro');
//         intro.classList.add('display-none');
//     },15000);});
let text = document.querySelector('.intro__text');
let intro = document.querySelector('.intro');
window.addEventListener('DOMContentLoaded', (e)=>{
    window.onresize = function(){
        if (window.innerWidth <= 991) {
            intro.style.display = 'none';
            console.log(window.innerWidth);
        } else {
            setTimeout(()=>{
                // text.classList.remove('intro__text');
                // text.classList.add('display-none');
                // index.style.visibility = "visible";
            },6500);
        }
    };
})