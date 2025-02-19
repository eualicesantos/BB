document.querySelectorAll(".sidebar ul li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        item.classList.add("active");
    });
});
