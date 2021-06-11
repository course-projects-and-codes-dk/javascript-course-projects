// EVENT LISTENER FOR SUBMIT BTN
document.getElementById('submit').addEventListener('click', getJokes);

// GET JOKES - Function
function getJokes(e) {
  // 1 - Prevent default action
  e.preventDefault();

  // 2 - Create an XHR object
  const xhr = new XMLHttpRequest();

  // 3 - Fetch the web API
  xhr.open('GET', 'https://api.icndb.com/jokes/random', true);

  // 4 - Speicfy what to do with API
  xhr.onload = function () {
    // 5 - Check HTTP Status
    if (this.status === 200) {
      // 5.1 - Store response text
      const response = JSON.parse(this.responseText);
      console.log(response);

      // 5.2 - Create an empty output
      let output = '';

      // 5.3 - Check reposnse's status
      if (response.type === 'success') {
        // create output
        output += `<li>${response.value.joke}</li>`;
      } else {
        // show error
        output += '<li>Something went wrong</li>';
      }

      // 5.4 - Append output to dom
      document.querySelector('.jokes').innerHTML = output;

      // 5.5 - Show jokes
      document.querySelector('.jokes').style.display = 'block';
    }
  };

  // 6 - Finalize
  xhr.send();
}
