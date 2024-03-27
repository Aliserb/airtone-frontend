// video block
const videoWrapper = document.getElementById('video_block_section');
const videoElement = document.getElementById('video-bg');
//let videoPlayLimit = 1;

// window.addEventListener('scroll', () => {
//     if(videoPlayLimit > 1) return false;
//     if(this.scrollY + this.innerHeight >= videoElement.offsetTop + videoElement.offsetHeight + 100) return false;

//     if(this.scrollY + this.innerHeight >= videoElement.offsetTop + videoElement.offsetHeight) {
//         videoPlayLimit++;

//         document.body.style.overflow = 'hidden';
//         videoElement.play();

//         videoElement.addEventListener('ended', () => {
//             document.body.style.overflow = 'auto';
//         });
//     } else {
        
//     }
// })

gsap.registerPlugin(ScrollTrigger);
gsap.set(".sound_about_text-1", { opacity: 1 });
gsap.set(".brand_name_image-2-img", {
    width: "44px",
    height: "44px",
});

// unio
let displayWidth = window.innerWidth; // ширина экрана

let unioWidth;
let unioHeight;
let unioPaddingTop;

let setOtionsUnio = () => {
    if(displayWidth >= 960) {
        unioWidth = "245px";
        unioHeight = "232px";
        unioPaddingTop = "84px";
    } else if(displayWidth >= 480) {
        unioWidth = "100px";
        unioHeight = "100px";
        unioPaddingTop = "34px";
    } else if(displayWidth >= 300) {
        unioWidth = "50px";
        unioHeight = "50px";
        unioPaddingTop = "19px";
    }
}

setOtionsUnio();

let setUnioScroll = () => {
    let unioScroll = gsap
        .timeline({
            scrollTrigger: {
            trigger: "#brand_name_section",
            start: "top top",
            scrub: true,
            pin: true,
            end: "+=100%",
            //markers: true,
            }
        })
        .to(".brand_name_row", {
            paddingTop: unioPaddingTop,
        })
        .to(".brand_name_image-2-img", {
            width: unioWidth,
            height: unioHeight,
        })
}

setUnioScroll();

window.addEventListener('resize', (e) => {
    displayWidth = window.innerWidth; // обновлять значение при изменении экрана
    setOtionsUnio();
    setUnioScroll();
});

// sound
let soundVideo = document.getElementById('video-sound');

let soundScroll = gsap.timeline({
    scrollTrigger: {
        trigger: ".sound_about_section",
        start: "top top",
        scrub: true, // Set scrub to true for smoother scrolling effect
        pin: true,
        end: "+=100%",
    }
})
.to(".sound_about_text-1", { opacity: 0 })
.to(".sound_about_text-2", { opacity: 1 });

function once(el, event, fn, opts) {
    var onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
    };
    el.addEventListener(event, onceFn, opts);
    return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
    soundVideo.play();
    soundVideo.pause();
});

once(soundVideo, "loadedmetadata", () => {
    soundScroll.fromTo(
        soundVideo,
        { currentTime: 0 },
        { currentTime: soundVideo.duration || 1 }
    );
});

setTimeout(function () {
    if (window["fetch"]) {
        fetch(src)
        .then((response) => response.blob())
        .then((response) => {
            var blobURL = URL.createObjectURL(response);

            var t = soundVideo.currentTime;
            once(document.documentElement, "touchstart", function (e) {
                soundVideo.play();
                soundVideo.pause();
            });

            soundVideo.setAttribute("src", blobURL);
            soundVideo.currentTime = t + 0.01;
        });
    }
}, 1000);
