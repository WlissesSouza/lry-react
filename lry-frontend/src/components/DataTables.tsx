import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";

// Define a interface das propriedades do componente
interface ConsultasTableProps {
  searchText: string;
}

const ConsultasTable: React.FC<ConsultasTableProps> = ({ searchText }) => {
  // Define o estado para armazenar os dados das consultas
  const [consultas, setConsultas] = useState<any[]>([]);
  const [consultasCompartilhada, setConsultasCompartilhada] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Refs para tabelas e instâncias do DataTables
  const tableRef1 = useRef<HTMLTableElement>(null);
  const tableRef2 = useRef<HTMLTableElement>(null);
  const table1Instance = useRef<DataTables.Api | null>(null);
  const table2Instance = useRef<DataTables.Api | null>(null);

  // Efeito para carregar os dados
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [res, resCompartilhada] = await Promise.all([
          fetch("/data.json"),
          fetch("/dataCompartilhadas.json"),
        ]);

        const jsonData = await res.json();
        const jsonDataCompartilhada = await resCompartilhada.json();

        setConsultas(jsonData);
        setConsultasCompartilhada(jsonDataCompartilhada);
        setDataLoaded(true);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setDataLoaded(true);
      }
    };

    carregarDados();
  }, []);

  // Efeito para inicializar o DataTables quando os dados estiverem carregados
  useEffect(() => {
  if (!dataLoaded || !tableRef1.current || !tableRef2.current) return;

  const columns = [
    { data: "nome", title: "Título da consulta" },
    {
      data: "categorias",
      title: "Tag",
      render: (data: string[]) => data.join(", "),
    },
    {
      title: "Progresso",
      render: (_: any, __: any, row: any) =>
        `${row.quantidade_atual} de ${row.total_processos_arquivo}`,
    },
    { data: "situacao", title: "Status" },
    {
      data: "ultima_execucao",
      title: "Última Atualização",
      render: (data: string) => new Date(data).toLocaleString(),
    },
    {
      title: "Ações",
      orderable: false,
      render: () => `
        <div class="text-nowrap text-right">
          <div class="dropdown">
            <a href="#" class="dropdown-toggle text-dark i-dropdown table-dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#">Editar</a>
              <a class="dropdown-item" href="#">Detalhar</a>
              <a class="dropdown-item" href="#">Atualizar</a>
              <a class="dropdown-item" href="#">Excluir</a>
            </div>
          </div>
        </div>
      `,
    },
  ];

  // Inicializa tabelas
  table1Instance.current = $(tableRef1.current).DataTable({
    data: consultas,
    columns,
    dom:
      '<"row "<"col-sm-12"rt>>' +
      '<"row mt-2"<"col-sm-6"i><"col-sm-6 text-right"p>>',
    searching: false,
    lengthChange: false,
    language: {
      decimal: ",",
      emptyTable: "Nenhum registro encontrado",
      info: "Exibindo _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Nenhum registro para exibir",
      infoFiltered: "(filtrados de _MAX_ registros totais)",
      loadingRecords: "Carregando...",
      processing: "Processando...",
      search: "Pesquisar:",
      zeroRecords: "Nenhum registro correspondente encontrado",
      paginate: {
        first: "Primeiro",
        last: "Último",
        next: ">",
        previous: "<",
      },
    },
  });

  table2Instance.current = $(tableRef2.current).DataTable({
    data: consultasCompartilhada,
    columns,
    dom:
      '<"row "<"col-sm-12"rt>>' +
      '<"row mt-2"<"col-sm-6"i><"col-sm-6 text-right"p>>',
    searching: false,
    lengthChange: false,
    language: {
      decimal: ",",
      emptyTable: "Nenhum registro encontrado",
      info: "Exibindo _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Nenhum registro para exibir",
      infoFiltered: "(filtrados de _MAX_ registros totais)",
      loadingRecords: "Carregando...",
      processing: "Processando...",
      search: "Pesquisar:",
      zeroRecords: "Nenhum registro correspondente encontrado",
      paginate: {
        first: "Primeiro",
        last: "Último",
        next: ">",
        previous: "<",
      },
    },
  });

  return () => {
    table1Instance.current?.destroy();
    table2Instance.current?.destroy();
  };
}, [dataLoaded, consultas, consultasCompartilhada]);

  // Atualiza os dados da tabela com base na pesquisa
  useEffect(() => {
    if (!dataLoaded || !table1Instance.current || !table2Instance.current) return;

    const filtered1 = consultas.filter((item) =>
      item.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    const filtered2 = consultasCompartilhada.filter((item) =>
      item.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    table1Instance.current.clear().rows.add(filtered1).draw();
    table2Instance.current.clear().rows.add(filtered2).draw();
  }, [consultas, consultasCompartilhada, searchText, dataLoaded]);

  if (!dataLoaded) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="tab-content mt-3">
      <div className="tab-pane fade show active" id="my-filters">
        <div className="table-responsive mt-3" style={{ overflowX: "hidden" }}>
          <table ref={tableRef1} className="table table-bordered datatable w-100 mb-2">
            <thead className="bg-lighter">
              <tr>
                <th>Título da consulta</th>
                <th>Tag</th>
                <th>Progresso</th>
                <th>Status</th>
                <th>Última Atualização</th>
                <th>Ações</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div className="tab-pane fade" id="shared-filters">
        <div className="table-responsive mt-3" style={{ overflowX: "hidden" }}>
          <table ref={tableRef2} className="table table-bordered datatable w-100 mb-2">
            <thead className="bg-lighter">
              <tr>
                <th>Título da consulta</th>
                <th>Tag</th>
                <th>Progresso</th>
                <th>Status</th>
                <th>Última Atualização</th>
                <th>Ações</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultasTable;
