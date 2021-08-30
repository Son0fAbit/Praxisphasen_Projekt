<template>
  <div id="app">
  <v-app>

  <!-- Tabbar -->
  <nav>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggle=!toggle"></v-app-bar-nav-icon>
      
      <!-- <v-tab to="/">Start</v-tab>
      <v-tab to="/table">Tabelle</v-tab>
      <v-tab to="/help">Hilfe</v-tab> -->

      <v-toolbar-title class="font-weight-light" style="font-size: 30px;">NX Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-tab to="/login">Login</v-tab> -->



      <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#e20016"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Login
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Das wird noch ein Login
          </v-card-title>
  
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Anmelden
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>





    </v-app-bar>
  <!-- Tabbar -->

<!-- Navbar = -->
    <v-navigation-drawer app v-model="toggle" bottom color="primary" dark>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
        
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>

        </v-list-item>       
      </v-list>
    </v-navigation-drawer>

    </nav>
<!-- Navbar = -->

    <v-content>
      <v-container grid-list-xl>
        
        <!-- Inhalt der Seite -->
        <router-view></router-view> 
        <!-- Inhalt der Seite -->


      </v-container>
    </v-content>
    
     <!-- Footer -->

    <v-footer
      padless
      color= "#e20016"
      class="justify-center white--text text-center"
    >
      <v-card
        flat
        tile
        color = "#e20016"
        class="white--text text-center"
      >
<!--         <v-card-text>
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
        </v-card-text>
  
        <v-divider></v-divider> -->
  
        <v-card-text class="white--text" >
          {{ new Date().getFullYear() }} — <strong>Loh-Serivces</strong>
        </v-card-text>
      </v-card>


    </v-footer>
  <!-- Footer -->

  </v-app>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  data: () => ({
    toggle: false,
    dialog: false,

      links: [
        {
          icon: "mdi-view-dashboard", text: "Dashboard", route: "/"
        },
        {
          icon: "mdi-help-circle-outline", text: "Help", route: "/help"
        },       
      ],

    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],

  }),
};
</script>
