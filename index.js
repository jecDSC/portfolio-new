import { fetchGitHubData } from "./global.js";

// Display GitHub stats
const profileStats = document.querySelector("#profile-stats");
const githubData = await fetchGitHubData("jecDSC");

console.log(profileStats);

if (profileStats) {
  profileStats.innerHTML = `
          <dl class="stats">
            <dt class="stats">Public Repos:</dt><dd class="stats">${githubData.public_repos}</dd>
            <dt class="stats">Followers:</dt><dd class="stats">${githubData.followers}</dd>
            <dt class="stats">Following:</dt><dd class="stats">${githubData.following}</dd>
          </dl>
      `;
}
