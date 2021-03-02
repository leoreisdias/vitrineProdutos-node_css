
async function getData(maxProducts = null) {
    let response = await fetch(`http://localhost:3001${maxProducts ? '?maxProducts=' + maxProducts : ''}`);
    let recommendation = await response.json();

    recommendation.map(category => {
        category.data.map((product, index) => {

            if (!product.esgotado) {
                let isMostPopular = category.title == 'Most Popular' ? true : false;
                let divItem = isMostPopular ? document.querySelector('.section-mostpopular > .carrossel > .items') : document.querySelector('.section-pricereduction > .carrossel > .items')

                let UrlImage = product?.images.imagem1 ? product?.images.imagem1 : product?.images.default;

                divItem.innerHTML +=
                    `<div class='item'>
                        <div class="img-container">
                    ${isMostPopular ?
                        `<span class="ranking">${index + 1}</span>`
                        :
                        `<span class="reduction">${Math.floor(((product.oldPrice - product.price) * 100) / product.oldPrice)}%</span>`
                    }
                    <img src='http:${UrlImage}' />
                    </div>
                    <div class="product-info">
                    <p class="product-name">${product.name.split('-')[0]}</p>
                    <small><s>R$ ${product.oldPrice}</s></small>
                    <p class="price-info">
                        <span>Por <strong>R$ ${product.price}</strong></span>
                        <span class="parcelas">${product.installment.count}x R$ ${product.installment.price}</span>
                    </p>
                    </div>
                </div>`

            }
        })

    })
}

function changeMaxProducts() {
    let maxProducts = document.querySelector('#max-products').value;
    document.querySelectorAll('.items')[0].innerHTML = '';
    document.querySelectorAll('.items')[1].innerHTML = '';
    getData(maxProducts);
}

function leftClickPriceReduction() {
    document.querySelectorAll(".items")[1].scrollLeft -= 200;
}

function rightClickPriceReduction() {
    document.querySelectorAll(".items")[1].scrollLeft += 200;
}

function leftClickMostPopular() {
    document.querySelectorAll(".items")[0].scrollLeft -= 200;
}

function rightClickMostPopular() {
    document.querySelectorAll(".items")[0].scrollLeft += 200;
}



getData();

