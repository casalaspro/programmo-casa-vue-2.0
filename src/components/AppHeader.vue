<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <img class="logo-navbar" src="/public/img/logo_programmo_casa_grande.png" alt="">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" :to="{ name: 'home' }">Home</RouterLink>
          </li>
        </ul>
        <ul class="list-unstyled navbar-nav me-3 mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Area Riservata
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="text-decoration-none text-dark dropdown-item" href="http://127.0.0.1:8000/login">
                  <font-awesome-icon :icon="['fas', 'user']" />
                  Accedi
                </a>
              </li>
              <li>
                <a class="text-decoration-none text-dark dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="http://127.0.0.1:8000/admin/dashboard">Pagina Riservata</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@use '../style/partials/header';
</style>