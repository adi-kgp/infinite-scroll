const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Connecting with Unsplash API
let count = 5;
const apiKey = '85i8Z0_m26tR8-m2hI5V_I8C9mHAvVX4iPvvTVpF7GE';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded (){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 15;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


//Create elements for links and photos, add to DOM
function displayPhotos(){
    //reset imagesLoaded
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images: ', totalImages);
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash website
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target', '_blank') // open in new tab
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank', 
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener , check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> , then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();  //json() is a method which is applied on response
        displayPhotos();
    }catch(error){
        console.log(error);
    }
}

// Check to see if scrolling near bottom of page , Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
    }
});

// On Load
getPhotos();