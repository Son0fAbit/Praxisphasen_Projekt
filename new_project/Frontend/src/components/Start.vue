<template>
  <!-- <v-container>  -->
      
      
      <div class="start">
        <div key="headline">
          <h1> 
              Database tab:</h1>
          <p1>Under this tab you can view all redirects and add new ones, <br> 
              to add a new one press the "Add Redirect" button and fill in the following form.<br>
              in the input field "Search" you can also search for a specific redirect. <br>
              do you want to limit a search result to one domain? then please use the domain filter dropdown-menu. <br> <br> </p1>	
      </div>
          <v-data-table
      :headers="headers"
      :items="links"
      :search="search"
      :footer-props="{
        'items-per-page-options':[5,10,20,50,-1]
      }"
      sort-by="Target-URL"
      class="elevation-1"
      
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >

<!-- //SEARCH -->
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

          <v-select
          :items="filters"
          v-model="filter"
          append-icon="mdi-filter"
          label="Filter"
          single-line
          hide-details
          @input="filterDomain()"
        ></v-select>

        
        <v-spacer></v-spacer>

          <v-dialog
            v-model="dialog"
            max-width="1000px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#DF4252"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add Redirect
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <div>
                    <v-alert class="mt-2 mb-2"  dense type="error" :value="alert" transition="slide-y-transition" >
                      Please fill out the whole form
                    </v-alert> 
                </div>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.from"
                        label="Target-URL"
                        clearable
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col> -->
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.to"
                        label="Destination-URL"
                        clearable
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                      :items="items"
                        v-model="editedItem.domain"
                        label="Domain"
                      ></v-select>


                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    </v-col>
                  </v-row>
                  <v-row>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                      :items="status"
                        v-model="editedItem.status"
                        label="HTML status code"
                      ></v-select>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.comment"
                        label="Comment"
                        clearable
                      ></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="reset"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>


      </div> 
      
      
      <!-- </v-container> -->
</template>

<script>

  const db = require ("../dblogic/dbreq");

  export default {
    name: 'Table',

    data: () => ({

      //Importing db functions
       
      alert: false,
      items: ['rittal.de', 'loh-services.com', 'lkh.de', 'loh-academy.com', 'stahlo.de'],
      filters: ['SHOW ALL','rittal.de', 'loh-services.com', 'lkh.de', 'loh-academy.com', 'stahlo.de'],
      status: ['StatusCode 1', 'StatusCode 2', 'StatusCode 3', 'StatusCode 4', 'StatusCode 5'],

      filter: 'SHOW ALL',
      search: '',

      dialog: false,
      dialogDelete: false,


      headers: [
      {
        text: 'Target-URL',
        align: 'start',
        //sortable: false,
        value: 'from',
      },
      //{ text: 'Calories', value: 'calories' },
      { text: 'Destination-URL', value: 'to' },
      { text: 'Domain', value: 'domain' },
      { text: 'created', value: 'created' },
      { text: '', value: 'actions', sortable: false },
      ],

      links: [],

        editedIndex: -1,
        editedItem: {
        from: '',
        to: '',
        domain: '',
        created: '',
        status:'',
        comment:'',
        },
        defaultItem: {
        from: '',
        to: '',
        domain: '',
        created: '',
        status:'',
        comment:'',
        },
    }),

    computed: {
        formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog (val) {
        val || this.close()
        },
        dialogDelete (val) {
        val || this.closeDelete()
        },
    },

    async created () {
        
        this.links = await this.initalize();
    },

    methods: {

          async initalize(){
          var links = await db.getLinks()
          return new Promise((resolve) => {
            resolve(links)
          })
        },

        reset(){
          this.filter = this.filters[0]
          this.filterDomain()
          return this.links
        },
        

        editItem (item) {
        this.editedIndex = this.links.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        },

        async filterDomain(){
          console.log(this.filter)
          if(this.filter == this.filters[0]){
            this.links = await db.getLinks()
          } else {
            this.links = await db.getLinksbyDomain(this.filter)
          }
        },

        deleteItem (item) {
        this.editedIndex = this.links.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        },

        deleteItemConfirm () {
        db.deleteLink(this.links[this.editedIndex].id)
        this.links.splice(this.editedIndex, 1)
        this.closeDelete()
        },

        close () {
        this.dialog = false
        this.alert = false
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
        },

        closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
        },

        async save () {

        if(this.editedItem.from == this.defaultItem.from || this.editedItem.to == this.defaultItem.to || this.editedItem.domain == this.defaultItem.domain || this.editedItem.status == this.defaultItem.status ){
          this.alert = true;
          return
        }
        if (this.editedIndex > -1) {

            let errormessage = await db.updateLink(this.links[this.editedIndex].id,this.editedItem)
            if(typeof errormessage != 'undefined'){
              alert(errormessage)
            }
            Object.assign(this.links[this.editedIndex], this.editedItem)
        } else {
            db.insertLink(this.editedItem)

            //Übergangslösung, es werden alle Daten neu geladen, effizienter wäre es nur das eine Object zu laden und dann im Array hinzuzufügen
            // ist nötig weil Datenbank ID und Datum hinzufügt.
            this.links = await this.initalize();  

            //this.links.push(this.editedItem)
        }
        this.close()
        },
    },
  }
</script> 




