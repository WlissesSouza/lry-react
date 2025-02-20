import React from "react";
import toastr from "toastr";
import axios from "axios";

interface Filtro {
  id: number;
  filtro: string;
}

interface ModalFiltrosPendentesProps {
  filtrosPendentes: Filtro[];
  onClose: () => void;
}

const ModalFiltrosPendentes: React.FC<ModalFiltrosPendentesProps> = ({ filtrosPendentes }) => {
  const aceitar = (filtroId: number) => {
    axios
      .post("/filtro/aceitar_rejeitar_compartilhar", {
        id: filtroId,
        aceito: true,
      })
      .then(() => {
        toastr.success("Compartilhamento aceito com sucesso!");
        window.location.reload();
      })
      .catch(() => {
        toastr.error("Erro ao aceitar o Compartilhamento.");
      });
  };

  const rejeitar = (filtroId: number) => {
    axios
      .post("/filtro/aceitar_rejeitar_compartilhar", {
        id: filtroId,
        aceito: false,
      })
      .then(() => {
        toastr.success("Compartilhamento rejeitado com sucesso!");
        window.location.reload();
      })
      .catch(() => {
        toastr.error("Erro ao rejeitar o Compartilhamento.");
      });
  };

  return (
    <div
      className="modal fade show"
      id="adicionarModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel1"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="exampleModalLabel1">
              Compartilhamento de consultas
            </h4>
          </div>

          <form method="POST" encType="multipart/form-data">
            <div className="modal-body">
              <h4 className="text-primary-dark font-weight-bold">
                As seguintes consultas foram compartilhadas com você e estão pendentes de aprovação
              </h4>
              <hr />

              {filtrosPendentes.map((filtro) => (
                <div className="filter-row row" id={`filter-${filtro.id}`} key={filtro.id}>
                  <div className="col-sm-10">
                    <h5>{filtro.filtro}</h5>
                  </div>
                  <div className="col-sm-2">
                    <a style={{ cursor: "pointer" }} onClick={() => rejeitar(filtro.id)}>
                      <i className="fa fa-times"></i>
                    </a>
                    <a style={{ cursor: "pointer" }} onClick={() => aceitar(filtro.id)}>
                      <i className="fa fa-check"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFiltrosPendentes;
