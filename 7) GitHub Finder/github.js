// Github class
class Github {
  constructor() {
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(name) {
    const profileResponse = await fetch(`https://api.github.com/users/${name}`);
    const reposResponse = await fetch(`https://api.github.com/users/${name}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`);

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    return {
      profile,
      repos
    }
  }
}