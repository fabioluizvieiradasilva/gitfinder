import {Header} from '../../components/header';
import background from '../../assets/background.png';
import ItemList from '../../components/itemlist';
import './styles.css';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handlerGetUser = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if(newUser.name)
    {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
  
    }
    
  }

  return (
    <div className="App">
      <Header/>
      <div className="conteudo">
        <img src={background} className="background" alt="Github"/>
        <div className='info'>
          <div>
            <input name='usuario' placeholder='@username' onChange={event => setUser(event.target.value)}/>
            <button onClick={handlerGetUser}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className='perfil'>
                <img src= {currentUser.avatar_url}
                  className='profile'alt='imagem de perfil'/>
                <div>              
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>            
              </div>            
            </>            
          ) : null }
          
          <hr/>
          
          <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repos?.length ? (
              repos.map(repo => (
                <ItemList title={repo.name} description={repo.description}/>)
              )
            ):null }           
            
          </div> 
        </div>        
      </div>
    </div>
  );
}

export default App;



