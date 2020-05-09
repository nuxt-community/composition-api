<template>
  <div>
    <iframe
      :src="`https://codesandbox.io/s/github/${repository}?codemirror=1`"
      style="
        width: 100%;
        height: 500px;
        border: 0;
        border-radius: 4px;
        overflow: hidden;
      "
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
    <div class="buttons-container">
      <a
        class="button"
        :href="`https://codesandbox.io/s/github/${repository}?from-embed`"
      >
        LIVE EDIT
      </a>
      <a
        class="button"
        :href="`https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/${repository}`"
      >
        DOWNLOAD
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    repository() {
      return this.name
    },
  },
})
</script>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.button {
  color: #fff !important;
  border-color: #35495e;
  background-color: #35495e;
  font-size: 16px;
  font-weight: 600;
  padding: 13px 42px 14px;
  min-width: 150px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none !important;
  border-radius: 4px;
  letter-spacing: 1px;
  border: 1px solid #75818b;
}
.button:hover {
  border-color: #2c3c4e;
  background-color: #2c3c4e;
}
</style>
