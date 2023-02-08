let menu=document.querySelector('.menu__list');
let burger = document.getElementsByClassName('menu__burger-icon')[0];
window.addEventListener('click', function(e){
    let target2 = e.target;
    if ((target2 != document.getElementsByClassName('page')[0])&&(target2.closest('div').classList.contains('menu__burger-icon')) || (target2.classList.contains('menu__burger-icon')))
    {
        menu.classList.toggle('active');

    }});
;
let animItems = document.querySelectorAll("._anim-items");
        if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
    }
function animOnScroll(){
                for (let i=0; i<animItems.length; i++ ){
                const animItem = animItems[i];
                const animItemHeight=animItem.offsetHeight;
                const animItemOffset = animItem.getBoundingClientRect().top + window.pageYOffset;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if(animItemHeight > window.innerHeight){
                    animItemPoint = window.innerHeight - window.innerHeight / 4;
                }
                if ((window.pageYOffset > (animItemOffset - animItemPoint))&&(window.pageYOffset < (animItemOffset + animItemHeight))){
                    if (animItem.classList.contains('_active')){
                        continue;}
                    else{
                        animItem.classList.add('_active');
                        animItem.classList.add('_no-hide');
                    }
                }
                else{
                    if (!animItem.classList.contains('_no-hide')){
                        animItem.classList.remove('_active');}
                }
            }
}
window.addEventListener('click', function(e){
    let target = e.target;
    if (target == document.querySelector('.main-heading_btn'))
    {
        document.querySelector('.section:nth-child(2)').scrollIntoView({ behavior: 'smooth'});
        animItems[0].classList.add('_active');
    }
});
;
let slyder = document.querySelector('.projects__slider');
classAdder(slyder, 1);
let elemCount = 1;

function classRemover(elem, number){
    elem.querySelector('.slider__link:nth-child('+number+')').classList.remove('active');
    elem.querySelector('.slider__link:nth-child('+(number+1)+')').classList.remove('active');
}
function classAdder(elem, number){
    elem.querySelector('.slider__link:nth-child('+number+')').classList.add('active');
    elem.querySelector('.slider__link:nth-child('+(number+1)+')').classList.add('active');
}
function ElemLengthComparison(slider, firstBorder=undefined, secondBorder=undefined){
        classRemover(slider, elemCount);
        if(firstBorder > secondBorder){
        if (elemCount < firstBorder){
            elemCount += 2;
        }
        else{
            elemCount = secondBorder;
        }}
        else{
            if (elemCount > firstBorder){
                elemCount-= 2;
            }
            else{
                elemCount = secondBorder;
            }
        }
    classAdder(slider, elemCount);
}

window.addEventListener('click', function(e){
    let target = e.target;
    if (target == document.querySelector('span.right'))
    {
        ElemLengthComparison(slyder, 5, 1);
    }
    else if (target == document.querySelector('span.left')){
        ElemLengthComparison(slyder, 1, 5);
    }
} 
);

function rentCategoriesClassAdd(minus=false){
    for (let i = 0; i < rentCategories.length; i++){
        if (rentCategories[i].classList.contains('active')){
            rentCategories[i].classList.remove('active');
            if (!minus){
            if (i+1 == rentCategories.length){
                rentCategories[0].classList.add('active');
            }
            else{
                rentCategories[i+1].classList.add('active');
            }}
            else{
                if (i-1 == -1 ){
                    rentCategories[rentCategories.length-1].classList.add('active');
                }
                else{
                    rentCategories[i-1].classList.add('active');
                }
            }
            break;
        
    }
    }
}
let rentCategories = document.querySelectorAll('.rent__link');
window.addEventListener('load',function(){
    rentCategories[0].classList.add('active');
});
let secondSlyder = document.querySelector('.rent__slider');
let sliderNav = document.querySelector('.card__slider-navigation');
window.addEventListener('click', function(e){
    let target = e.target;
    if (target == sliderNav.querySelector('span.right'))
    {
        rentCategoriesClassAdd();
    }
    else if (target == sliderNav.querySelector('span.left')){
        rentCategoriesClassAdd(true);
    }
} 
);



let catalogCategories = document.querySelectorAll('.catalog__category');
window.addEventListener('load',function(){
    catalogCategories[0].classList.add('active');
});
    for (let i = 0; i < catalogCategories.length; i++){
        window.addEventListener('click', function(e){
            if (e.target == catalogCategories[i]){
                e.preventDefault();
                for (let j = 0; j < catalogCategories.length; j++){
                    catalogCategories[j].classList.remove('active');}
                    
            catalogCategories[i].classList.add('active');
            }
        });
    };