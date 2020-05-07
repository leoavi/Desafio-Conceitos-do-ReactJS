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
      title: "Magiclevel.com",
      owner: "Leonardo Avi",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepositories((previusRepositories) => {
      return {
        repositories: previusRepositories.repositories.filter(
          (repo) => repo.id !== response.data.id
        ),
      };
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          <li id={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
            ;
          </li>;
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
