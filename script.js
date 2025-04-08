
        const carousel = document.querySelector('.carousel');
 
        let isDragging = false,startX,startScrollLeft,timeoutId;
 
 
        const firstCardWidth = carousel.querySelector('.card').offsetWidth;
 
        const wrapper = document.querySelector(".wrapper");
 
        const dragStart = (e) =>{
            isDragging = true;
            carousel.classList.add('dragging');
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }
 
        const dragging = (e) => {
            if(!isDragging) return;
            carousel.scrollLeft = startScrollLeft-(e.pageX - startX);
        }
 
        const dragStop = () =>{
            isDragging = false;
            carousel.classList.remove('dragging');
        }
 
        const arrowBtns = document.querySelectorAll(".wrapper .i");
 
        arrowBtns.forEach(btn =>{
            btn.addEventListener("click",() =>{
                carousel.scrollLeft += btn.id === "left"? -firstCardWidth : firstCardWidth;
            });
        });

        const autoPlay = () => {
            if(window.innerWidth<800) return;
            timeoutId = setTimeout(()=>carousel.scrollLeft += firstCardWidth,2500);
        }
        autoPlay();
 
        carousel.addEventListener('mousedown',dragStart);
        carousel.addEventListener('mousemove',dragging);
        carousel.addEventListener('mouseup',dragStop);
     

       
        const carouselChildrens = [...carousel.children];
        let cardPreView = Math.round(carousel.offsetWidth/firstCardWidth);
 
        carouselChildrens.slice(-cardPreView).reverse().forEach(card =>{
            carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
        });
 
        carouselChildrens.slice(0,cardPreView).forEach(card =>{
            carousel.insertAdjacentHTML("beforeend",card.outerHTML);
        });
 
        const InfiniteScroll = () =>{
            if(carousel.scrollLeft === 0){
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2* carousel.offsetWidth);
            carousel.classList.remove("no-transition");
            }
            else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }
            clearTimeout(timeoutId);
            if(!wrapper.matches(":hover")) autoPlay();

            wrapper.addEventListener("mouseenter",() => clearTimeout(timeoutId));
            wrapper.addEventListener("mouseleave",autoPlay);
        }
 
        carousel.addEventListener("scroll",InfiniteScroll);
 
