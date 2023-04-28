import React, { useState, useMemo, memo, useCallback } from 'react';
import github from '../assets/github.png';
import Input from '../components/input';
import Button from '../components/button';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import api from '../services/api';

function App() {

  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState('');
  const MemoItemRepo = memo(ItemRepo);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){
  
      const isExist = repos.find(repo => repo.id === data.id)
    
      if(!isExist){
    
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      }
    }
    alert('Repositório já listado')
  }
  
  const handleRemoveRepo = useCallback((id) => {
    const removed = repos.filter(repo => repo.id !== id);
    setRepos(removed);
  }, [repos]);

  const reposMemo = useMemo(() => {
    return repos.map(repo => ({ ...repo, key: repo.id }));
  }, [repos]);

  return (
    <div className="App">
      < Container >
        <h1>Fetch your favorite GitHub repositories !</h1>
        <br />
        <img src={github} width={72} height={72} alt ="logo"/>
        <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
        <Button onClick={handleSearchRepo}/>
        {reposMemo.map(repo => <MemoItemRepo key={repo.key} handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
      </Container>
    </div>
  );
}

export default App;
