import React from "react";

// Definição das props esperadas pelo componente
interface SideMenuProps {
  userName?: string;
}

// Componente SideMenu que recebe o nome do usuário como uma prop
const SideMenu: React.FC<SideMenuProps> = ({ userName }) => {
  return (
    <div className="right-sidebar">
      <div className="slimscrollright">
        <div className="rpanel-title right-side-toggler">{userName}</div> {/* Exibindo o nome do usuário */}
        <div className="r-panel-body">
          <ul className="m-t-20 chatonline">
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
