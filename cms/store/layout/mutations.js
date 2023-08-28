export default {
  changeSideNavSuccess(state) {
    state.collapsedMenu = !state.collapsedMenu;
  },
  changeThemeSuccess(state) {
    state.theme = state.theme === "light" ? "dark" : "light";
  },
};
