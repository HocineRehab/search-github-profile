import React, { useState } from 'react';
import './App.css';

function GithubProfileSearch() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [darkText, setDarkText] = useState(false);
  const [reposCount, setReposCount] = useState(0);
  const [reposUrl, setReposUrl] = useState('');
  // we check if the username is valid after creating a regex expression  to check if the username is valid.
  const regex = /^[a-zA-Z-0-9_]+$/;
  const handleSearch = async () => {
    if (!username) return;
    if (!regex.test(username)) return alert('Please enter a valid username');
    // we fetch the followers count 
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();
      setFollowersCount(userData.followers);
      setReposCount(userData.public_repos);
      setReposUrl(userData.repos_url);
    } catch (error) {
      console.error('Erreur lors de la récupération des followers', error);
    }
    // we fetch the search results
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}+in:login&type=Users`);
      const data = await response.json();
      const filteredResults = data.items.filter(item => item.login.includes(username), item => item.followers.includes(followersCount), item => item.type.includes(searchResults), item => item.avatar_url.includes(searchResults), item => item.html_url.includes(searchResults), item => item.id.includes(searchResults), item => item.url.includes(searchResults), item => item.repos_url.includes(reposUrl), item => item.public_repos.includes(reposCount));
      setSearchResults(filteredResults.slice(0, 10));
      if (filteredResults.length === 0) {
        // we display an alert below the search bar if there is no user with that username
        alert('No user found with that username');
      }
    } catch (error) {
      console.error(error);
    }
    setUsername('');
  };
  // we check if the user press enter to search

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  // we toggle the text color

  const toggleDarkText = () => {
    setDarkText(!darkText);
  };

  //console.log(searchResults);
  // we display the search results
  return (
    <div className={`container ${darkText ? 'dark-text' : ''}`}>

      <div className="input-darkText" >
        <button className="input-darkText" onClick={toggleDarkText}>
          {darkText ? 'Switch to  BlueText' : ' Switch to Dark Text'}
        </button>
      </div>
      <h1>Github Profile Search</h1>
      <h2>Search for Github users and view their profile information</h2>
      <h3>Enter a Github username below to get started</h3>

      <ul className="input-wrapper">
        <input
          type="text"
          placeholder="Enter a Github username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search a username</button>
      </ul>

      <h3>Search Results followers</h3>
      <ul>
        <li className="card-body">
          {/*we import the function that defines the name of the user to dynamically display the name of the first user*/}
          <div className="card-ligne">
            Required profile: {searchResults.map(result => result.login).slice(0, 1)}
          </div>
          <div className="card-ligne follow">
            Followers Count : {followersCount}
          </div>
          <div className="card-ligne follow">
            Repos Count : {reposCount}

          </div>
        </li>
      </ul>

      <h3>Search Results Github users</h3>
      <ul>
        {searchResults.map(result => (
          <li className="card-body" key={result.id}>
            <div className="card-ligne one">
              <a href={result.html_url} target="_blank" rel="noopener noreferrer nofollow">
                {result.login}
              </a>
            </div>
            <div className="card-ligne center">
              <a href={result.html_url} target="_blank" rel="noopener noreferrer nofollow">
                {result.type}
              </a>
            </div>

            <div className="card-ligne foor">
              <a href={result.html_url} target="_blank" rel="noopener noreferrer nofollow">
                <img src={result.avatar_url} alt={result.login} />
              </a>
            </div>
          </li>
        ))}
      </ul>

      {/* bouton de switch de couleur du text */}
      <div className="input-darkText" >
        <button className="input-darkText" onClick={toggleDarkText}>
          {darkText ? 'Switch green Text' : ' Switch to Dark Text'}
        </button>
      </div>

      <footer>
        <p>© 2021 Created by Hocine <a href="https://github.com/HocineRehab/search-github-profile" target='_blank' rel="noopener noreferrer nofollow">@WisdomFace</a></p>
      </footer>
    </div>
  );
}

export default GithubProfileSearch;