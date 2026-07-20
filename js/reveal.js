const revealElements = document.querySelectorAll('.reveal');
 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);   // only animate once per element
        }
    });
}, {
    threshold: 0.15   // triggers when 15% of the element is visible
});
 
revealElements.forEach(el => observer.observe(el));