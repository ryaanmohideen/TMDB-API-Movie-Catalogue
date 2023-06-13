<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue";
import { useStore } from "../store";
import { tmdbApiKey } from '/key.js';

const store = useStore();
const router = useRouter();
const genre = ref(28);
const search = ref("");
const movies = ref(null);
const page = ref(1);
const currentURL = ref("");
const totalPages = ref(0);
const showModal = ref(false);
const selectedRecordId = ref(0);

const toggleModal = (id) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = id;
};

const getTMDBData = async (url, options, page) => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key: tmdbApiKey,
        region: "US",
        language: "en",
        include_adult: false,
        page,
        ...options,
      },
    });
    movies.value = response.data;
    totalPages.value = movies.value.total_pages;
    currentURL.value = url;
  } catch (error) {
    console.log(error);
  }
};

const addToCart = (movie) => {
  store.addToCart(movie);
};

const removeFromCart = (movie) => {
  store.removeFromCart(movie);
};
</script>

<template>
  <div>
    <div class="controls">
      <div>
        <input type="search" placeholder="Enter search items" v-model="search" />
        <button @click="getTMDBData('https://api.themoviedb.org/3/search/movie', { query: search })">
          Search
        </button>
      </div>
      <div>
        <select v-model="genre">
          <option value="28">Action</option>
          <option value="10751">Family</option>
          <option value="878">Science Fiction</option>
          <option value="12">Adventure</option>
          <option value="14">Fantasy</option>
          <option value="10770">TV Movie</option>
          <option value="16">Animation</option>
          <option value="36">History</option>
          <option value="53">Thriller</option>
          <option value="35">Comedy</option>
          <option value="27">Horror</option>
          <option value="10752">War</option>
          <option value="80">Crime</option>
          <option value="10402">Music</option>
          <option value="37">Western</option>
          <option value="99">Documentary</option>
          <option value="9648">Mystery</option>
          <option value="18">Drama</option>
          <option value="10749">Romance</option>
        </select>
        <button @click="getTMDBData('https://api.themoviedb.org/3/discover/movie', { with_genres: genre })">
          Get
        </button>
        <button @click="router.push('/cart')">Cart</button>
      </div>
    </div>
    <div class="pagination">
      <button @click="getTMDBData(currentURL, { query: search }, page === 1 ? 1 : page - 1)">
        Prev
      </button>
      <p>{{ `Page ${page} of ${totalPages}` }}</p>
      <button @click="getTMDBData(currentURL, { query: search }, page >= totalPages ? totalPages : page + 1)">
        Next
      </button>
    </div>
    <div v-if="movies" class="tiles">
      <div v-for="movie in movies.results" :key="movie.id" class="tile">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" @click="toggleModal(movie.id)" />
        <div class="button-container">
          <button @click="addToCart(movie)" class="add-button">Add to Cart</button>
          <button @click="removeFromCart(movie)" class="remove-button">Remove from Cart</button>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="showModal" :id="selectedRecordId" @toggleModal="toggleModal()" />
</template>

<style scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

img {
  width: 200px;
  cursor: pointer;
}

.pagination {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.add-button,
.remove-button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover,
.remove-button:hover {
  background-color: #45a049;
}

.add-button:disabled,
.remove-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.add-button:disabled:hover,
.remove-button:disabled:hover {
  background-color: #cccccc;
}

.add-button:active,
.remove-button:active {
  background-color: #3e8e41;
}
</style>
