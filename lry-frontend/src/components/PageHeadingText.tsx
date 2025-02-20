import React from "react";

interface PanelProps {
  title: string;
}

const Panel: React.FC<PanelProps> = ({ title }) => {
  return (
    <div className="col-sm-12">
      <div className="panel bg-transparent m-b-0 m-t-5">
        <div className="panel-heading" style={{ textTransform: "none" }}>
          <h2 className="text-info mb-0">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Panel;
