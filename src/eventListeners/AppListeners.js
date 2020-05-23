import { Plugins } from "@capacitor/core";

const AppListener = () => {
  const { App } = Plugins;

  App.addListener("backButton", (data) => {
      if (window.confirm("Do you want to exit ?")) {
        App.exitApp();
      }
      else {
        return false;
      }
  });
};

export default AppListener;
