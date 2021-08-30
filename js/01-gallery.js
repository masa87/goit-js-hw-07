import { galleryItems } from './gallery-items.js';
// Change code below this line
const qs = (selector) => document.querySelector(selector);
const gallery = qs('.gallery');

const createGrid = galleryItems  => {
  galleryItems.forEach(item => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery__item")
    gallery.append(galleryItem);

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__link");
    galleryLink.href = item.original;
    galleryItem.append(galleryLink);

    const galleryImg = document.createElement("img");
    galleryImg.classList.add("gallery__image");
    galleryImg.src = item.preview;
    galleryImg.dataset.source = item.original;
    galleryImg.alt = item.description;
    galleryLink.append(galleryImg);
  })
}

function selectImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  galleryItems.forEach(item => {
    const instance = basicLightbox.create(`<img src=${item.original}>`)
    if (event.target.src === item.preview) {
      instance.show();
    }
    if (instance.visible() === true) {
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          instance.close();
        }
      });
    }
  })
}

createGrid(galleryItems)
gallery.addEventListener("click", selectImage)