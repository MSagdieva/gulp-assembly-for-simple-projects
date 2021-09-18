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
