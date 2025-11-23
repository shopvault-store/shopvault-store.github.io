// ==========================================
// 1. MASTER LISTA PROIZVODA (Jedini izvor istine)
// ==========================================
// Ako menjaš ime/cenu/sliku OVDE, promeniće se svuda.
const produkti = [
    { name: "'Hmm, koji je smisao života', by Shopvault", slika: "img/products/w17.png", cena: "700 RSD" }, // 0
    { name: "Minion figura", slika: "img/products/w18.png", cena: "700 RSD" }, // 1
    { name: "Šrek figura", slika: "img/products/w19.jpg", cena: "700 RSD" }, // 2
    { name: "Pinokio figura", slika: "img/products/w20.jpg", cena: "700 RSD" }, // 3
    { name: "Veštica figura", slika: "img/products/w21.jpg", cena: "700 RSD" }, // 4
    { name: "Gingerbread figura", slika: "img/products/w22.png", cena: "700 RSD" }, // 5
    { name: "Rumpelstiltskin figura", slika: "img/products/w23.jpg", cena: "700 RSD" }, // 6
    { name: "Rumpelstiltskin figura", slika: "img/products/w24.png", cena: "700 RSD" }, // 7
    { name: "Pingvin Vojnik figura", slika: "img/products/w25.png", cena: "700 RSD" }, // 8
    { name: "Pingvin Riko figura", slika: "img/products/w26.png", cena: "700 RSD" }, // 9
    { name: "Osnovi programiranja", slika: "img/products/w1.jpg", cena: "700 RSD" }, // 10
    { name: "Uvod u programiranje", slika: "img/products/w2.jpg", cena: "700 RSD" }, // 11
    { name: "Programski jezik C rešenja zadataka", slika: "img/products/w3.jpg", cena: "700 RSD" }, // 12
    { name: "Java bez oklevanja", slika: "img/products/w4.jpg", cena: "700 RSD" }, // 13
    { name: "Organizacija i arhitektura računara", slika: "img/products/w5.jpg", cena: "700 RSD" }, // 14
    { name: "Zbirka zadataka iz osnova računarske tehnike", slika: "img/products/w6.png", cena: "700 RSD" }, // 15
    { name: "Microsoft Excel 2019 Korak po korak", slika: "img/products/w7.jpg", cena: "700 RSD" }, // 16
    { name: "Zbirka zadataka za pripremu prijemnog ispita", slika: "img/products/w8.jpg", cena: "700 RSD" }, // 17
    { name: "Zbirka zadataka iz linearne algebre", slika: "img/products/w9.jpg", cena: "700 RSD" }, // 18
    { name: "Diskretna matematika 1", slika: "img/products/w10.jpg", cena: "700 RSD" }, // 19
    { name: "Diskretna matematika 2", slika: "img/products/w11.png", cena: "700 RSD" }, // 20
    { name: "Matematička analiza", slika: "img/products/w13.jpg", cena: "700 RSD" }, // 21
    { name: "Udžbenik Engleskog Jezika", slika: "img/products/w14.jpg", cena: "700 RSD" }, // 22
    { name: "Gramatika engleskog jezika", slika: "img/products/w15.jpg", cena: "700 RSD" }, // 23
    { name: "Usmeno i pismeno izražavanje", slika: "img/products/w16.jpg", cena: "700 RSD" } // 24
];

// ==========================================
// 2. NAVIGACIJA
// ==========================================
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){ bar.addEventListener('click', () => { nav.classList.add('active'); }) }
if(close){ close.addEventListener('click', () => { nav.classList.remove('active'); }) }

// Funkcija za otvaranje stranice
function openProduct(index) {
    localStorage.setItem("selectedProduct", index);
    window.location.href = "sproduct.html";
}


// =========================================================
// 3. INJEKCIJA ID-a (RADI PRI UČITAVANJU STRANE)
// =========================================================
// Prolazi kroz sve proizvode na stranici i dodaje im data-product-id atribut
// document.addEventListener('DOMContentLoaded', () => {
//     const productElements = document.querySelectorAll(".pro");

//     productElements.forEach((el) => {
//         const imgElement = el.querySelector("img");

//         if (imgElement) {
//             const imgSrc = imgElement.src;

//             // Tražimo ID iz master liste na osnovu putanje slike
//             const correctId = produkti.findIndex(p => imgSrc.includes(p.slika));

//             if (correctId !== -1) {
//                 // Dodajemo ID u HTML kao standardni atribut
//                 el.setAttribute("data-product-id", correctId);
                
//                 // Osiguravamo da i klik na ceo div vodi na dobru stranicu
//                 el.setAttribute("onclick", `openProduct(${correctId})`);

//             } else {
//                 console.warn(`Proizvod sa slikom ${imgSrc} nije pronađen u master listi!`);
//             }
//         }
//     });
// });


// =========================================================
// 4. LOGIKA KORPE - ČITA ID IZ NOVOG ATRIBUTA
// =========================================================
const cartIcons = document.querySelectorAll(".cart");

cartIcons.forEach(icon => {
    const cartButton = icon.closest("a"); 

    if (cartButton) {
        cartButton.addEventListener("click", (e) => {
            e.preventDefault(); 
            e.stopImmediatePropagation(); 

            const productElement = e.target.closest(".pro");
            
            // 🔥 ČITANJE ID-a IZ NOVOG data-product-id ATRIBUTA
            const productId = parseInt(productElement.getAttribute("data-product-id"));

            // Provera da li je ID validan broj
            if (isNaN(productId) || productId === null) {
                console.error("Greška: ID proizvoda nije ispravan broj.");
                return;
            }

            // Uzimanje podataka iz MASTER liste (po ID-ju)
            const productData = produkti[productId];
            if (!productData) {
                console.error("Nema proizvoda sa tim ID-jem u listi.", productId);
                return;
            }

            // Učitaj korpu
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
            // Provera duplikata
            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex !== -1) {
                // SPAJANJE (Povećaj quantity)
                let currentQty = parseInt(cart[existingProductIndex].quantity) || 1;
                cart[existingProductIndex].quantity = currentQty + 1;
            } else {
                // NOVI ITEM (Dodaj u korpu)
                cart.push({ 
                    id: productId, // Uvek NUMBER
                    name: productData.name, // Uvek iz liste
                    price: productData.cena, 
                    img: productData.slika,
                    quantity: 1 
                });
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));

            // Zelena poruka
            const msg = document.getElementById("cart-message");
            if(msg) {
                msg.classList.remove("hidden");
                msg.classList.add("show");
                setTimeout(() => {
                    msg.classList.remove("show");
                    msg.classList.add("hidden");
                }, 3000);
            }
        });
    }
});