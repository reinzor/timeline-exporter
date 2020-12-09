<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-container>
      <b-navbar-brand href="/index.html">Timeline exporter</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.global-options-modal>
            <span class="navbar-icon"><b-icon icon="gear" aria-hidden="true"></b-icon></span>
          </b-nav-item>
          <b-nav-item-dropdown :text="`v${packageVersion}`" right>
            <b-dropdown-item href="https://github.com/reinzor/timeline-exporter">Github</b-dropdown-item>
            <b-dropdown-item href="https://chrome.google.com/webstore/detail/clclfhgnljpjglofofiegloldpiacgod">Chrome extension</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
const PACKAGE_VERSION = require('../../package.json').version;

export default {
  data() {
    return {
      packageVersion: PACKAGE_VERSION
    };
  },
};
</script>

<style scoped>
.navbar-icon {
  font-size: 14px;
}
</style>