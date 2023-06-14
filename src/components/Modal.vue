<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <div class="modal-inner-container">
        <button class="close-button" @click="$emit('toggleModal')">X</button>
        <div v-if="movie" class="movie-details">
          <div class="movie-poster">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
          </div>
          <div class="movie-info">
            <h1 class="movie-title">{{ movie.title }}</h1>
            <h2 class="movie-date">{{ movie.overview }}</h2>
            <h2 class="movie-date">{{ movie.release_date }}</h2>
            <button class="buy-button" @click="store.addToCart(movie.poster_path, movie.title)">Buy</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import axios from "axios";
import { useStore } from "../store";
import { tmdbApiKey } from '/key.js';

const store = useStore();
const props = defineProps(["id"]);

const movie = (
  await axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
      api_key: tmdbApiKey,
      region: "US",
      language: "en",
      include_adult: false,
    },
  })
).data;
console.log(movie);
</script>

<style scoped>
.modal-outer-container {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5;
}

.modal-inner-container {
  background-color: #f2f2f2;
  width: clamp(280px, 100%, 900px);
  height: 50vh;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #333333;
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
}

.movie-details {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem;
}

.movie-poster img {
  width: 200px;
}

.movie-info {
  display: flex;
  flex-direction: column;
}

.movie-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333333;
}

.movie-date {
  font-size: 1rem;
  color: #666666;
  margin-bottom: 1rem;
}

.buy-button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
