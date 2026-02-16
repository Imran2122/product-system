console.log("hello Bangladesh");
const loadProduct = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => displayProductBtn(data));
};

const displayProductBtn = (element) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  const categories = ["all", ...element];

  categories.forEach((item) => {
    const button = document.createElement("button");
    button.className = "btn p-3 rounded-2xl m-1";
    button.innerText = item;

    button.addEventListener("click", () => {
      loadProductItem(item);
    });
    productContainer.append(button);
  });
};

const loadProductItem = (category) => {
  let url = "https://fakestoreapi.com/products";

  if (category !== "all") {
    url = `https://fakestoreapi.com/products/category/${category}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoadProductItem(data));
};

const displayLoadProductItem = (products) => {
  const mainProductContainer = document.getElementById("mainProductContainer");
  mainProductContainer.innerHTML=''
  products.forEach((product) => {
    const productCart = document.createElement("div");
    productCart.innerHTML = `
<div class="card bg-base-100 shadow-md hover:shadow-xl  rounded-2xl h-[500px] ">
  
  <!-- Product Image -->
  <figure class="p-4 bg-gray-300   rounded-md">
    <img 
      src="${product.image}"
      alt="Product Image"
      class="h-52 object-contain "
    />
  </figure>

 
  <div class="card-body ">

    <!-- Category & Rating -->
    <div class="flex justify-between items-center text-sm">
      <span class="badge badge-outline capitalize">men's clothing</span>
      <span class=" font-semibold">⭐${product.rating.rate}(${product.rating.count} )</span>
    </div>


    <h2 class="card-title text-base line-clamp-2">
     ${product.title}
    </h2>

   
    <p class="text-sm text-gray-500 line-clamp-2">
      ${product.description.slice(0,100)}
    </p>

    <p class="text-lg font-bold text-primary">
    $ <span> ${product.price}</span>
    </p>

    <!-- Buttons -->
    <div class="flex justify-between mt-3">
      <button  class="btn btn-outline md:px-12">
       <i class="fa-regular fa-eye"></i>  Details
      </button>
      <button class="btn btn-primary md:px-12 ">
       <i class="fa-solid fa-cart-shopping"></i>  Add to Cart
      </button>
    </div>

  </div>
</div>



        `;

    mainProductContainer.append(productCart);
  });
};

loadProduct();
