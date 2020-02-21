import React, { useState } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

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
    </Container>
  );
}
