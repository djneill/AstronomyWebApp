// to get current year
// function getYear() {
//     var currentDate = new Date();
//     var currentYear = currentDate.getFullYear();
//     document.querySelector("#displayYear").innerHTML = currentYear;
// }

// getYear();

const image = document.querySelector("img");
const ifr = document.querySelector("iframe");
const info = document.querySelector("h3");
const title = document.querySelector('h2')
const copy = document.querySelector('p')

window.addEventListener('load', function () {
  getFetch()
})
// event listener for button click
document.querySelector('button').addEventListener('click', getFetch)

// event listener for enter pressed
let btn = document.getElementById('btn');

// when the btn is clicked print info in console 
btn.addEventListener('click', (ev) => {
  getFetch()
});

document.addEventListener('keypress', (event) => {

  // event.keyCode or event.which  property will have the code of the pressed key
  let keyCode = event.keyCode ? event.keyCode : event.which;

  // 13 points the enter key
  if (keyCode === 13) {
    // call click function of the buttonn 
    btn.click();
  }

});

// get date from input field
function getFetch() {
  const choice = document.querySelector('input').value
  console.log(choice)

  // nasa apod api url with date from input
  const url = `https://api.nasa.gov/planetary/apod?api_key=knyEdcu9bPxCjTZ0hF7s2ZM8COfYk2spxCtWtEX0&date=${choice}`

  // fetch response from api
  fetch(url)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
      console.log(data);
      // display image in the dom
      if (data.media_type === 'image') {
        // let's first set the source, and then display the image
        image.classList.remove("none")
        image.src = data.hdurl;


        // let's hide the iframe first, and then remove the source
        ifr.classList.add("none")
        ifr.src = "";
        // display video in the dom
      } else if (data.media_type === 'video') {
        // similar as above - hide first, remove source, and the opposite
        // for iframe
        image.classList.add("none")
        image.src = "";

        ifr.classList.remove("none")
        ifr.src = data.url;
      } else {
        alert('Error, please try again')
      }

      // display explanation of image / video
      info.innerText = data.explanation
      // display title of image / video
      title.innerText = data.title
      // display copyright of image / video
      copy.innerText = data.copyright
    })
    .catch(err => {
      document.getElementById('title').innerText = 'The NASA picture of the day server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state. Please try again later.'
      console.log(`error ${err}`)
    })
}
