function typeWriter(element, words, typeSpeed = 100, pauseTime = 1500) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
 
    function type() {
        const currentWord = words[wordIndex];
 
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
 
        let speed = isDeleting ? typeSpeed / 2 : typeSpeed;
 
        if (!isDeleting && charIndex === currentWord.length) {
            speed = pauseTime;       // pause when word is fully typed
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;   // move to next word
            speed = 300;
        }
 
        setTimeout(type, speed);
    }
 
    type();
}
 
// Run it on your role heading
document.addEventListener('DOMContentLoaded', () => {
    const roleElement = document.querySelector('.right h2');
    if (roleElement) {
        typeWriter(roleElement, [
            'FULL-STACK DEVELOPER',
            'WEB DEVELOPER',
            'PROBLEM SOLVER'
        ], 80, 1800);
    }
});