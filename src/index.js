document.addEventListener('DOMContentLoaded', function () {
   
    const fadeInUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        fadeInUpObserver.observe(el);
    });

    const slideInLeftObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.slide-in-left').forEach(el => {
        slideInLeftObserver.observe(el);
    });

    const slideInRightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.slide-in-right').forEach(el => {
        slideInRightObserver.observe(el);
    });

    const techSpecObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-tech-spec');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tech-spec-item').forEach(el => {
        techSpecObserver.observe(el);
    });

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-timeline');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach(el => {
        timelineObserver.observe(el);
    });

    document.querySelector('button').addEventListener('click', function () {
        document.querySelector('section:nth-of-type(2)').scrollIntoView({
            behavior: 'smooth'
        });
    });
});