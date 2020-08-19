import React, { useEffect } from "react";

import "./styles.css";
import { useState } from "react";

import api from "./services/api";


function App() {
  const [repos, setRepos] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepos(response.data);
    });
  }, []);
 
  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      id:"",
      title: '',
      url:"",
      techs:"",
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);
    
    if(response.status === 204){
      const newRepo = repos.filter(repo=>repo.id !== id);
      
      setRepos(newRepo);
    }
    /*
    const newRepo=[];
    repos.map(repo=>{
      if(repo.id !== id){
        newRepo.push(repo);
      }
    })
    setRepos(newRepo);
    */
  }

  return (
    <div>
      <ul data-testid="repository-list">        

          {repos.map(repo=>(
          <li key={repo.id}>
            <h1>{repo.title}</h1>
            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
            </button>
          </li>))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
