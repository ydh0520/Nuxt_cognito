export const state = () => ({
    logined: false
})
  
export const mutations = {
    login (state) {
        state.logined=true
    }
}