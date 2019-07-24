<template>
  <v-app>
    <v-content>
      <v-container
        id="scroll-target"
        ref="container"
        class="scroll-y"
        fluid
        grid-list-xs
        pa-1
      >
        <v-layout ref="layout" v-scroll:#scroll-target="onScroll" row wrap>
          <v-flex v-for="url in urls" :key="url" xs6>
            <v-card flat tile @click="(e) => onClick(e, url)">
              <v-img :src="url" height="75px" />
            </v-card>
          </v-flex>
          <v-flex v-if="loadable" ref="indicator" xs12 text-xs-center>
            <v-card flat>
              <v-card-text class="px-0">Loading...</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import browser from 'webextension-polyfill'

export default {
  data() {
    return {
      urls: [],
      page: 0,
      perPage: 10,
      loading: false,
      loadable: true
    }
  },
  computed: {
    enabled: {
      get() {
        return this.$store.state.settings.enabled
      },
      set(value) {
        this.$store.commit('settings/setEnabled', { enabled: value })
      }
    }
  },
  async created() {
    await this.fetch()
    await this.fetch()
  },
  beforeDestroy() {},
  methods: {
    onScroll(e) {
      if (!this.loadable) {
        return
      }
      if (
        e.target.scrollTop + this.$refs.container.offsetHeight >
        this.$refs.layout.offsetHeight - this.$refs.indicator.offsetHeight
      ) {
        this.fetch()
      }
    },
    async onClick(e, url) {
      const converted = this.convert(url)
      const tag = `![LKTM](${converted})`
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
      })
      for (let tab of tabs) {
        await browser.tabs.sendMessage(tab.id, {
          id: 'select',
          data: tag
        })
      }
      window.close()
    },
    convert(url) {
      const matches = url.match(/^(.+_)\d+(\.[0-9a-z]+)$/i)
      return matches[1] + 500 + matches[2]
    },
    async fetch() {
      if (this.loading && !this.loadable) {
        return
      }
      this.loading = true
      this.page++

      const res = await fetch(
        `http://fiahfy.tumblr.com/tagged/kujo+karen/page/${this.page}`
      )
      const text = await res.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'text/html')
      const urls = Array.from(doc.querySelectorAll('.post img')).map((img) =>
        img.getAttribute('src')
      )

      if (!urls.length) {
        this.loadable = false
      }

      this.urls = [...this.urls, ...urls]
      this.loading = false
    }
  }
}
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>

<style scoped>
.application {
  min-width: 300px;
}
.container {
  height: 512px;
}
.v-card {
  cursor: pointer;
}
</style>
