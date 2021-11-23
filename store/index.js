export const state = () => ({
  lists:[]
})
export const mutations = {
  addList(state, value){
    state.lists.push(value)  
  },
  removeList(state, value){
    state.lists.splice(value, 1)
  }
}
export const getters = {
    myGetter(state){ return state.counter + 1000}
}