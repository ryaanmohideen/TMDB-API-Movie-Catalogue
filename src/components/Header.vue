<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
    <header class="header">
      <div class="container">
        <h1 class="logo">My App</h1>
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link to="/login" class="nav-item">Login</router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <style scoped>
  .header {
    background-color: #f1f1f1;
    padding: 20px;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    margin: 0;
    font-size: 24px;
  }
  
  .nav-menu {
    display: flex;
    justify-content: flex-end;
  }
  
  .nav-item {
    margin-left: 20px;
    color: #333;
    text-decoration: none;
  }
  
  .nav-item:hover {
    color: #555;
  }
  </style>
  