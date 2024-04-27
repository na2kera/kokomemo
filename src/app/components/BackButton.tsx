import { IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const BackButton = () => {
  return (
    <Link href="/" className="fixed left-4 bottom-4">
      <IconButton
        sx={{
          borderRadius: "50%",
          height: 50,
          width: 50,
          backgroundColor: "#4F46E5 !important",
          "&:focus": {
            outline: "none",
            boxShadow: `0 0 0 2px #fff, 0 0 0 4px #3f51b5`,
          },
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: "white" }} />
      </IconButton>
    </Link>
  );
};

export default BackButton;
