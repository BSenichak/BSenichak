tf.ready().then(function () {
    const fileInput = document.querySelector("input");
    fileInput.addEventListener("change", function (event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log(`Обраний файл: ${selectedFile.name}`);
            const img = document.createElement("img");
            console.log(img);
            img.src = URL.createObjectURL(selectedFile);
            document.querySelector(".result").innerHTML = "";
            document.querySelector(".result").append(img);
            let image = document.querySelector("img");
            setTimeout(() => {
                const tensor = tf.browser.fromPixels(image);
                tensor.array().then(function (array2D) {
                    console.log(array2D);
                    let table = document.querySelector("table");
                    table.innerHTML = "";
                    array2D.forEach((row) => {
                        let tr = document.createElement("tr");
                        row.forEach((data) => {
                            let td = document.createElement("td");
                            td.innerHTML = `${data[0]} ${data[1]} ${data[2]}`;
                            td.style.background = `rgb(${data[0]},${data[1]},${data[2]})`;
                            tr.append(td);
                        });
                        table.append(tr);
                    });
                    document.querySelector(".link").innerHTML = ""
                    document.querySelector(".link").append(createDownloadLinkJSON(array2D));
                });
            }, 100);
        }
    });
});

function createDownloadLinkJSON(data) {
    let text = JSON.stringify(data);
    let download = document.createElement("a");
    download.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    download.setAttribute("download", "data.json");
    // download.classList.add = "Btn";
    download.innerHTML = `
    <button class="Btn">
   <svg class="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
   <span class="icon2"></span>
   <span class="tooltip">Download</span>
</button>
    `;
    return download;
}
let icon = 0;
setInterval(() => {
    document
        .querySelector('link[rel="shortcut icon"]')
        .setAttribute("href", `icon/PortalD${icon}.png`);
    icon++;
    icon > 3 ? (icon = 0) : icon;
}, 100);

document.querySelector("table").addEventListener("click", (e)=>{
    navigator.clipboard.writeText(e.target.style.background)
    alertify.log("Copied to clipboard", "", 0);
})
