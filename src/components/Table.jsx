import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableSortLabel,
} from "@mui/material";
import { colors } from "../theme/colors";
import TableListItem from "./TableListItem";
import download from "../assets/charm_download.png";
import expand from "../assets/expand.png";

const Table = ({ items, headings }) => {
  const [sortProps, setSortProps] = useState({
    order: "desc",
    orderBy: "",
  });
  const { order, orderBy } = sortProps;
  const sortableItems = useMemo(
    () => handleSortTableItems(items, order, orderBy),
    [items, order, orderBy]
  );
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`table-container ${expanded && "fullscreen"}`}>
      <TableContainer component={Paper}>
        <MuiTable style={{ minWidth: "720px" }} aria-label="simple table">
          <TableHead style={{ backgroundColor: colors.secondaryBackground }}>
            <TableRow>
              {headings.map(({ title, sortAble, key }, i) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={key === orderBy}
                    direction={order}
                    onClick={() => {
                      setSortProps({
                        order: order === "desc" ? "asc" : "desc",
                        orderBy: key,
                      });
                    }}
                    style={{
                      display: "flex",
                      textAlign: "center",
                      lineHeight: "20px",
                      fontWeight: "600",
                      justifyContent:
                        i === 0
                          ? "flex-start"
                          : i === headings.length - 1
                          ? "flex-end"
                          : "center",
                    }}
                  >
                    {title}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortableItems.map((item) => {
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
      <div className="action-icons">
        <div
          className="action-icon-container"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <img src={expand} className="icon" />
        </div>
        <div className="action-icon-container">
          <img src={download} className="icon" />
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  items: PropTypes.array.isRequired,
  headings: PropTypes.array.isRequired,
};

export default Table;

const getNumberFromString = (str) => {
  return Number(str.match(/\d+/)[0]);
};

const comparator = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

const getNettedCount = (item) => {
  if (typeof item?.netting_summary?.netted === "number") {
    return item?.netting_summary?.netted;
  }
  return -1;
};

function handleSortTableItems(items = [], order, orderBy) {
  if (!order) {
    return items;
  }
  const newItems = [...items];
  newItems.sort((a, b) => {
    if (orderBy === "payer") {
      return order === "desc"
        ? comparator(a.payer, b.payer)
        : -comparator(a.payer, b.payer);
    }
    if (orderBy === "payee") {
      return order === "desc"
        ? comparator(a.payee, b.payee)
        : -comparator(a.payee, b.payee);
    }

    if (orderBy === "due_date") {
      return order === "desc"
        ? comparator(
            getNumberFromString(a.due_date),
            getNumberFromString(b.due_date)
          )
        : -comparator(
            getNumberFromString(a.due_date),
            getNumberFromString(b.due_date)
          );
    }

    if (orderBy === "txn_date") {
      return order === "desc"
        ? comparator(
            getNumberFromString(a.txn_date),
            getNumberFromString(b.txn_date)
          )
        : -comparator(
            getNumberFromString(a.txn_date),
            getNumberFromString(b.txn_date)
          );
    }
    if (orderBy === "original") {
      return order === "desc"
        ? a.original - b.original
        : -(a.original - b.original);
    }
    if (orderBy === "usd") {
      return order === "desc" ? a.usd - b.usd : -(a.usd - b.usd);
    }

    if (orderBy === "status") {
      return order === "desc"
        ? getNettedCount(a) - getNettedCount(b)
        : -(getNettedCount(a) - getNettedCount(b));
    }
    return a - b;
  });
  return newItems;
}
