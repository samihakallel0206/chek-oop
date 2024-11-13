//class handler of Cart
class Cart {
  constructor() {
    this.cpt = 3;
    this.plusButtons = Array.from(document.querySelectorAll(".fa-plus-circle"));
    this.minusButtons = Array.from(
      document.getElementsByClassName("fa-minus-circle")
    );
    this.binButtons = Array.from(
      document.getElementsByClassName("fa-trash-alt")
    );
    this.likeButtons = Array.from(document.querySelectorAll(".fa-heart"));
    this.cards = Array.from(document.querySelectorAll(".card"));

    // Initialize event listeners
    this.addEventListeners();
  }

  // Method to add event listeners
  addEventListeners() {
    this.plusButtons.forEach((button, index) => {
      button.addEventListener("click", () => this.increment(index));
    });

    this.minusButtons.forEach((button, index) => {
      button.addEventListener("click", () => this.decrement(index));
    });

    this.binButtons.forEach((button, index) => {
      button.addEventListener("click", () => this.remove(index));
    });

    this.likeButtons.forEach((button) => {
      button.addEventListener("click", () => this.toggleLike(button));
    });
  }

  // Increment quantity
  increment(index) {
    const quantityElement = this.plusButtons[index].nextElementSibling;
    quantityElement.innerHTML++;
    this.cpt++;
    this.calculateTotalPrice();
  }

  // Decrement quantity
  decrement(index) {
    const quantityElement = this.minusButtons[index].previousElementSibling;
    if (quantityElement.innerHTML > 1) {
      quantityElement.innerHTML--;
      this.cpt > 3 ? this.cpt-- : 0;
      this.calculateTotalPrice();
    }
  }

  // Remove item from cart
  remove(index) {
    this.cards[index].remove();
    this.cpt > 0 ? this.cpt-- : 0;
    this.calculateTotalPrice();
  }

  // Toggle like/dislike
  toggleLike(button) {
    button.style.color = button.style.color === "red" ? "black" : "red";
  }

  // Calculate total price
  calculateTotalPrice() {
    const prices = Array.from(document.querySelectorAll(".unit-price"));
    const quantities = Array.from(document.querySelectorAll(".quantity"));
    let total = 0;

    prices.forEach((priceElt, index) => {
      total += priceElt.innerHTML * quantities[index].innerHTML;
    });

    document.querySelector(".total").innerHTML = total + " $";
    document.getElementById("cptItems").innerHTML = this.cpt;
  }
}

// Instantiate the ShoppingCart class
const cart = new Cart();

