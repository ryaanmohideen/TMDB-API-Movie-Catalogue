<template>
  <div class="container">
    <h1 class="title">Cart</h1>
    <div v-if="store.cart.length === 0">Your cart is empty.</div>
    <div v-else>
      <div v-for="movie in store.cart" :key="movie.id" class="cart-item">
        <div class="cart-item-details">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.genre }}</p>
          <p>{{ movie.price }}</p>
        </div>
        <div class="cart-item-image">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            alt="Movie Poster"
          />
        </div>
        <button class="remove-button" @click="removeFromCart(movie.id)">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "../store/index.js";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "CartView",
  setup() {
    const store = useStore();

    function removeFromCart(movieId) {
      store.removeFromCart(movieId);
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

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.cart-item-details {
  flex-grow: 1;
}

.cart-item h2 {
  margin-bottom: 0.5rem;
}

.cart-item p {
  margin-bottom: 0.5rem;
}

.cart-item-image img {
  width: 100px;
  height: auto;
  margin-left: 1rem;
}

.remove-button {
  padding: 0.5rem 1rem;
  background-color: #ff2e63;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
