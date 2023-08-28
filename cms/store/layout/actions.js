export default {
  changeSideNavMode({ commit }) {
    setTimeout(() => commit("changeSideNavSuccess"), 10);
  },
  changeThemeMode({ commit }) {
    setTimeout(() => commit("changeThemeSuccess"), 10);
  },
};
