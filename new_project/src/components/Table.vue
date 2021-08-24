<template>
  <!-- <v-container>  -->
      
      
      <div class="table">
          <h1>Hello I am the Database tab</h1>

          <v-data-table
      :headers="headers"
      :items="links"
      :search="search"
      sort-by="calories"
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

          <v-dialog
            v-model="dialog"
            max-width="1000px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
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
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>


      </div> 
      
      
      <!-- </v-container> -->
</template>

<script>
  export default {
    name: 'Table',

    data: () => ({

       items: ['Ich', 'Teste', 'Hier', 'Einfach', 'Nur'],

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
            },
            defaultItem: {
            from: '',
            to: '',
            domain: '',
            created: '',
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

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
            this.links = [
                {
                from: 'Frozen Yogurt',
                to: 159,
                domain: 6.0,
                created: 24,
                },
            ]
            },

            editItem (item) {
            this.editedIndex = this.links.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            },

            deleteItem (item) {
            this.editedIndex = this.links.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            },

            deleteItemConfirm () {
            this.links.splice(this.editedIndex, 1)
            this.closeDelete()
            },

            close () {
            this.dialog = false
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

            save () {
            if (this.editedIndex > -1) {
                Object.assign(this.links[this.editedIndex], this.editedItem)
            } else {
                this.links.push(this.editedItem)
            }
            this.close()
            },
        },
  }
</script> 