<template lang="">
  <v-container 
    fluid 
    class="container"
  >

    <header>
      <h1>Todo App</h1>
    </header>

    <v-card
      class="mx-auto d-flex header"
      outlined
      tile
    >
      
      <v-text-field
        single-line
        solo
        persistent-hint
        hint="Add new list"
        v-model="list"
        @keypress.enter="add"
        placeholder="What is your new list?"
        class="text-uppercase"
      ></v-text-field>
      <v-btn
        elevation="4"
        fab
        icon
        @click="add"
        color="rgb(44, 44, 90)"
      ><v-icon class="add">mdi-plus</v-icon>
      </v-btn>
    </v-card>

    <v-card
      class="mx-auto lists"
    >
      <v-list-item 
        v-for="(list, index) in lists" 
        :key="index"
        class="list"
      >
        <v-list-item-content >
          {{ list }}
        </v-list-item-content>
        <v-btn @click="remove(index)" icon class="delete">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item>
    </v-card>
    
    <v-app class="dialog-container">  
      <v-dialog
          transition="dialog-top-transition"
          max-width="600px"
          max-height="600px"
      >
          <template v-slot:activator="{ on, attrs }">
              <v-btn
                  v-bind="attrs"
                  v-on="on"
                  light
              >info</v-btn>
          </template>

          <template v-slot:default="dialog" >
                  <v-toolbar
                      class="justify-center d-flex"
                  >Info</v-toolbar>
                  <v-card-text >
                      <div class="ma-4">Number of lists: {{lists.length}}</div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                      <v-btn
                          text
                          color="white"
                          @click="dialog.value = false"
                      >Close</v-btn>
                  </v-card-actions>
          </template>
      </v-dialog>
    </v-app>

    <v-footer
      dark
      padless
      class="footer"
    >
      <v-card
        flat
        tile
        class="text-center indigo lighten-1 white--text"
      >
        <v-card-text class="pt-0 white--text">
          This app allows you to create a list of tasks and delete them.
          This app is developed using Nuxt.js, Vuetify and Vuex.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} &copy;
          <strong>
            <a 
              href="https://github.com/gfirik/nuxt-vuex-todo-app"
              class="footer-a"
            >gfirik</a>
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>
<script>
export default {
  computed: {
    lists () {
      return this.$store.state.lists
    }
  },
  data() {
    return {
      list: '',
      dialog: false,
      icons: [
        'mdi-github',
      ],
    }
  },
  methods: {
    add(item){
      if(this.list === '') return;  
      this.$store.commit('addList', this.list)
      this.list = '';
    },
    remove(index){
      this.$store.commit('removeList', index)
    },
  }
}
</script>
<style lang="scss">
.container {
  display: grid;
  place-items: center;
  width: 100%;
  height: auto;
  position: relative;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  header {
    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      text-align: center;
      margin: 2rem auto;
    }
  }
  .header {
    width: 50%;
    margin: auto;
    display: flex;
  }
  .dialog-container {
    margin: 4rem auto;
    height: 4rem;
    background: white;
  }
  .dialog-text-area {
    background: white;
    color: black;
    height: 100%;
  }
  .lists {
    width: 50%;
    margin-top: 2rem;
    .list {
      transition: all .3s ease-in-out;
      margin: 1rem;
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
      }
      .delete {
        transition: all .3s ease-in-out;
        color: #f44336;
      }
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    z-index: 2;
    bottom: 0;
    .footer-a{
      color: white;
      text-decoration: none;
    }
  }
  
}
</style>