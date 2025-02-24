import React, { useState } from "react";
import "jquery"; // Importa o jQuery
import "popper.js"; // Importa o Popper.js
import ConsultasTable from "../components/DataTables";

// Tipagem do componente ConsultaList
const ConsultaList: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  // Função para atualizar o valor do campo de pesquisa no estado local do input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Atualiza o valor do campo de pesquisa sem acionar o filtro
  };

  // Função para enviar o valor de pesquisa ao clicar no botão
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    setSearchText(inputValue); // Atualiza o searchText com o valor atual do campo de pesquisa
  };

  return (
    <div className="row p-3">
      <div className="col-sm-12" >
        <div className="panel bg-transparent">
          <div className="panel-body p-t-0">
            <div className="row">
              <div className="col-12">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="my-filters-tab"
                      data-toggle="tab"
                      href="#my-filters"
                      role="tab"
                      aria-controls="my-filters"
                      aria-selected="true"
                    >
                      Minhas Consultas
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="shared-filters-tab"
                      data-toggle="tab"
                      href="#shared-filters"
                      role="tab"
                      aria-controls="shared-filters"
                      aria-selected="false"
                    >
                      Consultas Compartilhadas
                    </a>
                  </li>
                  <li
                    className="nav-item ml-2"
                    style={{
                      flex: "1 1 20%",
                      minWidth: "150px",
                      maxWidth: "40%",
                    }}
                  >
                    <form onSubmit={handleSearchSubmit}>
                      <div className="input-group mb-3">
                        <input
                          className="form-control"
                          placeholder="Pesquisar na lista"
                          value={inputValue} // Valor do campo de pesquisa
                          onChange={handleInputChange} // Atualiza o valor enquanto digita
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-default"
                            style={{
                              borderBottomRightRadius: "10px",
                              borderTopRightRadius: "10px",
                            }}
                            type="submit" // Somente ao clicar no botão é que o filtro será aplicado
                          >
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>

            {/* Passa o texto de pesquisa para o componente ConsultasTable */}
            <ConsultasTable searchText={searchText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaList;
