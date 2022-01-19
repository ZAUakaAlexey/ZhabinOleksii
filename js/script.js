// console.log("Script.js")
'use strict'

let   shoppingCart = [],
      totalGoods = 0,
      overalPrice = 0;

const productsList = document.querySelector('.products-box'),
      items = document.querySelectorAll('.product-box__item'),
      getSpanFromCart = document.querySelector('.top-cart-info__item').querySelectorAll('span'),
      getTypeSelect = document.querySelector('.filter-box').querySelectorAll('select'),
      checkoutBtn = document.querySelector('.top-cart-info').querySelector('button'),
      modalDiv = document.createElement('div'),
      modalInnerHtml = `
  <div>
      <div class="modal-content">
          <form>
              <h1>ОФОРМИТЬ ЗАКАЗ</h1>
              <label>
                <input placeholder="Ваше имя" name="name">
                    <div>
                    </div>
                </label>
                <label>
                <input placeholder="Ваш email" name="email">
                    <div>
                    </div>
                </label>
              <button>Отправить</button>
          </form>
      </div>
  </div>`,

    
    openModal = () => {
    
        document.querySelector('header').insertAdjacentElement('afterbegin', modalDiv);

        modalDiv.innerHTML = modalInnerHtml;
         
        const inputs = modalDiv.querySelectorAll('input'),
              orderBtn = modalDiv.querySelector('button'),
              modalcontent = modalDiv.querySelector('.modal-content');

        modalDiv.style.display = 'block';
        modalDiv.style.position = 'fixed';
        modalDiv.style.paddingTop = '100px';
        modalDiv.style.left = '0px';
        modalDiv.style.right = '0px';
        modalDiv.style.backgroundColor = 'rgb(0,0,0,0)';
        modalDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalDiv.style.width = '100%';
        modalDiv.style.height = '100%';
        modalDiv.style.zIndex = '1';

        modalcontent.style.position = 'relative';
        modalcontent.style.backgroundColor = 'darkorange';
        modalcontent.style.margin = 'auto';
        modalcontent.style.padding = '0px';
        modalcontent.style.border = '2px solid darkgray';
        modalcontent.style.width = '30%';
        modalcontent.style.color = 'white';
        modalcontent.style.borderRadius = '4px';


        orderBtn.addEventListener('click', (e) => {
            e.preventDefault();
                let inputName = inputs[0].value,
                    inputEmail = inputs[1].value;
                if (inputName && inputEmail && inputName.trim().length>0 && inputEmail.trim().length>0) {
                     alert(`${inputName}, благодарим за покупку ${totalGoods} товаров на сумму ${overalPrice}грн`);
                     showTopCartInfo('XXX','XXX');
                    //  modalDiv.innerHTML = '';
                     modalDiv.style.display = 'none';

                } else {
                     alert("поля не заполнены (или заполнены только пробелами)");
                }
            
        }); 
    },

    clearProductsbox = () => {
        productsList.innerHTML = '';
      },

    showTopCartInfo = (cart, sum) => {
    
        getSpanFromCart[0].innerText = cart;
        getSpanFromCart[1].innerText = sum;
    },
    
    addItemtoChart = (id) => {
        const itemPrice = parseInt(items[id].querySelector('.product-box__meta').querySelector('p').innerText, 10),
              itemQTY = parseInt(items[id].querySelector('.product-box__meta').querySelector('input').value, 10),
              itemCategory = items[id].getAttribute('data');
          
       if (itemQTY >= 1) {
           let element = {name: '', category: '', num: 0, price: 0, amount: 0};

            element.name = items[id].querySelector('.product-box__title').innerText;
            element.category = itemCategory;
            element.num = itemQTY;
            element.price = itemPrice;
            element.amount = itemQTY * itemPrice;
            totalGoods += itemQTY;
            overalPrice += itemQTY * itemPrice;
            shoppingCart.push(element);

        } 
        items[id].querySelector('.product-box__meta').querySelector('input').value = '';
        showTopCartInfo (totalGoods, overalPrice);
    },

    selectItems = (select1, select2) => {

        clearProductsbox();

        items.forEach((item) => {
 
            let category = item.getAttribute('data'),
                price = parseInt(item.querySelector('.product-box__meta').querySelector('p').innerText, 10);
            
            if (select1 == 0 && select2 == 0) {
                productsList.appendChild(item);                
            } else if (select1 == 0 && select2 > price) {
                productsList.appendChild(item);
            } else if (select1 == category && select2 == 0) {
                productsList.appendChild(item);
            } else if (select1 == category && select2 > price) {
                productsList.appendChild(item);
            }
        });
    };

// modalDiv.style.display = 'none';
    
document.querySelectorAll('.product-box__btn').forEach((item, id) => {
    item.addEventListener('click', () => {
        addItemtoChart(id);        
    });
});

getTypeSelect.forEach((item) => {
    item.addEventListener('change', () => {
        selectItems(getTypeSelect[0].value, getTypeSelect[1].value);
    });
});


checkoutBtn.addEventListener('click', () => {
    openModal();
});



// 

