
  let cart = JSON.parse(localStorage.getItem("cartData")) || [];

  const checkoutList = document.getElementById("checkoutList");
  const totalQuantity = document.querySelector(".totalQuantity");
  const totalPrice = document.querySelector(".totalPrice");

  let quantity = 0;
  let price = 0;

  // عرض المنتجات من السلة
  if (cart.length === 0) {
    checkoutList.innerHTML = "<p>السلة فارغة.</p>";
  } else {
    cart.forEach((product, index) => {
      quantity += product.quantity || 1;
      const rawPrice = parseFloat(product.price.replace(/[^\d]/g, ""));
      price += rawPrice * (product.quantity || 1);

      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
        <img src="${product.image || ''}" alt="product">
        <div>${product.title}</div>
        <div>x${product.quantity || 1}</div>
        <div>${product.price}</div>
      `;
      checkoutList.appendChild(item);
    });
  }

  // عرض الكمية والسعر الكلي
  totalQuantity.textContent = quantity;
  totalPrice.textContent = price + " DZD";

  // إرسال الطلب إلى Telegram
  function sendOrderToTelegram() {
    if (cart.length === 0) {
      showAlert("السلة فارغة!");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value;
    const currency = document.getElementById("currency").value;

    if (!name || !phone || !address || !city || !currency) {
    showAlert("يرجى ملء جميع الحقول.");
    return;
  }

    let message = "🛒 طلب جديد من Al Rayhan House:\n\n";
    cart.forEach((product, index) => {
      message += `${index + 1}. ${product.title} - ${product.price} x${product.quantity || 1}\n`;
    });
  message += `\n👤 الاسم: ${name}\n📞 الهاتف: ${phone}\n🏙️ الولاية: ${city}\n📍 العنوان: ${address}\n💰 العملة: ${currency}`;


    const token = "8217675052:AAF6c9F08yF3D2IK-qz2i9BJqsYpHRcs048"; // ← استبدله بتوكن بوتك
    const chatId = "1786977941"; // ← استبدله بـ chat ID الخاص بك

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    })
    .then(response => {
      if (response.ok) {
        showAlert("✅ تم إرسال الطلب بنجاح!");
        localStorage.removeItem("cartData");
        location.reload();
      } else {
        showAlert("❌ حدث خطأ أثناء إرسال الطلب.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      showAlert("⚠️ فشل الاتصال بـ Telegram.");
    });
  }

  document.querySelector(".buttonCheckout")?.addEventListener("click", function () {
    sendOrderToTelegram();
  });


  function isInvalidInput(value) {
    const trimmed = value.trim();
    return (
      trimmed.length < 3 ||
      /^([a-zA-Z\u0621-\u064A])\1{2,}$/.test(trimmed) || // نفس الحرف مكرر أكثر من 3 مرات
      /(.)\1{2,}/.test(trimmed) ||                      // أي رمز مكرر
      /^(ض)+$/.test(trimmed) ||                         // فقط "ضضضض"
      trimmed === "asd" || trimmed === "test" || trimmed === "xxx"
    );
  }
  function showAlert(message, color = "#333") {
  const alertBox = document.getElementById("custom-alert");
  alertBox.style.backgroundColor = color;
  alertBox.textContent = message;
  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}

  function sendOrderToTelegram() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value;
  const currency = document.getElementById("currency").value;

  if (!name || !phone || !address || !city || !currency) {
    showAlert("يرجى ملء جميع الحقول.");
    return;
  }

  if (isInvalidInput(name)) {
    alert("يرجى إدخال اسم صالح.");
    return;
  }

  if (!/^[0-9]{8,13}$/.test(phone)) {
    showAlert("يرجى إدخال رقم هاتف صالح.");
    return;
  }

  if (isInvalidInput(address)) {
    showAlert("يرجى إدخال عنوان صالح.");
    return;
  }

  let message = `🛒 طلب جديد من Al Rayhan House:\n\n`;
  cart.forEach((product, index) => {
    message += `${index + 1}. ${product.title} - ${product.price} x${product.quantity || 1}\n`;
  });

  message += `\n👤 الاسم: ${name}\n📞 الهاتف: ${phone}\n🏙️ الولاية: ${city}\n📍 العنوان: ${address}\n💰 العملة: ${currency}`;

  const token = "8217675052:AAF6c9F08yF3D2IK-qz2i9BJqsYpHRcs048"; // توكن البوت
  const chatId = "1786977941"; // معرف الشات

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  })
  .then(response => {
    if (response.ok) {
      showAlert("✅ تم إرسال الطلب بنجاح!");
      localStorage.removeItem("cartData");
      location.reload();
    } else {
      alert("❌ حدث خطأ أثناء إرسال الطلب.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("⚠️ فشل الاتصال بـ Telegram.");
  });
}


