const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);

const productId = parseInt(urlParams.get("id"));
console.log(productId);
fetch(`./products.json`)
  .then((res) => res.json())
  .then((product) => {
    const products = product.find((p) => p.id === productId);
    console.log(products);
    if (products) {
      document.querySelector(
        ".product-img"
      ).src = `./assets/png/${products.img}`;
      document.querySelector(".product-name").textContent = products.name;
      document.querySelector(".description").textContent = products.description;
      document.querySelector(".product-price").textContent = ` $ ${products.price}`;
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
