// ---- PURPLE FOG CURSOR TRAIL ----

// Create a canvas that sits on top of everything, but lets clicks pass through
const canvas = document.createElement('canvas');
canvas.id = 'cursor-fog';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';   // lets you still click buttons/links underneath
canvas.style.zIndex = '9999';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Store recent mouse positions as "puffs" of fog
let puffs = [];

document.addEventListener('mousemove', (e) => {
    puffs.push({
        x: e.clientX,
        y: e.clientY,
        radius: 25,
        opacity: 0.35
    });
});

function animate() {
    // Clear the canvas each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and fade each puff
    puffs.forEach((puff, index) => {
        const gradient = ctx.createRadialGradient(
            puff.x, puff.y, 0,
            puff.x, puff.y, puff.radius
        );
        gradient.addColorStop(0, `rgba(180, 100, 255, ${puff.opacity})`);   // purple core
        gradient.addColorStop(1, `rgba(180, 100, 255, 0)`);                // fades to transparent

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
        ctx.fill();

        // Fade out and grow slightly over time, like real fog dispersing
        puff.opacity -= 0.015;
        puff.radius += 0.5;
    });

    // Remove fully faded puffs so the array doesn't grow forever
    puffs = puffs.filter(puff => puff.opacity > 0);

    requestAnimationFrame(animate);
}

animate();