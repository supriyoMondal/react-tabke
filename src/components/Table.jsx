import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Table as MuiTable,
  TableHead,
  TableBody,
  Box,
} from "@mui/material";
import { colors } from "../theme/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableListItem from "./TableListItem";

const Table = ({ items, headings }) => {
  console.log(items);
  return (
    <TableContainer component={Paper}>
      <MuiTable style={{ minWidth: "720px" }} aria-label="simple table">
        <TableHead style={{ backgroundColor: colors.secondaryBackground }}>
          <TableRow>
            {headings.map(({ title, sortAble, key }, i) => (
              <TableCell key={key}>
                <Box
                  style={{
                    display: "flex",
                    textAlign: "center",
                    lineHeight: "20px",
                    fontWeight: "600",
                    justifyContent:
                      i === 0
                        ? "flex-start"
                        : i === headings.length - 2
                        ? "flex-end"
                        : "center",
                  }}
                >
                  {title}
                  <KeyboardArrowDownIcon style={{ marginLeft: "2px" }} />
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            return (
              <TableRow key={item.name}>
                {headings.map((headerCell, i) => (
                  <TableListItem
                    key={headerCell.key}
                    headerCell={headerCell}
                    item={item}
                    index={i}
                    headingsCount={headings.length}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

Table.propTypes = {
  items: PropTypes.array.isRequired,
  headings: PropTypes.array.isRequired,
};

export default Table;
