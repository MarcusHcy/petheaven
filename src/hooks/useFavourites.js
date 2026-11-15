// EXTRA: lets visitors heart the pets they like. The list is remembered in the browser.
import useLocalStorage from "./useLocalStorage.js";

export default function useFavourites() {
  const [favs, setFavs] = useLocalStorage("ph-favourites", []);

  // adds the pet id if it is not there yet, removes it if it is
  const toggleFav = (id) => {
    setFavs((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  };

  return [favs, toggleFav];
}
