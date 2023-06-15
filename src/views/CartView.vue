<template>
  <Header />
  <div class="container">
    <h1 class="title">Cart</h1>
    <div v-if="store.cart.length === 0" class="empty-cart">Your cart is empty.</div>
    <div v-else>
      <div v-for="movie in store.cart" :key="movie.title" class="cart-item">
        <div class="cart-item-container">
          <div class="cart-item-details">
            <h2>{{ movie.title }}</h2>
            <button class="remove-button" @click="removeFromCart(movie)">Remove</button>
          </div>
          <div class="cart-item-image">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" alt="Movie Poster" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/index.js";
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },
  name: "CartView",
  setup() {
    const store = useStore();

    function removeFromCart(movie) {
      store.removeFromCart(movie);
    }

    return {
      store,
      removeFromCart,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.empty-cart {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cart-item {
  margin-bottom: 1rem;
}

.cart-item-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item h2 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.cart-item-image img {
  width: 100px;
  height: auto;
  margin-left: 1rem;
}

.remove-button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
}

.remove-button:hover {
  background-color: #3a923d;
}

.remove-button:focus {
  outline: none;
}
</style>