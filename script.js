
function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}

const menu = document.getElementById("mobile-menu");
const toggleBtn = document.querySelector(".menu-toggle");

function toggleMenu() {
  menu.classList.toggle("hidden");
}

// إغلاق القائمة إذا تم الضغط خارجها
document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
    menu.classList.add("hidden");
  }
});


  let cart = [];

  const addToCartButtons = document.querySelectorAll(".product-card button");
  const cartIcon = document.querySelector(".iconcart");
  const cartBox = document.querySelector(".cart");
  const closeCart = document.querySelector(".close");
  const listCart = document.querySelector(".listcart");
  const totalQuantity = document.querySelector(".totalquantity");

  // فتح السلة
  cartIcon.addEventListener("click", () => {
    cartBox.classList.toggle("show-cart");
  });

  // إغلاق السلة
  closeCart.addEventListener("click", () => {
    cartBox.classList.remove("show-cart");
  });

  // إضافة منتج إلى السلة
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");
      const title = productCard.querySelector("h3").innerText;
      const price = productCard.querySelector("span").innerText;
      const image = productCard.querySelector("img").src;

      const existing = cart.find(item => item.title === title);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ title, price, image, quantity: 1 });
      }

      updateCartUI();
    });
  });

  // تحديث واجهة السلة
  function updateCartUI() {
    listCart.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="info">
          <h4>${product.title}</h4>
          <p>${product.price}</p>
          <div class="qty">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${product.quantity}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove" onclick="removeItem(${index})">remove</button>
      `;
      listCart.appendChild(item);
      total += product.quantity;
    });

    totalQuantity.innerText = total;
  }

  // تغيير الكمية
  function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  }

  // حذف منتج
  function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
  }


  function goToCheckout() {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }
