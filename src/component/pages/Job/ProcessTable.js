import React from "react";

import "./ProcessTable.css";

import MillingTable from "../../../common/MillingTable";
import BoringTable from "../../../common/BoringTable";
import DrillingTable from "../../../common/DrillingTable";
import TappingTable from "../../../common/TappingTable";

export const ProcessTable = ({
  data,
  handleTextFieldChange,
  processTableErrors,
  containerIndex,
  selectedProcessName,
}) => {
  const processTableData = data || [];

  return (
    <>
      {selectedProcessName === "Milling" && (
        <MillingTable
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
        />
      )}
      {selectedProcessName === "Drilling" && (
        <DrillingTable
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
        />
      )}
      {selectedProcessName === "Boring" && (
        <BoringTable
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
        />
      )}
      {selectedProcessName === "Tapping" && (
        <TappingTable
          processTableData={processTableData}
          handleTextFieldChange={handleTextFieldChange}
          processTableErrors={processTableErrors}
          containerIndex={containerIndex}
        />
      )}
      {/* Add conditional rendering for other process tables as needed */}
    </>
  );
};
