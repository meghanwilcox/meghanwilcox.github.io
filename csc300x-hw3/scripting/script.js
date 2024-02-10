// function takes effect as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function () {

    // function: expand: this function expands the specified item when an image is clicked
    function expand(event, toExpand) {
        const imageClicked = event.currentTarget;
        const label = document.getElementById(toExpand);

        const isEnlarged = imageClicked.classList.toggle('enlarged');

        // loop through the images and ensure that only the clicked image is to be enlarged
        const gallery = document.querySelectorAll('.photo-container .photo');
        gallery.forEach((element) => {
            if (element !== imageClicked) {
                element.classList.remove('enlarged');
            }
        });

        // change the disp[lay properrty of the clicked image from none to block, so that it is visible on the screen
        label.style.display = isEnlarged ? "block" : "none";
    }

    // create a variable for each image, and find the image by its assigned id
    const mangonadaImage = document.getElementById("mangonada");
    const cucumberLimeImage = document.getElementById("cucumber-lime");
    const streetCornImage = document.getElementById("street-corn");
    const chickenSandwichImage = document.getElementById("chicken-sandwich");
    const veggieDogImage = document.getElementById("veggie-dogs");
    const turkeyBurgerImage = document.getElementById("turkey-burger");
    const easyPlateauImage = document.getElementById("easy-plateau");
    const mockingbirdSingImage = document.getElementById("mockingbird-sing");
    const peachCobblerImage = document.getElementById("peach-cobbler");

    //attach an event listener to each image, waiting for the image to clicked, to call the function "expand"
    
    mangonadaImage.addEventListener('click', function (event) {
        expand(event, "mangonada-label");
    });

    cucumberLimeImage.addEventListener('click', function (event) {
        expand(event, "cucumber-lime-label");
    });

    streetCornImage.addEventListener('click', function (event) {
        expand(event, "street-corn-label");
    });

    chickenSandwichImage.addEventListener('click', function(event){
        expand(event, "chicken-sandwich-label");
    });

    veggieDogImage.addEventListener('click', function(event){
        expand(event, "veggie-dogs-label");
    });

    turkeyBurgerImage.addEventListener('click', function(event){
        expand(event, "turkey-burger-label");
    });

    easyPlateauImage.addEventListener('click', function(event){
        expand(event, "easy-plateau-label");
    });

    mockingbirdSingImage.addEventListener('click', function(event){
        expand(event, "mockingbird-sing-label");
    });

    peachCobblerImage.addEventListener('click', function(event){
        expand(event, "peach-cobbler-label");
    });
});

