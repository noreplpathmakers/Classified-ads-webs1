/**
 * Snow Animation for Home 2
 * Creates a premium, calm canvas-based snowfall effect
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snow-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Snow particles
    const snowflakes = [];
    const maxFlakes = 200; // Lower count for premium "calm" feel

    function resize() {
        const parent = canvas.parentElement;
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Snowflake {
        constructor() {
            this.reset();
            this.y = Math.random() * height; // Initial random distribution
        }

        reset() {
            this.x = Math.random() * width;
            this.y = -Math.random() * 50;
            this.size = Math.random() * 3 + 1; // 1 to 4px
            this.speed = Math.random() * 1 + 0.5; // Slow drift
            this.opacity = Math.random() * 0.5 + 0.3;
            this.wind = Math.random() * 0.5 - 0.25; // Slight drift
            this.blur = Math.random() * 2;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;

            // Loop back to top
            if (this.y > height) {
                this.reset();
            }

            // Wrap horizontal
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize flakes
    for (let i = 0; i < maxFlakes; i++) {
        snowflakes.push(new Snowflake());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw background (matching index2 aesthetic)
        // We let the body background handle most of it, but can add a subtle overlay here if needed

        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
