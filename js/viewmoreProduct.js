const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

const productId = parseInt(urlParams.get("id"));
console.log(productId);
let popupNone = document.querySelector(".cart");
let popUp = document.querySelector(".popup");
popupNone.addEventListener("click", function () {
  popUp.classList.toggle("popupNone");
});

fetch(`./products.json`)
  .then((res) => res.json())
  .then((product) => {
    const products = product.find((p) => p.id === productId);
    console.log(products);
    if (products) {
      const quantityControls = document.createElement("div");
      quantityControls.className = "quantity-controls";

      const decrementButton = document.createElement("button");
      decrementButton.textContent = "-";

      //! პირველი ღილაკის event-ი. ვამცირებთ პროდუქტის რაოდენობას

      decrementButton.addEventListener("click", () =>
        decrementQuantity(product.id)
      );

      quantityControls.appendChild(decrementButton);
      let minus = document.querySelector(".plus");
      minus.appendChild(quantityControls);

      // input-ი რითიც ვცვლით პროდუქტის რაოდენობას ხელით
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.id = `quantity-${product.id}`;
      quantityInput.value = 1;
      quantityInput.min = 1;
      quantityControls.appendChild(quantityInput);
      const incrementButton = document.createElement("button");
      incrementButton.textContent = "+";

      incrementButton.addEventListener("click", () =>
        incrementQuantity(product.id)
      );
      quantityControls.appendChild(incrementButton);
      let addButton = document.querySelector(".btn3");
      addButton.addEventListener("click", () => {
        // ვიღებთ პროდუქტის რაოდენობას input-იდან და ვინახავთ ცვლადში სახელად quantity
        console.log("hello");

        const quantity = parseInt(
          document.querySelector(`#quantity-${product.id}`).value
        );

        //! გვაქვს პროდუქტის დეტალები დამატებული რაოდენობა, რომელიც უნდა გადავგზავნოთ cart-ის popup-ში.

        addToCart({ ...product, quantity });
      });
      function incrementQuantity(myId) {
        const quantityInput = document.querySelector(`#quantity-${myId}`);
        quantityInput.value = parseInt(quantityInput.value) + 1;
      }

      // მეორე ღილაკის ლოგიკა
      function decrementQuantity(myId) {
        const quantityInput = document.querySelector(`#quantity-${myId}`);
        if (parseInt(quantityInput.value) > 1) {
          quantityInput.value = parseInt(quantityInput.value) - 1;
        }
      }
      function addToCart(product) {
        console.log(product);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const exitingProductIndex = cart.findIndex((p) => p.id === product.id);

        if (exitingProductIndex >= 0) {
          cart[exitingProductIndex].quantity += product.quantity;
        } else {
          cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(product);
        updateCartPopup();
      }
      function calculateTotalPrice(cart) {
        return cart.reduce(
          (sum, p) => sum + Number(p.price) * Number(p.quantity),
          2
        );
      }

      // რაოდენობის გამოსათველელი ფუნქცია
      function calculateTotalQuantity(cart) {
        return cart.reduce((sum, p) => sum + Number(p.quantity), 0);
      }
      function updateCartPopup() {
        let cart = JSON.parse(localStorage.getItem("cart") || []);
        let total = calculateTotalPrice(cart);
        let items = calculateTotalQuantity(cart);

        const popup = document.querySelector(".popup");
        popup.textContent = "";

        cart.forEach((product, index) => {
          const itemElement = document.createElement("div");
          const img = document.createElement("img");
          let ItemsList = document.createElement("div");
          ItemsList.classList.add("ItemsList");
          img.classList.add("listsImg");
          img.src = `./assets/png/${products.img}`;
          itemElement.textContent = `${products.name} - $${products.price}`;
          itemElement.className = "item";

          const button = document.createElement("button");
          button.textContent = "Remove";
          button.addEventListener("click", function () {
            // Removes the item at the specified index // 2 argumenti. pirveli index, meore ramdeni waishalos
            cart.splice(index, 1);
            // Saves the updated cart to local storage
            localStorage.setItem("cart", JSON.stringify(cart));
            // Updates the cart popup to reflect the changes
            updateCartPopup();
          });
          ItemsList.appendChild(img);

          ItemsList.appendChild(itemElement);

          const totalElement = document.createElement("div");
          totalElement.textContent = `Total items: ${items}`;
          ItemsList.appendChild(totalElement);

          const totalPrice = document.createElement("div");
          totalPrice.textContent = `Total Price : $${total}`;
          ItemsList.appendChild(totalPrice);
          popUp.appendChild(ItemsList);
          ItemsList.appendChild(button);
        });
      }

      document.querySelector(
        ".product-img"
      ).src = `./assets/png/${products.img}`;
      document.querySelector(".product-name").textContent = products.name;
      document.querySelector(".description").textContent = products.description;
      document.querySelector(
        ".product-price"
      ).textContent = ` $ ${products.price}`;
      document.querySelector(".featuresInfo").textContent = products.features;
      document.querySelector(
        ".additionalFirst"
      ).src = `./assets/additionalimg/${products.additionalImages[0]}`;
      document.querySelector(
        ".additionalSecond"
      ).src = `./assets/additionalimg/${products.additionalImages[1]}`;
      document.querySelector(
        ".additionalThird"
      ).src = `./assets/additionalimg/${products.additionalImages[2]}`;
    } else {
    }
  });
