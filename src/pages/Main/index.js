import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('repositories');
    const repos = JSON.parse(data);

    if (repos) {
      setRepositories(repos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleInputChange = event => {
    setNewRepo(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);

    const response = await api.get(`/repos/${newRepo}`);

    const repo = {
      name: response.data.full_name,
    };

    setRepositories([...repositories, repo]);
    setNewRepo('');
    setLoading(false);
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading}>
          {loading && <FaSpinner color="#FFF" size={14} />}
          {!loading && <FaPlus color="#FFF" size={14} />}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Ver detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
