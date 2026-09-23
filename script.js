let cart = [];
let total = 0;

// IMPORTANTE: Insira seu número do WhatsApp abaixo (com DDD, ex: 5511999999999)
const SEU_NUMERO_WHATSAPP = "5500999999999"; 

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.innerText = cart.length;
    cartTotal.innerText = total.toFixed(2);

    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                R$ ${item.price.toFixed(2)}
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    cart.forEach(item => {
        message += `- ${item.name}: R$ ${item.price.toFixed(2)}\n`;
    });
    message += `\n*Total:* R$ ${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}
