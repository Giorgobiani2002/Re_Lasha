
const productList = document.querySelector(".product-list");

const prevButton = document.querySelector(".prev-button");

const nextButton = document.querySelector(".next-button");

let currentPage = 1;

const limit = 2;

let products = [];
fetch("./products.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    displayProducts();
  });

function displayProducts() {
  productList.innerHTML = "";

  const start = (currentPage - 1) * limit;
  const end = start + limit;

  const productsToDisplay = products.slice(start, end);

  productsToDisplay.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    const allProduct=document.createElement("div");
    allProduct.className="all-product";

    const productName = document.createElement("h2");
    productDiv.appendChild(productName);
    productName.textContent =product.name;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;;

    const productButton = document.createElement("button");
    productButton.textContent = "SEE PRODUCT";
    productButton.classList="btn";
    const imgDiv=document.createElement("div");
    imgDiv.classList="imgDiv"
    const img =document.createElement("img");
    img.src=`./assets/png/${product.img}`;
    imgDiv.appendChild(img);
    productButton.addEventListener("click", function () {
      viewMore(product.id);
    });
    productList.appendChild(productDiv);
    allProduct.appendChild(productName);
    allProduct.appendChild(productDescription);
    allProduct.appendChild(productButton);
    productDiv.appendChild(allProduct)
    productDiv.appendChild(imgDiv);
  });
}

function viewMore(productId) {
  window.location.href = `productlist.html?id=${productId}`;
}

prevButton.addEventListener("click", function () {
  console.log(1);
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    displayProducts();
  }
});

nextButton.addEventListener("click", function () {
  console.log(1);
  if (currentPage < Math.ceil(products.length / limit)) {
    currentPage = currentPage + 1;
    displayProducts();
  }
  

});

