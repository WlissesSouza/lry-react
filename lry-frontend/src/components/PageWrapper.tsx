import React, { useEffect } from "react";
import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";
import ModalFiltrosPendentes from "./ModalFiltrosPendentes";
import toastr from "toastr";
import PageHeadingText from "../components/PageHeadingText";

// Tipagem das mensagens do Toastr
interface Message {
  tags: "success" | "error" | "info" | "warning";
  text: string;
}

// Tipagem dos filtros pendentes
interface Filtro {
  id: number;
  filtro: string;
}

// Tipagem das props do componente PageWrapper
interface PageWrapperProps {
  children: React.ReactNode;
  filtrosPendentes?: Filtro[];
  messages?: Message[];
  title?: string;
}

// Configuração do Toastr (forçando a tipagem correta)
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, filtrosPendentes, messages, title }) => {
  // Exibir mensagens do Toastr
  useEffect(() => {
    if (messages && messages.length > 0) {
      messages.forEach((message) => {
        // Garantir que a tag esteja dentro das chaves do toastr
        const toastrMethod = toastr[message.tags];
        if (toastrMethod) {
          toastrMethod(message.text);
        }
      });
    }
  }, [messages]);

  return (
    <div>
      <div className="preloader">
        <div className="cssload-speeding-wheel"></div>
      </div>
      <TopMenu showBackButton={false} />
      <div style={{height:"99vH"}} >
        <div className="container-fluid p-t-0 m-r-1">
          <PageHeadingText title={title || ""} />
          <div>{children}</div>
        </div>
      </div>
      <SideMenu />
      {/* Exibindo o modal apenas se houver filtros pendentes */}
      {filtrosPendentes && filtrosPendentes.length > 0 && (
        <ModalFiltrosPendentes filtrosPendentes={filtrosPendentes} onClose={() => {}} />
      )}
    </div>
  );
};

export default PageWrapper;
