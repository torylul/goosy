const cases = function () {

    const modalWrapper = document.querySelector('.modal-cart');
    const btnClose = document.querySelector('.close');
    const cartButton = document.querySelector('#cart-button');
    const cardsMenus = document.querySelector('.modal-body');
    const clearCart = document.querySelector('.clear-cart');
    const modalPricetag = document.querySelector('.modal-pricetag');
    const cartPrice = document.querySelector('.modal-pricetag')

    cartButton.addEventListener('click', () => {
        if (localStorage.getItem('basket') != null) {
            cardsMenus.textContent = "";
            modalWrapper.style.display = 'flex';
            const basket = JSON.parse(localStorage.getItem('basket'));
            createManyCardsInCase(basket);
        }
        else {
            modalWrapper.style.display = 'none';
        }
    });

    btnClose.addEventListener('click', () => {
        modalWrapper.style.display = 'none';
        cardsMenus.textContent = "";
    });

    modalWrapper.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modalWrapper.style.display = 'none';
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') { modalWrapper.style.display = 'none'; }
    });

    clearCart.addEventListener('click', () => {
        cardsMenus.textContent = "Корзина пуста";
        cartPrice.textContent = 0;
        localStorage.removeItem('basket');
    });


    function createManyCardsInCase(data) {
        cardsMenus.innerHTML = '';
        getTotalPrice(data)
        data.forEach(item => {
            const card = document.createElement('div');
            card.innerHTML = createCart(item);

            card.querySelector('.plus').addEventListener('click', () => {
                countP(item);
            })

            card.querySelector('.minus').addEventListener('click', () => {
                countM(item)
            })

            cardsMenus.append(card);
        });
        cartPrice.textContent = `${getTotalPrice(data)} ₽`;
    }

    function getTotalPrice(data) {
        return data.reduce((sum, item) => sum += item.price * item.count, 0);
    }



    function countP(basketItem) {
        const basket = JSON.parse(localStorage.getItem('basket')) || []
        const index = basket.findIndex(item => basketItem.id === item.id)

        basket[index].count++
        localStorage.setItem('basket', JSON.stringify(basket))
        getTotalPrice(basket)

        createManyCardsInCase(basket)
    }

    function countM(basketItem) {
        const basket = JSON.parse(localStorage.getItem('basket')) || []
        const index = basket.findIndex(item => basketItem.id === item.id)
        if (basket[index].count != 0) {
            basket[index].count--
        }
        else {
            
        }
        localStorage.setItem('basket', JSON.stringify(basket))
        getTotalPrice(basket)

        createManyCardsInCase(basket)
    }

    function createCart(item) {
        let { id, name, price, count } = item;
        return `
    <div class="food-row">
                <span class="food-name">${name}</span>
                <strong class="food-price">${price * count} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button minus" data-id="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button plus" data-id="${id}">+</button>
                </div>
            </div>
    `
    }

    //localStorage.clear();
}

export { cases }
// document.addEventListener('click', (e) => {
    //     if (e.target.classList.contains('minus')) {
    //         let id = e.target.dataset.id;
    //         // console.log('minus');
    //     }
    //     if (e.target.classList.contains('plus')) {
    //         let id = e.target.dataset.id;
    //         plus(e.target.dataset.id);
    //         // console.log(e.target.dataset.id);
    //         // console.log('plus');
    //     }
    // });