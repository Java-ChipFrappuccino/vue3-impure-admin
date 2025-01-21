<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/test1"
              @click="handleTab('push', { title: 'test1', path: '/test1' })"
              >test1</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/test2"
              @click="handleTab('push', { title: 'test2', path: '/test2' })"
              >test2</RouterLink
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/test3"
                  @click="handleTab('push', { title: 'test3', path: '/test3' })"
                  >test3</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/test4"
                  @click="handleTab('push', { title: 'test4', path: '/test4' })"
                  >test4</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/test5"
                  @click="handleTab('push', { title: 'test5', path: '/test5' })"
                  >test5</RouterLink
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useTabBarStore } from "@/stores/tabBar";
const { handleTab } = useTabBarStore();
</script>

<style scoped></style>
