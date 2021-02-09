import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$('.submit').click(function() {
  $('#output').text("");
  // if clicked on trending radio button, then hide search bar, display top 5 trending
  // if clicked on search radio button, then it shows search bar, and that's it
  // if clicked on Go! button, then diplays top 5 results of search
  const search = $('#searchInput').val();
  $('#searchInput').val("");
  let request = new XMLHttpRequest();
  let type = $(this).attr("id");
  console.log(type);
  const url = `https://api.giphy.com/v1/gifs/${type}?api_key=${process.env.API_KEY}&q=${search}&limit=5&offset=0&rating=g&lang=en`;
  const uploadUrl = `https://upload.giphy.com/v1/gifs?&api_key=${process.env.API_KEY}`;

  request.onreadystatechange = function() {
    console.log(this.status);
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  if (type === "upload") {
    request.open("POST", uploadUrl, true);
  } else {
    request.open("GET", url, true);
  }
  request.send();

  function getElements(response) {
    if (type === "random")
      $('#output').html(`<img src="${response.data.image_original_url}">`);
    else if (type !== "upload") {
      response.data.forEach(function(element) {
        $('#output').append(`<img src="${element.images.original.url}">`);
      });
    }
  }
});