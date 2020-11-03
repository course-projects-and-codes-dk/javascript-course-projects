class UI {

  constructor() {
    this.profile = document.getElementById('user-info');
    this.repos = document.getElementById('user-repos');
  }

  // Display github profile - FUNCTION
  showProfile(user) {
    this.profile.style.display = 'grid';
    this.profile.innerHTML = `
      <div class="user-img">
        <img class="user-image" src="${user.avatar_url}">
        <a href="${user.html_url}" target="_blank" class="user-link">View Profile</a>
      </div>

      <div class="user-btn">
        <span class="btn-1 btn">Public Repos: ${user.public_repos}</span>
        <span class="btn-2 btn">Public Gists: ${user.public_gists}</span>
        <span class="btn-3 btn">Followers: ${user.followers}</span>
        <span class="btn-4 btn">Following: ${user.following}</span>
      </div>

      <ul class="user-details">
        <li class="detail-item">Company: ${user.company}</li>
        <li class="detail-item">Website/Blog: ${user.blog}</li>
        <li class="detail-item">Location: ${user.location}</li>
        <li class="detail-item">Member Since: ${user.created_at}</li>
      </ul>
    `;
  }


  // Display github repos - Function
  showRepos(repos) {
    let output = `<h2>Latest Repos</h2>`;

    repos.forEach( (repo) => {
      output += `
        <div class="repo">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <div class="repo-btn">
            <span class="btn btn-1">Stars: ${repo.stargazers_count}</span>
            <span class="btn btn-2">Watchers: ${repo.watchers_count}</span>
          </div>
        </div>
      `;
    });

    this.repos.innerHTML = output;
  }


  // Clear profile - FUNCTION
  clearProfile() {
    this.profile.style.display = 'none';
    this.profile.innerHTML = '';
    this.repos.innerHTML = '';
  }

  // Display alert - FUNCTION
  showAlert() {

    // 1) Clear existing alerts
    this.clearAlert();
    // 2) Create div
    const div = document.createElement('div');
    // 3) Assign a class
    div.className = 'alert';
    // 4) Assign a message
    div.appendChild(document.createTextNode('User not found :/'));
    // 5) Get parent
    const section = document.querySelector('.section');
    // 6) Get child 
    const info = document.querySelector('.input-info');
    // 7) Insert between chosen parent and child
    section.insertBefore(div, info);
    // 8) Hide alert after 3 secs
    setTimeout(this.clearAlert, 3000);
  }


  // Clear alert message - FUNCTION
  clearAlert() {
    const alertBox = document.querySelector('.alert');

    if(alertBox) {
      alertBox.remove();
    }
  }
}