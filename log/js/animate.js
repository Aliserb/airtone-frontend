gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const logVideo = document.querySelector('#banner-video');

let logScroll = gsap
    .timeline({
        scrollTrigger: {
            trigger: "#banner__log",
            start: "top",
            scrub: true,
            end: "+=100%",
            markers: true,
            toggleActions: "play none none reverse",
            duration: 2,
            onEnterBack: () => {
                logVideo.pause();
                logVideo.currentTime = 0;
            },
        }
    })
    .to(".banner__log-mask-title", { 
        fontSize: "51vw",
        duration: 1,
    })
    .to(".banner__log-mask-wrapper", { 
        opacity: 0,
        onComplete: function() {
            logVideo.play();
        },
        duration: 1,
    })
    .to(".banner__log_video-text-wrap", {
        opacity: 1,
        visibility: "visible",
        duration: 1,
    })
    

// about log animation
// const aboutLog = document.getElementById('about__log');
// const aboutLogFirstBlock = document.getElementById('about__log_animation');
// const aboutLogImage = document.getElementById("log_block-first_img");

// const logAboutImages = Array.from({ length:486 }, (_, index) => `Анимация_LOG_${index > 100 ? '' : '0'}00${index < 10 ? '0' : ''}${index}-min.png`);

// log sound animation
const soundLog = document.getElementById('log_sound_block');
const soundLogImage = document.getElementById("log__sound-img");

const logSoundImages = Array.from({ length:60 }, (_, index) => `000${index < 10 ? '0' : ''}${index}-min.png`);

// Массив для хранения загруженных изображений
// const logAboutImagesArr = [];
const logSoundImagesArr = [];

// Функция для предзагрузки изображений
function preloadImages(images, callback, templateUrl, arrayImages) {
    let loadedCount = 0;

    function imageLoaded() {
        loadedCount++;
        if (loadedCount === images.length) {
            callback();
        }
    }

    images.forEach((imageUrl, index) => {
        const img = new Image();
        img.onload = () => {
            arrayImages[index] = img;
            imageLoaded();
        };
        img.src = templateUrl + imageUrl;
    });
}

function startAnimation() {
    console.log('все готово');
}

//preloadImages(logAboutImages, startAnimation, '/log/media/log-frames/', logAboutImagesArr);
preloadImages(logSoundImages, startAnimation, '/log/media/log-sound-frames/', logSoundImagesArr);
// конец подготовки


// soundscroll
const logAboutAnimationFirst = document.getElementById('about__log_animation-1');
const logAboutAnimationSecond = document.getElementById('about__log_animation-2');
const logAboutAnimationThird = document.getElementById('about__log_animation-3');
const logAboutAnimationFourth = document.getElementById('about__log_animation-4');

function frameCheck(frame, selector, start, end) {
    if(frame >= start && frame < end) {
        selector.classList.add('active');
    } else if(frame < start || frame > end) {
        selector.classList.remove('active');
    }
}

// const logAboutTimeline = gsap
//     .timeline({
//         scrollTrigger: {
//             trigger: "#about__log",
//             start: "top +20%",
//             end: '+=100%',
//             duration: 20,
//             scrub: true,
//             toggleActions: "play none none reverse",
//             onUpdate: (self) => {
//                 console.log(self);

//                 const totalFrames = logAboutImagesArr.length;
//                 const frame = Math.floor(self.progress * totalFrames);

//                 // Проверка на предварительную загрузку изображений
//                 if (logAboutImagesArr[frame]) {
//                     aboutLogImage.src = logAboutImagesArr[frame].src;
//                 }

//                 // Предварительная загрузка следующего изображения
//                 if (frame < totalFrames - 1 && !logAboutImagesArr[frame + 1]) {
//                     const nextFrame = frame + 1;
//                     const nextImage = new Image();
//                     nextImage.src = `/log/media/log-frames/Анимация_LOG_${nextFrame > 100 ? '' : '0'}00${nextFrame < 10 ? '0' : ''}${nextFrame}-min.png`;
                    
//                     logAboutImagesArr[nextFrame] = nextImage;
//                 }

//                 // first animation
//                 frameCheck(frame, logAboutAnimationFirst, 30, 75);

//                 // second animation
//                 frameCheck(frame, logAboutAnimationSecond, 120, 220);

//                 // Third animation
//                 frameCheck(frame, logAboutAnimationThird, 270, 320);

//                 // fourth animation
//                 frameCheck(frame, logAboutAnimationFourth, 320, 485);
//             },
//         }
//     })

// log sound
const logSoundTimeline = gsap
    .timeline({
        scrollTrigger: {
            trigger: "#log_sound_block",
            start: "top -20%",
            end: '+=100%',
            duration: 20,
            scrub: true,
            toggleActions: "play none none reverse",
            onUpdate: (self) => {
                const totalFrames = logSoundImagesArr.length;
                const frame = Math.floor(self.progress * totalFrames);

                // Проверка на предварительную загрузку изображений
                if (logSoundImagesArr[frame]) {
                    soundLogImage.src = logSoundImagesArr[frame].src;
                }

                // Предварительная загрузка следующего изображения
                if (frame < totalFrames - 1 && !logSoundImagesArr[frame + 1]) {
                    const nextFrame = frame + 1;
                    const nextImage = new Image();
                    nextImage.src = `/log/media/log-sound-frames/000${nextFrame < 10 ? '0' : ''}${nextFrame}-min.png`;
                    
                    logSoundImagesArr[nextFrame] = nextImage;
                }
            },
        }
    })

// log media
const logMedia = document.querySelector('#log__photo_media');
const logMediaVideos = document.querySelectorAll('#log__photo_media video');

let logMediaScroll = gsap
    .timeline({
        scrollTrigger: {
            trigger: logMedia,
            start: "top",
            scrub: true,
            end: "+=100%",
            toggleActions: "play none none reverse",
            duration: 2,
            onEnter: () => {
                logMediaVideos.forEach((video) => {
                    if (typeof video.loop == 'boolean') { // loop supported
                        video.loop = true;
                    } else { // loop property not supported
                        video.addEventListener('ended', function () {
                            this.currentTime = 0;
                            this.play();
                        }, false);
                    }

                    video.play();
                })
            }
        }
    })



const aboutLogImage = document.getElementById("log_block-first_img");
let aboutLogLoadingValue = document.querySelector(".loading-value");

let aboutLogFrameCount = 485;
let aboutLogCurrentFrame = index => (
    `/log/media/log-frames/Анимация_LOG_${(index + 1).toString().padStart(5, '0')}-min.png`
);

let aboutLogImages = []
let aboutLog = {
    frame: 0
};

let imagesToLoad = aboutLogFrameCount;

for (let i = 0; i < aboutLogFrameCount; i++) {
    const aboutLogImg = new Image();
    aboutLogImg.onload = aboutLogOnLoad;
    aboutLogImg.src = aboutLogCurrentFrame(i);
    aboutLogImages.push(aboutLogImg);
}

function aboutLogOnLoad() {
    imagesToLoad--;
    this.onload = null;  
    aboutLogLoadingValue.textContent = Math.round((aboutLogFrameCount - imagesToLoad) / aboutLogFrameCount * 100) + "%"
    
    if (!imagesToLoad) {
        aboutLogRender();
        gsap.to(".loading-container", { autoAlpha: 0 });    
    }
}

gsap.to(aboutLog, {
    frame: aboutLogFrameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        trigger: "#about__log",
        start: "top",
        end: "+=" + (window.innerHeight * 10),
        scrub: 0.5
    },
    onUpdate: aboutLogRender // use animation onUpdate instead of scrollTrigger's onUpdate
});

function aboutLogRender() {
    aboutLogImage.src = aboutLogImages[aboutLog.frame].currentSrc;

    // first animation
    frameCheck(aboutLog.frame, logAboutAnimationFirst, 30, 75);

    // second animation
    frameCheck(aboutLog.frame, logAboutAnimationSecond, 120, 220);

    // Third animation
    frameCheck(aboutLog.frame, logAboutAnimationThird, 270, 320);

    // fourth animation
    frameCheck(aboutLog.frame, logAboutAnimationFourth, 320, 485);
}