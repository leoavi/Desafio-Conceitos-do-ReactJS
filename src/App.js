import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "ReactJS GoStack",
      owner: "Leonardo",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const Newrepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(Newrepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <>
              <li>{repository.title}</li>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
