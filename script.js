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



/*
U HTML-u
<section id="page-header">

    <div class="search-wrapper">
        <form>
            <div class="search">
                <span class="search-icon material-symbols-outlined">search</span>
                <input class="search-input" type="search" placeholder="Pretraži" data-search>
            </div>
        </form>
    </div>
      
    </section>
*/

const searchInput = document.querySelector('.search-input');
// Selektujemo sve proizvode jednom, van listener-a, radi bolje performanse.
const products = document.querySelectorAll('.pro');

searchInput.addEventListener('input', e => {
    const value = e.target.value.toLowerCase();
    products.forEach(product => {
        const productText = product.querySelector('.des').textContent.toLowerCase();
        const isVisible = productText.includes(value);
        // Ispravka: koristimo klasu 'hidden' koja je definisana u CSS-u.
        product.classList.toggle('hidden', !isVisible);
    })
})


//dodali smo i ovde
function openProduct(index) {
    // Sačuvaj index proizvoda u localStorage
    localStorage.setItem("selectedProduct", index);
    // Prebaci na stranicu proizvoda
    window.location.href = "sproduct.html";
}