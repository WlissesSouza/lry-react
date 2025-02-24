import React from "react";

// Definição das props esperadas pelo componente
interface NavbarProps {
  showBackButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showBackButton }) => {
  return (
    <nav className="navbar navbar-default navbar-static-top m-b-0 pt-0 px-0">
      <div className="navbar-header">
        <div className="navbar-header-logos">
          <div className="top-left-part">
            {/* Condicionalmente exibe o botão de voltar */}
            {showBackButton && (
              <img
                src={`${process.env.PUBLIC_URL}/static/labeler/img/arrow-left-header.png`}
                onClick={() => window.history.go(-1)}
                className="fa-2x mt-2 text-white"
                id="divBotaoVoltar"
                alt="Voltar"
                style={{ height: "0.8cm", cursor: "pointer" }}
              />
            )}
          </div>
          <div className="top-center-part">
            {/* Logo Lyra com link */}
            <a href="/">
              <img
                src={`${process.env.PUBLIC_URL}/static/labeler/img/logo_lyra_branco.png`}
                alt="Logo Lyra"
              />
            </a>
          </div>
          <div className="top-right-part">
            {/* Logo do Header */}
            <img
              src={`${process.env.PUBLIC_URL}/static/labeler/img/header_logo.png`}
              alt="Header Logo"
            />
          </div>
        </div>

        <ul className="nav navbar-top-links navbar-right pull-right">
          <li className="right-side-toggle">
            {/* Aqui você pode adicionar a lógica para o toggle */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
