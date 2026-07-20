function setupCardDeal(containerSelector, cardSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
 
    const cards = container.querySelectorAll(cardSelector);
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
 
    cards.forEach((card, index) => {
        // Find where this card WOULD sit in the grid
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left - containerRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top - containerRect.top + cardRect.height / 2;
 
        // Distance from grid position back to the "stack" (container center)
        const dx = centerX - cardCenterX;
        const dy = centerY - cardCenterY;
        const randomRotate = (Math.random() * 30 - 15).toFixed(1);   // -15deg to 15deg
 
        // Store the stacked position on the element itself, so we can
        // re-apply it every time the section scrolls OUT of view
        card.dataset.stackTransform = `translate(${dx}px, ${dy}px) rotate(${randomRotate}deg) scale(0.4)`;
 
        // Set the STARTING position (stacked, rotated, invisible)
        card.style.transform = card.dataset.stackTransform;
        card.style.opacity = '0';
        card.style.transitionDelay = `${index * 0.12}s`;   // slower stagger between cards
    });
 
    // Watch the container — deal the cards in, restack them when scrolled away
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Scrolled INTO view -> deal the cards out
                cards.forEach(card => {
                    card.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
                    card.style.opacity = '1';
                });
            } else {
                // Scrolled OUT of view -> reset back to the stacked state
                // so the animation can play again next time
                cards.forEach(card => {
                    card.style.transform = card.dataset.stackTransform;
                    card.style.opacity = '0';
                });
            }
        });
    }, { threshold: 0.2 });
 
    observer.observe(container);
}
 
// Run once the page has fully loaded (so positions are calculated correctly)
window.addEventListener('load', () => {
    setupCardDeal('#container', '.card');            // skills cards
    setupCardDeal('.projectcontainer', '.projectcard'); // project cards
});