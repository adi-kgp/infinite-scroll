// Connecting with Unsplash API
const count = 10;
const apiKey = '85i8Z0_m26tR8-m2hI5V_I8C9mHAvVX4iPvvTVpF7GE';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get photos from API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();  //json() is a method which is applied on response
        console.log(data);
    }catch(error){
        console.log(error);
    }
}

// On Load
getPhotos();