// Init github
const github = new Github;
// Init UI
const ui = new UI;

// Get username input
const username = document.getElementById('username');

// Event listener
username.addEventListener('keyup', () => {

  // Store input value
  const user = username.value;

  if(user !== '') {

    // Make http request
    github.getUser(user)
    .then(data => {

      if(data.profile.message === 'Not Found') {
        // Show alert
        ui.showAlert();
      } else {
        // Show profile and repos
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }

    })

  } else{
    // Clear existing profile
    ui.clearProfile();

  }
})

