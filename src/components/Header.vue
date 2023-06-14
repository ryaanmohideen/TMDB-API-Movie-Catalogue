<template>
  <header class="header">
    <nav class="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/purchase">Purchase</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #333;
  padding: 1rem;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav ul li {
  font-size: 1rem;
}

.nav ul li a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
}

.nav ul li a:hover {
  background-color: #555;
  border-radius: 4px;
}
</style>
