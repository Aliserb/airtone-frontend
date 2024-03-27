gsap.registerPlugin(ScrollTrigger);

const logVideo = document.querySelector('#banner-video');

let logScroll = gsap
    .timeline({
        scrollTrigger: {
            trigger: "#banner__log",
            start: "top",
            scrub: true,
            end: "+=100%",
            markers: true,
            // pin: true,
            toggleActions: "play none none reverse",
            duration: 2,
            onEnterBack: () => {
                logVideo.pause();
                logVideo.currentTime = 0;
                console.log('leave');
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
            console.log('enter');
        },
        duration: 1,
    })
    .to(window, {
        duration: 3,
        scrollTo: { y: "+=2000" },
    })
    .to(".banner__log_video-text-wrap", {
        opacity: 1,
        visibility: "visible",
        duration: 1,
    })
    