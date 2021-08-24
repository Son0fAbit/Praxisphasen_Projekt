<template>
  <div id="app">
  <v-app>
    <v-app-bar app >
      <v-app-bar-nav-icon @click="toggle=!toggle"></v-app-bar-nav-icon>
      
      <v-tab to="/">Start</v-tab>
      <v-tab to="/table">Tabelle</v-tab>
      <v-tab to="/task">Kontakt</v-tab>

      <v-toolbar-title>     DX Dashboard</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="toggle" bottom color="primary" dark app>
      <v-list nav>
        <v-list-item v-for="item, i of ['Start', 'Hinzufügen', 'Hilfe']" :key="i">
          {{item}}
        </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container grid-list-xl>
        
        
        <router-view></router-view> 
        
        <!-- <HelloWorld/> -->


      </v-container>
    </v-content>
    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
  
        <v-card-text class="white--text pt-0">
          Das hier ist ein Test-Footer Das hier ist ein Test-Footer Das hier ist ein Test-Footer Das hier ist ein Test-Footer Das hier ist ein Test-Footer  
          Das hier ist ein Test-Footer Das hier ist ein Test-Footer Das hier ist ein Test-Footer Das hier ist ein Test-Footer Das hier ist ein Test-Footer
          Das hier ist ein Test-Footer Das hier ist ein Test-Footer Das hier ist ein Test-Footer
        </v-card-text>
  
        <v-divider></v-divider>
  
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Loh-Serivces</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    toggle: false,

    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],

  }),
};
</script>
