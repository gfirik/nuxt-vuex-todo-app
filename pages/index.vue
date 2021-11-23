<template lang="">
  <v-container 
    fluid 
    class="container"
  >

    <header>
      <h1>Todo App</h1>
    </header>

    <v-card
      class="d-flex mx-auto header"
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
        tile
        icon
        @click="add"
      ><v-icon>mdi-plus</v-icon>
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
        <v-btn @click="remove(index)">
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
              <v-card>
                  <v-toolbar
                      color="accent"
                      class="d-flex justify-center"
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
              </v-card>
          </template>
      </v-dialog>
    </v-app>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      lists: [],
      list: '',
      dialog: false,
    }
  },
  methods: {
    add(item){
      if(this.list === '') return;  
      this.lists.push(this.list);
      this.list = '';
    },
    remove(index){
      this.lists.splice(index, 1)
    },
  }
}
</script>
<style lang="scss">
.container {
  display: grid;
  place-items: center;
  width: 100%;
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
    }
  }
}
</style>