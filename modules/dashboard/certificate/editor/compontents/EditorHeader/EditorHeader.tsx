import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
function EditorHeader() {
  return (
    <div className="editor-header">
      <div className="editor-header-inner">
        <div className="editor-header-inner-left">
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Go Back
          </Button>
        </div>
        <div className="editor-header-inner-right">
          <Button variant="outlined" startIcon={<SaveIcon />}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditorHeader;
