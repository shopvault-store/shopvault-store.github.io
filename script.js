const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

function openProduct(index) {
    // Sačuvaj index proizvoda u localStorage
    localStorage.setItem("selectedProduct", index);
    // Prebaci na stranicu proizvoda
    window.location.href = "sproduct.html";
}



const cartIcon = document.querySelectorAll(".cart");

cartIcon.forEach(icon => {
    icon.addEventListener("click", (e) => {
        e.preventDefault(); // sprečava odlazak na cart.html
        e.stopPropagation(); // sprečava propagaciju događaja

        // Dobavi informacije o proizvodu
        const productElement = e.target.closest(".pro");
        const productName = productElement.querySelector(".des h5").textContent;
        const productPrice = productElement.querySelector(".des h4").textContent;
        const productImg = productElement.querySelector("img").src;

        console.log("productName: " + productName);
        console.log("productPrice: " + productPrice);
        console.log("productImg: " + productImg);

        // Dodaj proizvod u localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ name: productName, price: productPrice, img: productImg });
        localStorage.setItem("cart", JSON.stringify(cart));

        // Prikaži poruku
        const msg = document.getElementById("cart-message");
        msg.classList.remove("hidden");
        msg.classList.add("show");

        setTimeout(() => {
            msg.classList.remove("show");
            msg.classList.add("hidden");
        }, 5000);
    });
});