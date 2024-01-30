let x1 = 0;
let y1 = 0;
const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window,
    innerHeight || 0
);
let dist_to_draw = 50;
let delay = 1000;
let fsize = ["1.1rem", "1.4rem", "0.8rem", "1.7rem"];
let rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let selRand = (o) => o[rand(0, o.length - 1)];
let distanceTo = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
let shouldDraw = (x, y) => distanceTo(x1, y1, x, y) >= dist_to_draw;

let addLeaf = (x, y) => {
    const leaf = document.createElement("div");
    leaf.innerHTML = "&#127809";
    leaf.className = "leaf";
    leaf.style.top = `${y + rand(-20, 20)}px`;
    leaf.style.left = `${x}px`;
    leaf.style.fontSize = selRand(fsize);
    leaf.style.transformStyle = "preserve-3d"
    leaf.style.width = "1px"
    leaf.style.height = "1px"
    leaf.style.position = "absolute"
    document.body.appendChild(leaf);
    const fs = 10 + 5 * parseFloat(getComputedStyle(leaf).fontSize);
    leaf.animate(
        {
            translate: `0 ${y + fs > vh ? vh - y : fs}px`,
            opacity: 0,
            transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(
                1,
                500
            )}deg)`,
        },
        {
            duration: delay,
            fill: "forwards",
        }
    );
    setTimeout(() => {
        leaf.remove();
    }, delay);
};

document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    if (shouldDraw(clientX, clientY)) {
        addLeaf(clientX, clientY);
        x1 = clientX;
        y1 = clientY;
    }
});
