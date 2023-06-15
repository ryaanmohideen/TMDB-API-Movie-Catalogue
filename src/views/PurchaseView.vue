<template>
  <Header />
  <div class="container">
    <div class="search-controls">
      <div class="search-input">
        <input type="search" placeholder="Enter search items" v-model="search" />
        <button @click="getTMDBData('https://api.themoviedb.org/3/search/movie', { query: search })">
          Search
        </button>
      </div>
      <div class="button-container">
        <div class="select-genre">
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
        </div>
        <button @click="getTMDBData('https://api.themoviedb.org/3/discover/movie', { with_genres: genre })">
          Get
        </button>
      </div>
    </div>
    <div class="pagination">
      <button @click="getTMDBData(currentURL, { query: search, with_genres:genre },  page === 1 ? 1 : page - 1)">
        Prev
      </button>
      <p>{{ `Page ${page} of ${totalPages}` }}</p>
      <button @click="getTMDBData(currentURL, { query: search, with_genres:genre  }, page >= totalPages ? totalPages : page + 1)">
        Next
      </button>
    </div>
    <div v-if="movies" class="movie-tiles">
      <div v-for="movie in movies.results" :key="movie.id" class="movie-tile">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" @click="toggleModal(movie.id)" />
      </div>
    </div>
  </div>
  <Modal v-if="showModal" :id="selectedRecordId" @toggleModal="toggleModal()" />
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue";
import { useStore } from "../store";
import Header from '../components/Header.vue';
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
const selectedRecordId = ref(null);

const getTMDBData = async (url, params, selectedPage = 1) => {
  try {
    params = {
      api_key: tmdbApiKey,
      page: selectedPage,
      ...params,
    };
    const response = await axios.get(url, { params });
    movies.value = response.data;
    totalPages.value = response.data.total_pages;
    page.value = selectedPage;
    currentURL.value = url;
  } catch (error) {
    console.error(error);
  }
};

const toggleModal = (recordId = null) => {
  selectedRecordId.value = recordId;
  showModal.value = !showModal.value;
};

getTMDBData("https://api.themoviedb.org/3/discover/movie", { with_genres: genre.value });

</script>

<style scoped>
.select-genre {
  display: inline-block;
  position: relative;
}

.select-genre select {
  appearance: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
}

.select-genre::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-top: 4px solid #333;
  border-right: 4px solid #333;
  transition: transform 0.3s ease;
  pointer-events: none;
}

.select-genre:hover::after {
  transform: translateY(-50%) rotate(45deg);
}

.select-genre select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.select-genre select option {
  color: #333;
  background-color: #f5f5f5;
}

.select-genre select option:hover {
  background-color: #ddd;
}

.search-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-controls input[type="search"] {
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-controls button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.search-controls button:hover {
  background-color: #45a049;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.pagination p {
  margin: 0 1rem;
  font-size: 16px;
}

.movie-tiles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.movie-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-tile img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
</style>
