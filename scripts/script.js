let text = document.querySelector('.intro__text');
let index = document.querySelector('.index');
let intro = document.querySelector('.intro');
window.addEventListener('DOMContentLoaded', (e)=>{
    window.onresize = function(){
        if (window.innerWidth <= 991) {
            index.style.visibility = 'visible';
        } else {
            setTimeout(()=>{
                text.classList.remove('intro__text');
                text.classList.add('display-none');
            },6500);
        }
    };
    setTimeout(()=>{
        // document.body.style.overflowY = 'scroll';
        index.style.visibility = 'visible';
    },6500);

    //Tabs
    let tabs = document.querySelectorAll('.affiches__menu__item'),
        tabsContent = document.querySelectorAll('.affiches__content'),
        tabsParent = document.querySelector('.affiches__menu');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        if(target && target.classList.contains('affiches__menu__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

});

//Seats
var reserved = {};

function renderSeats(){
    let rangeSizes = [15, 17, 19, 19, 19, 19, 19, 20, 20, 20, 21, 21, 10, 14];
    let soldOut = [[1,3], [5,3], [8,9], [8,10]];
    for (var r = 1; r <= rangeSizes.length; r++){
        let range = $("<div/>", { class: 'range range__' + r})
        range.appendTo("#copy");
        $("<div/>", { class: 'booking__choice__range__number', text: r}).appendTo(range);
        for(var n = 1; n <= rangeSizes[r-1]; n++){
            var props = {class: 'ellipse'}
            soldOut.forEach(function(elem) {
                if(elem[0] === r && elem[1] === n) {
                    props = {class: 'ellipse sold'};
                }
            });
            props['r'] = r
            props['n'] = n
            let cell = $("<div/>", props)
            cell.appendTo(range);
            cell.on('click', seatClickHandler);
        }
    }
}
function seatClickHandler(){
    if($(this).hasClass('sold')) return;
    if(!$(this).hasClass('reserved')){
        $(this).addClass('reserved');
        $(this).removeClass('not__reserved');
        reserved['r'+$(this).attr('r')+'-n'+$(this).attr('n')] = true
    } else {
        $(this).removeClass('reserved');
        $(this).addClass('not__reserved');
        delete reserved['r'+$(this).attr('r')+'-n'+$(this).attr('n')]
    }
    renderSeatInfo();
}

function renderSeatInfo(){
    let reservedText = '';
    for(const prop in reserved){
        let pair = prop.split('-');
        let r = pair[0].slice(1);
        let n = pair[1].slice(1);
        reservedText += `Ряд: ${r}, місце: ${n}<br>`;
    }
    $('.booking__choice__info__places').html(reservedText);
}
renderSeats();


$(document).ready(function(){
    $('.ban').slick({
        speed: 2000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../images/icons/left_swipe.svg" alt="left-swipe"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../images/icons/right_swipe.svg" alt="right-swipe"></button>',
        responsive: [{
            breakpoint: 576,
            settings: {
                speed: 1000
            }
        }
        ]
    });

    $('#datepicker').datepicker({
        showOn: "button",
        buttonImage: "images/icons/calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        // numberOfMonths: 2,
        minDate: 0, maxDate: "+1M +10D",
        showAnim: 'slideDown'
    });
    $.datepicker.setDefaults($.datepicker.regional["uk"]);

});
$(function(){
    function applyEffect(selector, effect) {
        $(selector).each(function()
        {
            let imagePos = $(this).offset().top;
            let topOfWindow = $(window).scrollTop();

            if (imagePos < topOfWindow + 900)
            {
                $(this).addClass("animate__" + effect);
            }
        });
    }
    $(window).scroll(function()
    {
        applyEffect('.premiere .premiere__card', 'fadeInRight');
    });
});



