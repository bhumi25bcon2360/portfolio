export const THEME_STORAGE_KEY = "bhumi-theme";

/** Applied in <head> before paint: saved choice first, otherwise the OS colour scheme. */
export const earlyThemeScript = `(function(){try{var v=localStorage.getItem("${THEME_STORAGE_KEY}");var dark=v?v==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",dark);}catch(_){}})();`;
