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
  const url = `https://api.giphy.com/v1/gifs/${type}?api_key=${process.env.API_KEY}&q=${search}&limit=5&offset=0&rating=g&lang=en`;
  const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${process.env.API_KEY}`;
  const uploadparamString= new URLSearchParams(`&source_image_url=https://img1.picmix.com/output/stamp/normal/3/0/5/5/1385503_6f527.gif`);

  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  if (type === "upload") {
    request.open("POST", uploadUrl, true);
    request.send(uploadparamString);
    console.log("sup");
  } else {
    request.open("GET", url, true);
    request.send();
  }


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