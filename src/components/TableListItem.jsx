import { Box, TableCell } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { colors } from "../theme/colors";
import CountryFlag from "./CountryFlag";

const intl = new Intl.NumberFormat("en-IN", {
  maximumSignificantDigits: 8,
});

const tableItemTextStyles = {
  color: colors.textLight,
  fontWeight: "400",
  fontSize: "13px",
};

const TableListItem = ({ headerCell, item, index, headingsCount }) => {
  const { key } = headerCell;
  const { CCY, due_date } = item;
  const textAlign =
    index === 0 ? "left" : index === headingsCount - 1 ? "right" : "center";

  if (["payer", "payee"].includes(key)) {
    return (
      <TableCell>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            ...tableItemTextStyles,
            textAlign,
          }}
        >
          <CountryFlag />
          {item[key]}
        </Box>
      </TableCell>
    );
  }

  if (key === "due_date") {
    return (
      <TableCell
        style={{
          ...tableItemTextStyles,
          textAlign,
        }}
      >
        {due_date?.split(" ")[0]}
      </TableCell>
    );
  }

  return (
    <TableCell
      style={{
        ...tableItemTextStyles,
        textAlign,
      }}
    >
      {key === "original" && `${CCY} `}
      {key === "usd" && "$ "}
      {typeof item[key] === "number" ? intl.format(item[key]) : item[key]}
    </TableCell>
  );
};

TableListItem.propTypes = {
  headerCell: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  headingsCount: PropTypes.number.isRequired,
};

export default TableListItem;
