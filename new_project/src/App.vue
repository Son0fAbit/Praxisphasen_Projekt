<template>
  <div id="app">
  <v-app>
    <v-app-bar app >
      <v-app-bar-nav-icon @click="toggle=!toggle"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="toggle" bottom color="primary" dark app>
      <v-list nav>
        <v-list-item v-for="item, i of ['start', 'middle', 'end']" :key="i">
          {{item}}
        </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container grid-list-xl>
        <HelloWorld/>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    toggle: null,
  }),
};
</script>
