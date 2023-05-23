import React, { useState } from 'react';
import './App.css';



function GithubProfileSearch() {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);

  const [darkText, setDarkText] = useState(false);
  const regex = /^[a-zA-Z0-9]+$/;

  const handleSearch = async () => {
    if (!username) return;
    if (!regex.test(username)) return alert('Please enter a valid username');
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();
      setFollowersCount(userData.followers);
    } catch (error) {
      console.error('Erreur lors de la récupération des followers', error);
    }

    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}+in:login&type=Users`);
      const data = await response.json();
      const filteredResults = data.items.filter(item => item.login.includes(username), item => item.followers.includes(followersCount), item => item.type.includes(searchResults), item => item.avatar_url.includes(searchResults), item => item.html_url.includes(searchResults), item => item.id.includes(searchResults), item => item.url.includes(searchResults), item => item.repos_url.includes(searchResults), item => item.events_url.includes(searchResults), item => item.received_events_url.includes(searchResults), item => item.site_admin.includes(searchResults), item => item.gravatar_id.includes(searchResults), item => item.node_id.includes(searchResults), item => item.organizations_url.includes(searchResults), item => item.gists_url.includes(searchResults), item => item.starred_url.includes(searchResults), item => item.subscriptions_url.includes(searchResults), item => item.following_url.includes(searchResults), item => item.keys_url.includes(searchResults), item => item.collaborators_url.includes(searchResults));
      setSearchResults(filteredResults.slice(0, 10));
      if (filteredResults.length === 0) {
        alert('There is no user with this username');
      }
    } catch (error) {
      console.error(error);
    }
    setUsername('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleDarkText = () => {
    setDarkText(!darkText);
  };
  console.log(searchResults);
  return (
    <div className={`container ${darkText ? 'dark-text' : ''}`}>
      <h1>Github Profile Search</h1>
      <h2>Search for Github users and view their profile information</h2>
      <h3>Enter a Github username below to get started</h3>

      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter a Github username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>&ensp; &ensp;Search &ensp;&ensp;</button>
      </div>

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
            <div className="card-ligne center">
              {/* afficher les followers des 10 premiers resultats */}
              <a href={result.followers_url} target="_blank" rel="noopener noreferrer nofollow">
                {result.followers}  followers {followersCount}

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
          {darkText ? 'Switch to  BlueText' : ' Switch to Dark Text'}
        </button>
      </div>

      <footer>
        <p>© 2021 Created by Hocine <a href="https://github.com/HocineRehab" target='_blank' rel="noopener noreferrer nofollow">@WisdomFace</a></p>
      </footer>
    </div>
  );
}

export default GithubProfileSearch;