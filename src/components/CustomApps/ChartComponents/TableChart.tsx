import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  useTheme,
  Tooltip,
} from "@mui/material";
import { BudgetType, SalesType } from "../DynaGraph";
import { SetStateAction, useEffect, useState } from "react";
import { ArrowDownward, Delete, Cancel, Search } from "@mui/icons-material";
import { budgetMergeSort } from "../../../utils/mergeSort";
import _ from "lodash";
import { format } from "date-fns";
interface Props {
  budgetData?: BudgetType[];
  setBudgetData?: React.Dispatch<SetStateAction<BudgetType[]>>;
  salesData?: SalesType[];
  setSalesData?: React.Dispatch<SetStateAction<SalesType[]>>;
  filters?: { [key: string]: string };
}

interface ItemProps {
  operation: BudgetType | SalesType;
  index: number;
  type?: string;
  setBudgetData?: React.Dispatch<SetStateAction<BudgetType[]>>;
  setSalesData?: React.Dispatch<SetStateAction<SalesType[]>>;
}

const TableItem: React.FC<ItemProps> = ({
  operation,
  index,
  setBudgetData,
  setSalesData,
  type,
}) => {
  const handleDelete = () => {
    if (!type && setBudgetData) {
      setBudgetData((prev) => {
        const newData = [...prev];
        if (index === 0) {
          newData.shift();
          return newData;
        }
        newData.splice(0, index);
        return newData;
      });
    } else if (setSalesData) {
      setSalesData((prev) => {
        const newData = [...prev];
        if (index === 0) {
          newData.shift();
          return newData;
        }
        newData.splice(0, index);
        return newData;
      });
    }
  };

  if (type) {
    return (
      <TableRow>
        <TableCell align="center">
          {(operation as SalesType).period || ""}
        </TableCell>
        <TableCell align="center">{(operation as SalesType).id}</TableCell>
        <TableCell align="center">
          {(operation as SalesType).category || "N/D"}
        </TableCell>
        <TableCell align="center">
          $ {operation.amount.toLocaleString()}
        </TableCell>
        <TableCell
          sx={{
            padding: 0,
          }}
        >
          <Delete
            onClick={handleDelete}
            sx={{
              display: "flex",
              fontSize: 20,
              margin: "auto",
              ":hover": {
                cursor: "pointer",
                fill: "red",
              },
            }}
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell align="center" sx={{ padding: "15px 0" }}>
        {new Date((operation as BudgetType).date).toLocaleDateString(
          undefined,
          { timeZone: "UTC" }
        ) || "Not provided"}
      </TableCell>
      <TableCell align="center" sx={{ padding: "15px 0" }}>
        {(operation as BudgetType).typeof}
      </TableCell>
      <TableCell align="center" sx={{ padding: "15px 0" }}>
        {(operation as BudgetType).description || "Not provided"}
      </TableCell>
      <TableCell align="center" sx={{ padding: "15px 0" }}>
        $ {operation.amount.toLocaleString()}
      </TableCell>
      <TableCell
        sx={{
          padding: "15px 0",
        }}
      >
        <Delete
          onClick={handleDelete}
          sx={{
            display: "flex",
            fontSize: 20,
            margin: "auto",
            marginRight: "10px",
            ":hover": {
              cursor: "pointer",
              fill: "red",
            },
          }}
        />
      </TableCell>
    </TableRow>
  );
};

const TableComponent: React.FC<Props> = ({
  budgetData,
  setBudgetData,
  salesData,
  setSalesData,
  filters,
}) => {
  const [tableData, setTableData] = useState<BudgetType[] | SalesType[] | "">(
    budgetData || salesData || ""
  );
  const [sortedArg, setSortedArg] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchSuccess, setIsSearchSuccess] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<boolean>(true);
  const theme = useTheme();
  const mainColor = theme.palette.primary.main;

  const sortFunction = (arg: string) => {
    if (arg === "type-expense") {
      return (a: BudgetType, b: BudgetType) => {
        if (a.typeof === "Expense" && b.typeof === "Income") {
          return -1;
        } else if (a.typeof === "Income" && b.typeof === "Expense") {
          return 1;
        } else {
          return 0;
        }
      };
    } else if (arg === "type-income") {
      return (a: BudgetType, b: BudgetType) => {
        if (a.typeof === "Income" && b.typeof === "Expense") {
          return -1;
        } else if (a.typeof === "Expense" && b.typeof === "Income") {
          return 1;
        } else {
          return 0;
        }
      };
    } else if (arg === "amount-down") {
      return (a: BudgetType, b: BudgetType) => {
        return a.amount - b.amount;
      };
    } else {
      return (a: BudgetType, b: BudgetType) => {
        return b.amount - a.amount;
      };
    }
  };

  function reverseArray() {
    if (tableData instanceof Array) {
      const reversed = tableData.reverse();
      return setTableData(reversed);
    }
  }

  const sortTable = (data: BudgetType[], arg: string) => {
    if (arg.match("date")) {
      if (arg === "date") {
        const sorted = budgetMergeSort(data);
        setTableData(sorted);
      }
      if (sortedArg === "date-up" || sortedArg === "date") {
        reverseArray();
      } else if (sortedArg === "date-down") {
        reverseArray();
      }
    } else if (arg.match("type")) {
      if (sortedArg.match("type")) {
        reverseArray();
      }
      const sorted = data.sort(sortFunction(arg));
      setTableData(sorted);
    } else {
      if (sortedArg.match("amount")) {
        reverseArray();
      }
      const sorted = data.sort(sortFunction(arg));
      setTableData(sorted);
    }
    return setSortedArg(arg);
  };
  function applyFilters() {
    if (budgetData && budgetData.length > 2) {
      const copyArray = _.cloneDeep(budgetData);
      if (filters && filters.simple_month) {
        const filterMonth = copyArray.filter((item) => {
          const month = new Date(filters.simple_month).getMonth() + 2;
          const year = new Date(filters.simple_month).getFullYear();
          const correctDate = year + "-" + month;
          // if (isNaN(Number(correctDate))) {
          //   ///  Fix: when filters applied, and user goes back to table date is NaN (user being in another graph)
          //   return;
          // }
          const formatMonth = format(new Date(correctDate), "MM");
          const itemMonth = format(new Date(item.date), "MM");
          const itemYear = new Date(item.date).getFullYear();
          return year === itemYear && formatMonth === itemMonth;
        });
        return setTableData(filterMonth);
      } else if (filters && filters.simple_year) {
        const filterYear = copyArray.filter((item) => {
          const year = Number(filters.simple_year);
          const itemYear = new Date(item.date).getFullYear();
          return year === itemYear;
        });
        return setTableData(filterYear);
      } else {
        return setTableData(budgetData);
      }
    }
  }

  const handleSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value === "" && budgetData) {
      setTableData(budgetData);
      return setIsSearchSuccess(false);
    }
    if (tableData && budgetData) {
      const searchResults: BudgetType[] = budgetData.filter((item) => {
        const itemValues = Object.values(item);
        const match = itemValues.findIndex((array) => {
          let date = "";
          if (!isNaN(new Date(array).getTime())) {
            date = new Date(array).toLocaleDateString();
          }
          return (
            date.match(target.value) ||
            array.toString().toLowerCase().match(target.value.toLowerCase())
          );
        });
        if (match >= 0) {
          return item;
        } else {
          return false;
        }
      });
      if (searchResults.length > 0) {
        setTableData(searchResults);
        setHasResults(true);
        return setIsSearchSuccess(true);
      } else {
        return setHasResults(false);
      }
    }
  };

  useEffect(() => {
    if (filters && (filters.simple_month || filters.simple_year)) {
      applyFilters();
    }
  }, [filters]);

  useEffect(() => {
    if (budgetData && budgetData.length > 0) {
      if (
        !tableData ||
        tableData.length < 1 ||
        tableData.length !== budgetData.length
      ) {
        setTableData(budgetData);
      } else {
        setTableData(tableData);
      }
    } else if (salesData && salesData.length > 0) {
      if (
        !tableData ||
        tableData.length < 1 ||
        tableData.length !== salesData.length
      ) {
        setTableData(salesData);
      } else {
        setTableData(tableData);
      }
    } else {
      /// if last item is deleted

      setTableData([]);
    }
  }, [budgetData, salesData]);

  return (
    <TableContainer component={Paper} sx={{ paddingBottom: "2rem" }}>
      {tableData[0] && budgetData && (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            marginTop: "20px",
            marginLeft: "15px",
          }}
        >
          <Tooltip title="Search dates, description, amounts, etc">
            <div>
              <input
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {
                  handleSearch(e);
                  setSearchValue(e.target.value);
                }}
              ></input>
              <Search sx={{ verticalAlign: "middle" }}></Search>
            </div>
          </Tooltip>
          {isSearchSuccess && (
            <Tooltip title="Reset">
              <Cancel
                onClick={() => {
                  setTableData(budgetData);
                  setIsSearchSuccess(false);
                  setSearchValue("");
                  setHasResults(true);
                }}
                sx={{
                  ":hover": {
                    transform: "scale(1.1)",
                    cursor: "pointer",
                    fill: "red",
                  },
                }}
              ></Cancel>
            </Tooltip>
          )}
        </div>
      )}
      {tableData[0] && budgetData ? (
        <Table sx={{ width: "600px", margin: "auto" }}>
          <TableHead sx={{}}>
            <TableRow>
              <TableCell
                onClick={() => {
                  sortedArg === "date-down" ||
                  !sortedArg.match("date") ||
                  sortedArg === "date"
                    ? sortTable(
                        tableData as BudgetType[],
                        sortedArg === "" || !sortedArg.match("date")
                          ? "date"
                          : "date-up"
                      )
                    : sortTable(tableData as BudgetType[], "date-down");
                }}
                align="center"
                sx={{
                  fontSize: "medium",
                  justifyContent: "center",
                  userSelect: "none",
                  padding: "20px 0",

                  ":hover": {
                    cursor: "pointer",
                    transition: "all .8s",
                    boxShadow: "inset 0 -10px " + mainColor,
                  },
                }}
              >
                Date
                <ArrowDownward
                  sx={{
                    verticalAlign: "middle",
                    marginLeft: "10px",
                    transform:
                      sortedArg === "date-up"
                        ? "rotateZ(-180deg)"
                        : sortedArg === "date-down" || sortedArg === "date"
                        ? "none"
                        : "rotateZ(-90deg)",
                    transition: "all .3s",
                  }}
                ></ArrowDownward>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: "medium",
                  justifyContent: "center",
                  userSelect: "none",
                  padding: 0,
                  ":hover": {
                    cursor: "pointer",
                    transition: "all .8s",
                    boxShadow: "inset 0 -10px " + mainColor,
                  },
                }}
                onClick={() => {
                  !sortedArg ||
                  !sortedArg.match("type") ||
                  sortedArg === "type-expense"
                    ? sortTable(tableData as BudgetType[], "type-income")
                    : sortTable(tableData as BudgetType[], "type-expense");
                }}
              >
                Operation
                <ArrowDownward
                  sx={{
                    transform:
                      sortedArg === "type-expense"
                        ? "rotateZ(-180deg)"
                        : sortedArg === "type-income"
                        ? "none"
                        : "rotateZ(-90deg)",
                    transition: "all .3s",
                    verticalAlign: "middle",
                  }}
                ></ArrowDownward>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: "medium",
                  userSelect: "none",
                  padding: 0,
                }}
              >
                Description
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: "medium",
                  justifyContent: "center",
                  userSelect: "none",
                  padding: 0,
                  ":hover": {
                    cursor: "pointer",
                    transition: "all .8s",
                    boxShadow: "inset 0 -10px " + mainColor,
                  },
                }}
                onClick={() => {
                  !sortedArg.match("amount") || sortedArg === "amount-down"
                    ? sortTable(tableData as BudgetType[], "amount-up")
                    : sortTable(tableData as BudgetType[], "amount-down");
                }}
              >
                Amount
                <ArrowDownward
                  sx={{
                    transform:
                      sortedArg === "amount-down"
                        ? "rotateZ(-180deg)"
                        : sortedArg === "amount-up"
                        ? "none"
                        : "rotateZ(-90deg)",
                    transition: "all .3s",
                    verticalAlign: "middle",
                  }}
                ></ArrowDownward>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!hasResults ? (
              <p>Nothing Found</p>
            ) : (
              tableData &&
              setBudgetData &&
              tableData.map((operation, index) => {
                return (
                  <TableItem
                    key={index + "budget"}
                    operation={operation}
                    index={index}
                    setBudgetData={setBudgetData}
                  ></TableItem>
                );
              })
            )}
          </TableBody>
        </Table>
      ) : (
        tableData[0] &&
        salesData && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "medium",
                    display: "flex",
                    justifyContent: "center",
                    userSelect: "none",
                  }}
                >
                  Period
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "medium",
                    justifyContent: "center",
                    userSelect: "none",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "medium",
                    userSelect: "none",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "medium",
                    justifyContent: "center",
                    userSelect: "none",
                  }}
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                setSalesData &&
                tableData.map((item, index) => {
                  return (
                    <TableItem
                      key={index + "sales"}
                      operation={item}
                      type={"sales"}
                      index={index}
                      setSalesData={setSalesData}
                    ></TableItem>
                  );
                })}
            </TableBody>
          </Table>
        )
      )}
    </TableContainer>
  );
};

export default TableComponent;
