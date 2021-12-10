/*


111 Мобильное меню
222  Модальные окна
333 Слайдеры
444 Маски



*/








/*  222  Модальные окна*/

let options = {
    //zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    //displayFog: 'block', //Значение по умолчанию flex
    //displayModal: 'flex', //Значение по умолчанию block
    showModalAnimationName: 'fadeInBottom', 
    closeModalAnimationName: 'fadeOutTop', 
    closeClasses: ['modal__close'], 
    //closeModalOnFogClick: false, 
    showModalAnimationDuration: 800,
    //closeModalAnimationDuration: 300,
    showFogAnimationName: 'fadeIn',
    closeFogAnimationName: 'fadeOut',
    showFogAnimationDuration: 300,
    closeFogAnimationDuration: 300,

    documentScrolled: false, 
    //onModalClose: function(){console.log('modal close');},
    //onModalOpen: function(){console.log('modal open');}

}

let flexModal = {
    //zIndex: 1000, 
    //background: 'rgba(12, 130, 121, 0.5)', 
    //displayFog: 'block', //Значение по умолчанию flex
    displayModal: 'flex', //Значение по умолчанию block
    showModalAnimationName: 'fadeInBottom', 
    closeModalAnimationName: 'fadeOutTop', 
    closeClasses: ['modal__close'], 
    //closeModalOnFogClick: false, 
    showModalAnimationDuration: 800,
    //closeModalAnimationDuration: 300,
    showFogAnimationName: 'fadeIn',
    closeFogAnimationName: 'fadeOut',
    showFogAnimationDuration: 300,
    closeFogAnimationDuration: 300,

    documentScrolled: false, 
    onModalClose: function(){
        setTimeout( ()=>{
            let container = document.querySelector('.video-container__inner');

            let video = container.querySelector('video');
    
            if (video){
                video.remove();
            }
    
            let frame = container.querySelector('iframe');
    
            if (frame){
                frame.remove();
            }
        }, 500)


    },
    //onModalOpen: function(){console.log('modal open');}

}


let videoItems = document.querySelectorAll('.video-list__item');


videoItems.forEach( (item) => {
    item.onclick = function(){

        let container = document.querySelector('.video-container__inner');

        let video = container.querySelector('video');

        if (video){
            video.remove();
        }

        let frame = container.querySelector('iframe');

        if (frame){
            frame.remove();
        }

        
        let modal = new easyModal('modal', flexModal);
        




        switch( this.getAttribute('data-format') ){
            case 'frame': 
                
                container.innerHTML= this.getAttribute('data-src');

                break;
                
            case 'video': 
                let videoTag = document.createElement('video');
                let videoSource = document.createElement('source');
                videoSource.src = this.getAttribute('data-src');
                videoSource.setAttribute('type', 'video/mp4');
                videoTag.append(videoSource);
                videoTag.setAttribute('playsinline', '');
                videoTag.setAttribute('webkit-playsinline', '');
                videoTag.setAttribute('controls', '');
                container.append(videoTag);
        }
    }
})


let showMoreVideos = document.querySelector('.more-videos');
let videoList = document.querySelector('.video-list');

showMoreVideos.onclick = function(){
    let hiddenVideoList = document.querySelectorAll('.video-list__item.hidden-on-mob');
    let delay = 0;
    if (this.getAttribute('data-state') == 'short'){
        hiddenVideoList.forEach( (item) => {
            delay += 250;
            item.remove();
            item.classList.add('show-hidden');
            item.style.animationDelay = delay + 'ms';
            videoList.append(item);
        })

        this.setAttribute('data-state', 'long');
        this.innerHTML = 'Скрыть';
    } else{
        
        hiddenVideoList.forEach( (item) => {
            item.classList.add('hide-item');
            item.onanimationend = function(){
                item.classList.remove('show-hidden');
                item.classList.remove('hide-item');  
                item.removeAttribute('style');          
                item.onanimationend = null;
            }
            this.setAttribute('data-state', 'short');
            this.innerHTML = 'Больше';
        })
    }


    

}

AOS.init();