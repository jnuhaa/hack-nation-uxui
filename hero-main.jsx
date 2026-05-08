import React from "react";
import { createRoot } from "react-dom/client";
import { HeroStage } from "./src/hero/HeroStage.jsx";
import {
  initCountdown,
  initFluidBackground,
  initNavScrollState,
  initLaunchpadStat
} from "./script.js";

const cleanups = [
  initFluidBackground(),
  initCountdown(),
  initNavScrollState(),
  initLaunchpadStat()
];

const heroMount = document.getElementById("hero-app");
if (heroMount) {
  const root = createRoot(heroMount);
  root.render(<HeroStage />);
}

window.addEventListener("beforeunload", () => {
  cleanups.forEach((cleanup) => {
    if (typeof cleanup === "function") cleanup();
  });
});
