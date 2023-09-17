import { ref, listAll, getDownloadURL } from "firebase/storage";
import "firebase/storage";
import { storage } from "../firebase";

export async function imageFetch() {
  const storageRef = ref(storage, "images");
  const imageURLs = [];

  try {
    const result = await listAll(storageRef);
    const urlPromises = result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      imageURLs.push(url);
    });
    await Promise.all(urlPromises);

    return imageURLs;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return error;
  }
}

