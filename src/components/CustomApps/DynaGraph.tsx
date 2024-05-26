import {
  Grid,
  List,
  TextField,
  FormControl,
  Button,
  Radio,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Alert,
  Tooltip,
  Autocomplete,
  Box,
  useTheme,
} from "@mui/material";
import { budgetMergeSort } from "../../utils/mergeSort";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker as DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import React, { useState, useEffect, SetStateAction, useContext } from "react";
import { format } from "date-fns";
import { Resizable } from "re-resizable";
import TableComponent from "./ChartComponents/TableChart";
import SARIMA from "arima";
import SalesLineChart from "./ChartComponents/SalesLineChart";
import dataset from "../../bigDummyData.json";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  Timeline,
  Assessment,
  ShowChart,
  PieChart,
  TableChart,
  FilterAlt,
  Add,
  Remove,
  Info,
  Download,
} from "@mui/icons-material";
import LineChart from "./ChartComponents/LineChart";
import salesDummyData from "../../salesdatadummy.json";
import { evaluate } from "mathjs";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

import "../../styles/graphstyle.scss";
import { DarkModeContext } from "../Wrapper";
export type BudgetType = {
  initialBudget?: number;
  typeof: string;
  amount: number;
  date: string;
  description?: string;
  balance?: number;
};

export type SalesType = {
  id?: number;
  category?: string;
  amount: number;
  period: string;
  age_group: string;
  gender: string;
};

// P: 1,
// D: 0,
// Q: 1,
// s: 24,

// const sarima = new SARIMA({
//   p: 2,
//   d: 1,
//   q: 2,
//   verboise: true,
// }).train(dataset.map((item) => item.amount));

// const [pred, errors] = sarima.predict(7);

// console.log(pred, "prediction", errors, "errors");

const datePickerDates = new Set<string>();

interface AdvancedFilterSelectProps {
  startDate: string;
  endDate: string;
  type: string;
  filter: { [key: string]: string };
  setFilter: React.Dispatch<SetStateAction<{ [key: string]: string }>>;
  compareCount?: number;
  budgetData: BudgetType[];
}

const AdvancedDateSelect: React.FC<AdvancedFilterSelectProps> = ({
  startDate,
  endDate,
  type,
  filter,
  setFilter,
  compareCount,
  budgetData,
}) => {
  useEffect(() => {
    /*Conditional explanation: 
        If the client adds an item to compare in advanced compare options, and changes only one value of the last added item
        and inmediatly removes it, the filter.valid is false even if it should be valid,
         because it was the last state of the filter obj. So, this conditional  addresses that. */

    //////////////// ///////////////////////// //////////////////////// //////////////// needs fix or deletion
    if (
      filter &&
      compareCount &&
      compareCount * 2 === Object.keys(filter).length - 2 &&
      !filter.valid
    ) {
      setFilter((prev) => {
        const isValid = { ...prev };
        isValid.valid = "true";
        return isValid;
      });
    }
  }, [filter]);

  const handleChange = (value: string) => {
    const newFilter = { [type]: value, valid: "" };
    const filterLength = Object.keys(filter).length;
    const { show_from = "", show_to = "" } = { ...filter };

    console.log(compareCount, filterLength);
    switch (true) {
      case type === "show_from":
      case type === "show_to":
        show_from || show_to
          ? setFilter((prev) => {
              newFilter.valid = "true";
              return { ...prev, ...newFilter };
            })
          : setFilter(newFilter);
        return;

      case /(advanced)/g.test(type):
        filter &&
        filterLength > 0 &&
        /(advanced)/gi.test(Object.keys(filter)[0])
          ? setFilter((prev) => {
              if (compareCount && compareCount * 2 === filterLength) {
                newFilter.valid = "true";
              }
              return { ...prev, ...newFilter };
            })
          : setFilter(newFilter);
        return;
    }
  };

  function setDateAvailables() {
    for (const obj of budgetData) {
      datePickerDates.add(new Date(obj.date).toISOString().split("T")[0]);
    }

    return;
  }
  useEffect(() => {
    setDateAvailables();
  }, [budgetData]);

  function getPickerDate(date: Date) {
    const stringDate = new Date(date).toISOString().split("T")[0];
    return Array.from(datePickerDates).includes(stringDate) ? false : true;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        onChange={(e) => {
          if (e) {
            handleChange(e.toLocaleDateString());
          }
        }}
        sx={{ width: "10rem" }}
        // disableFuture
        shouldDisableDate={getPickerDate}
        value={new Date(filter[type]) || ""}
        views={["year", "month", "day"]}
      ></DatePicker>
    </LocalizationProvider>
  );
};

interface FilterSelectProps {
  splitIndex: number;
  availableDates: Set<string>;
  monthOnly?: boolean;
  type: string;
  filter: { [key: string]: string };
  setFilter: React.Dispatch<SetStateAction<{ [key: string]: string }>>;
  compareCount?: number;
  disabled?: boolean;
}

const defaultSalesItem: SalesType = {
  period: "",
  id: 0,
  amount: 0,
  category: "",
  age_group: "",
  gender: "",
};
const FilterSelect: React.FC<FilterSelectProps> = ({
  splitIndex,
  availableDates,
  monthOnly,
  setFilter,
  filter,
  type,
  disabled,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Select");
  const getYears = Array.from(availableDates).filter((item) => {
    return !isNaN(Number(item));
  });

  const getMonths = Array.from(availableDates).filter((item) => {
    return isNaN(Number(item));
  });

  useEffect(() => {
    if (filter) {
      setSelectedFilter(filter[type] || "Select");
    }
  }, [filter]);

  const handleChange = (value: string) => {
    const newFilter = { [type]: value, valid: "" };
    const filterLength = Object.keys(filter).length;
    if (value === "Select") {
      if (filter[type]) {
        setFilter((prev) => {
          const rmv = { ...prev };
          delete rmv[type];
          rmv.valid = "";
          return rmv;
        });
      }
      return;
    }
    switch (type) {
      case "simple_year":
      case "simple_month":
        newFilter.valid = "true";
        setFilter(newFilter);
        return;
      case "simple_year_compare_0":
      case "simple_year_compare_1":
      case "simple_month_compare_0":
      case "simple_month_compare_1":
        filter && filterLength > 0 && Object.keys(filter)[0].match("compare")
          ? setFilter((prev) => {
              newFilter.valid = "true";
              return { ...prev, ...newFilter };
            })
          : setFilter(newFilter);
        return;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Select
        disabled={disabled}
        value={selectedFilter}
        autoWidth
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        <MenuItem key="Select" value="Select">
          Select
        </MenuItem>
        {splitIndex === 0 &&
          getYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        {splitIndex === 1 &&
          getMonths.map((item, index) => (
            <MenuItem
              key={index}
              value={monthOnly ? item : item.split("-")[splitIndex]}
            >
              {monthOnly ? item : item.split("-")[splitIndex]}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

const DynaGraph = () => {
  const [selectedOption, setSelectedOption] = useState<string>("budget");
  const [typeOfValue, setTypeOfValue] = useState<string>("Expense");
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(new Date(), "MMMM")
  );
  const [description, setDescription] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(false);
  const [budgetData, setBudgetData] = useState<BudgetType[]>([]);
  const [salesData, setSalesData] = useState<SalesType[]>([]);
  const [graphView, setGraphView] = useState<string>("table");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<{
    [key: string]: string;
  }>({});
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [availableDates, setAvailableDates] = useState<Set<string>>(
    new Set<string>()
  );

  const [foundBudget, setFoundBudget] = useState<boolean>(false);
  const [IDautocompleteOptions, setIDAutocompleteOptions] = useState<
    Set<string>
  >(new Set<string>());
  const [categoryAutocompleteOptions, setCategoryAutocompleteOptions] =
    useState<Set<string>>(new Set<string>());
  const [salesDataItem, setSalesDataItem] =
    useState<SalesType>(defaultSalesItem);

  const [descriminate, setDescriminate] = useState<string>("Yes");

  const [viewMode, setViewMode] = useState<string>("Linear");
  const bigData = true;
  const [advancedFilters, setAdvancedFilters] = useState<number[]>([1, 1]);
  const [filterTabNav, setFilterTabNav] = useState<string>("Year");
  const [isFormInvalid, setIsFormInvalid] = useState({
    budget: 0,
    amount: 0,
    date: "",
  });

  const [tableAvailableDates, setTableAvailableDates] = useState<Set<string>>(
    new Set<string>()
  );
  const [dateInputValue, setDateInputValue] = useState<string>("");
  const theme = useTheme();
  const appContext = useContext(DarkModeContext);
  const darkMode = appContext?.darkMode;
  const mainColor = theme.palette.primary.main;
  const backgroundColor = theme.palette.background.default;
  const [svgFill, setSvgFill] = useState<string>("white");
  const validateForm = () => {
    if (isFormInvalid.amount && isFormInvalid.date) {
      return true;
    } else {
      return false;
    }
  };

  const [chartResize, setChartResize] = useState<boolean>(false);

  const Balance = () => {
    if (graphView !== "table") {
      return "";
    }
    const balance = budgetData.reduce((acc, curr) => acc + curr.amount, 0);
    if (!appliedFilters.simple_month) {
      return (
        <p style={{ color: Number(balance) < 0 ? "red" : "green" }}>
          {balance.toLocaleString()}
        </p>
      );
    } else {
      const filterData = budgetData.filter((item) => {
        const itemMonth = item.date.split("T")[0];
        const valueMonth = new Date(appliedFilters.simple_month)
          .toISOString()
          .split("T")[0];
        return (
          new Date(itemMonth).getMonth() + 2 ===
          new Date(valueMonth).getMonth() + 2
        );
      });
      const monthBalance = filterData.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      const result = evaluate(
        `${isFormInvalid.budget.toString()} + ${monthBalance.toString()}`
      );
      return (
        <p style={{ color: Number(result) < 0 ? "red" : "green" }}>
          {result.toLocaleString()}
        </p>
      );
    }
  };

  const handleApplyFilter = () => {
    setAppliedFilters({});
    setAppliedFilters(filter);
    return setFilter({});
  };

  function findAddedBudget(arg?: Date) {
    const lastChange =
      arg && !appliedFilters.simple_month ? arg : isFormInvalid.date;
    if (
      (isFormInvalid.date && budgetData.length >= 0) ||
      (appliedFilters.simple_month && budgetData.length >= 0)
    ) {
      const BudgetAdded = budgetData.findIndex((item) => {
        const dateToCheck = appliedFilters.simple_month
          ? months[new Date(appliedFilters.simple_month).getMonth() + 1] +
            "-" +
            new Date(appliedFilters.simple_month).getFullYear()
          : lastChange;

        return (
          format(new Date(dateToCheck), "MM/yyyy") ===
            format(new Date(item.date), "MM/yyyy") && item.initialBudget
        );
      });

      if (BudgetAdded >= 0 && budgetData[BudgetAdded]) {
        const value = budgetData[BudgetAdded].initialBudget;
        if (value) {
          setFoundBudget(true);
          setIsFormInvalid((prev) => ({ ...prev, budget: Number(value) }));
          return value;
        } else {
          return 0;
        }
      } else {
        setIsFormInvalid((prev) => ({ ...prev, budget: 0 }));
        setFoundBudget(false);
        return 0;
      }
    } else {
      setIsFormInvalid((prev) => ({ ...prev, budget: 0 }));
      setFoundBudget(false);

      return 0;
    }
  }

  const handleAutocomplete = (e: any) => {
    const id = Number(e.target.textContent);
    setSalesDataItem((prev) => ({
      ...prev,
      id: id,
    }));
    const getCategory = salesData.findIndex((array) => array.id === id);
    if (getCategory >= 0) {
      const category = salesData[getCategory].category;
      if (category) {
        setSalesDataItem((prev) => ({
          ...prev,
          category: category,
        }));
      }
    } else {
      return;
    }
    return;
  };

  const handleAddBudgetData = () => {
    const budgetAdded = findAddedBudget();

    setBudgetData((prev) => [
      ...prev,
      {
        initialBudget: budgetAdded ? budgetAdded : isFormInvalid.budget,
        amount:
          typeOfValue === "Expense"
            ? Number(isFormInvalid.amount * -1)
            : isFormInvalid.amount,
        typeof: typeOfValue,
        date: new Date(isFormInvalid.date).toUTCString(),
        description: description,
      },
    ]);
    const newSet = new Set<string>(availableDates);
    const addDate = `${new Date(isFormInvalid.date).getFullYear()}-${format(
      new Date(isFormInvalid.date),
      "MM"
    )}`;
    newSet.add(addDate);
    setAvailableDates(newSet);
    return setIsFormInvalid({ budget: 0, amount: 0, date: isFormInvalid.date });
  };

  useEffect(() => {
    if (bigData && dataset) {
      const newSet = new Set<string>(availableDates);
      const tableSet = new Set<string>(availableDates);
      for (const data of dataset) {
        const tableDate = `${new Date(data.date).getFullYear()}-${format(
          new Date(data.date),
          "MM"
        )}`;
        const monthDate = months[new Date(data.date).getMonth()];
        const yearDate = new Date(data.date).getFullYear().toString();
        tableSet.add(tableDate);
        newSet.add(monthDate);
        newSet.add(yearDate);
      }
      setAvailableDates(newSet);
      setTableAvailableDates(tableSet);
      setBudgetData(dataset);
    }
    if (budgetData.length > 0) {
      const newSet = new Set<string>(availableDates);
      const tableSet = new Set<string>(tableAvailableDates);
      for (const data of budgetData) {
        const tableDate = `${new Date(data.date).getFullYear()}-${format(
          new Date(data.date),
          "MM"
        )}`;
        const monthDate = months[new Date(data.date).getMonth()];
        const yearDate = new Date(data.date).getFullYear().toString();
        tableSet.add(tableDate);
        newSet.add(monthDate);
        newSet.add(yearDate);
      }
      setAvailableDates(newSet);
      setTableAvailableDates(tableSet);

      setBudgetData(
        budgetData.sort((a: BudgetType, b: BudgetType) => {
          if (a && a.date && b && b.date) {
            if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
              return -1;
            } else {
              return 1;
            }
          }
          return 0;
        })
      );
    }
    if (salesDummyData) {
      setSalesData(salesDummyData);
    }
  }, [budgetData]);

  const handleGraphChange = (e: React.MouseEvent, graph: string) => {
    setAppliedFilters({});
    setFilter({});
    setGraphView(graph);
    return;
  };

  useEffect(() => {
    if (formError) {
      setFormError(false);
    }
  }, [isFormInvalid]);

  useEffect(() => {
    const formatDate = `2024-${
      months.indexOf(currentMonth) >= 9
        ? (months.indexOf(currentMonth) + 1).toString()
        : "0" + (months.indexOf(currentMonth) + 1).toString()
    }-${format(new Date().getTime(), "dd")}`;
    setDateInputValue(formatDate);
    setIsFormInvalid((prev) => ({
      ...prev,
      date: formatDate,
    }));
    if (graphView === "table") {
      //@ts-expect-error
      findAddedBudget(formatDate);
    }
  }, [currentMonth]);

  useEffect(() => {
    if (graphView === "table") {
      findAddedBudget();
    }
  }, [appliedFilters.simple_month, budgetData]);

  useEffect(() => {
    ///update UI
  }, [selectedOption, graphView]);

  useEffect(() => {
    if (salesData.length > 2) {
      const idSet = new Set(IDautocompleteOptions);
      const categorySet = new Set(categoryAutocompleteOptions);
      for (const item of salesData) {
        if (item.id) {
          idSet.add(item.id.toString());
        }
        if (item.category) {
          categorySet.add(item.category);
        }
      }
      setCategoryAutocompleteOptions(categorySet);
      return setIDAutocompleteOptions(idSet);
    }
  }, [salesData]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--icon-color",
      darkMode ? "1" : "0"
    );
    setSvgFill(darkMode ? "white" : "black");
  }, [darkMode]);

  return (
    <Grid
      style={{
        color: "white",
        height: "calc(100% - 25px)",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        top: "25px",
      }}
      columns={12}
      container
    >
      {formError && (
        <Alert
          severity="error"
          sx={{ position: "absolute", left: "40%", zIndex: "3" }}
        >
          Missing Fields
        </Alert>
      )}

      <Grid container item xs={12} margin={"0"} height={"100%"}>
        <Grid container item xs={12} width={"100%"} height={"30px"} zIndex={3}>
          <List
            sx={{
              width: "100%",
              height: "30px",
              display: "flex",
              position: "relative",
              gap: "3px",
              padding: 0,
              zIndex: 3,
            }}
          >
            <Button
              onClick={() => setSelectedOption("budget")}
              sx={{
                width: "fit-content",
                boxShadow:
                  selectedOption === "sales"
                    ? "inset 0 0 0 3px" + mainColor
                    : "none",
              }}
              variant={selectedOption === "budget" ? "contained" : "outlined"}
            >
              Budget
            </Button>
            <Button
              onClick={() => setSelectedOption("sales")}
              sx={{
                width: "fit-content",
                boxShadow:
                  selectedOption !== "sales"
                    ? "inset 0 0 0 3px" + mainColor
                    : "none",
              }}
              variant={selectedOption === "sales" ? "contained" : "outlined"}
            >
              Sales
            </Button>
          </List>
        </Grid>
        <Grid
          width={"100%"}
          item
          container
          xs={12}
          // margin={"-24px 0 0 0"}
        >
          <Grid
            style={{
              width: "100%",
              display: "flex",
              backgroundColor: backgroundColor,
            }}
          >
            <Resizable
              defaultSize={{
                width: "30%",
                height: "485px",
              }}
              onResizeStop={() => setChartResize(!chartResize)} ///// Update google-react-charts UI
              enable={{
                left: false,
                right: true,
                top: false,
                bottom: false,
              }}
              maxWidth="52%"
              minWidth="25%"
            >
              <div
                style={{
                  borderRight: "double thick " + mainColor,
                  justifyContent: "center",
                  alignItems: "center",
                  height: "500px",
                  display: "flex",
                  margin: "auto",
                  padding: " 0 0 0 20px",
                  // overflowY: "auto",
                }}
              >
                {selectedOption === "budget" ? (
                  <FormControl
                    style={{
                      width: "auto",
                      paddingBottom: "30px",
                    }}
                  >
                    <Grid
                      item
                      container
                      gap={3}
                      m={"auto"}
                      paddingTop={"10px"}
                      sx={{ alignItems: "center" }}
                    >
                      <TextField
                        label="Month Budget"
                        type="number"
                        maxRows={1}
                        sx={{ fontSize: "18px" }}
                        value={isFormInvalid.budget}
                        disabled={foundBudget}
                        onChange={(e) => {
                          if (e.target.value.length >= 17) {
                            e.target.value = isFormInvalid.budget.toString(); // Limit the value to maxLength
                            return;
                          }
                          setIsFormInvalid((prev) => ({
                            ...prev,
                            budget: +e.target.value,
                          }));
                        }}
                      ></TextField>
                      <Select
                        onChange={(e) => {
                          setCurrentMonth(e.target.value);
                          findAddedBudget();
                        }}
                        value={currentMonth}
                        sx={{ width: "140px" }}
                      >
                        {months.map((month, index) => (
                          <MenuItem key={index} value={month}>
                            {month}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <RadioGroup
                      sx={{
                        color: darkMode ? "white" : "black",
                        flexDirection: "row",
                        mb: "1rem",
                        justifyContent: "center",
                      }}
                      onChange={(e) => setTypeOfValue(e.target.value)}
                      defaultValue={"Expense"}
                    >
                      <FormControlLabel
                        value="Income"
                        control={<Radio />}
                        label="Income"
                      />
                      <FormControlLabel
                        value="Expense"
                        control={<Radio />}
                        label="Expense"
                      />
                    </RadioGroup>
                    {typeOfValue === "Income" && (
                      <TextField
                        error={!isFormInvalid.amount}
                        label="Income"
                        required
                        type="number"
                        sx={{ m: "auto auto 1rem auto", maxWidth: "20rem" }}
                        onChange={(e) =>
                          setIsFormInvalid((prev) => ({
                            ...prev,
                            amount: +e.target.value,
                          }))
                        }
                      ></TextField>
                    )}
                    {typeOfValue === "Expense" && (
                      <TextField
                        label="Expense"
                        type="number"
                        error={!isFormInvalid.amount}
                        value={isFormInvalid.amount}
                        required
                        onChange={(e) =>
                          setIsFormInvalid((prev) => ({
                            ...prev,
                            amount: +e.target.value,
                          }))
                        }
                        sx={{ m: "auto auto 1rem auto", maxWidth: "20rem" }}
                      ></TextField>
                    )}
                    <Grid
                      item
                      container
                      xs={8}
                      justifyContent={"center"}
                      margin={"auto"}
                      alignItems={"center"}
                    >
                      <TextField
                        type="date"
                        value={dateInputValue || new Date()} ///// fix this to fix intial budget
                        error={!isFormInvalid.date}
                        onChange={(e) => {
                          setDateInputValue(e.target.value);
                          const budgetAdded = findAddedBudget();
                          const currentBudgetInput = isFormInvalid.budget || 0;
                          setIsFormInvalid((prev) => ({
                            ...prev,
                            date: new Date(e.target.value).toUTCString(),
                            budget: budgetAdded
                              ? budgetAdded
                              : currentBudgetInput,
                          }));
                        }}
                        sx={{ m: "auto", mb: "1rem" }}
                      ></TextField>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={8}
                      justifyContent={"center"}
                      margin={"auto"}
                      alignItems={"center"}
                    >
                      <div
                        style={{
                          display: "flex",
                          margin: 0,
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="For statistical precision, maintain consistency. For example, use 'Salary', 'Tax', 'Sale','Others', etc.">
                          <Info
                            className="info-icon"
                            sx={{
                              fill: svgFill,
                              marginLeft: "-20px",
                              mr: "10px",
                            }}
                          ></Info>
                        </Tooltip>
                        <TextField
                          label="Description"
                          onChange={(e) => setDescription(e.target.value)}
                          sx={{ m: "auto auto 1rem auto", maxWidth: "20rem" }}
                        ></TextField>
                      </div>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: "fit-content" }}
                      onClick={() => {
                        const isValid = validateForm();
                        if (!isValid) {
                          setFormError(true);
                          return;
                        } else {
                          handleAddBudgetData();
                        }
                      }}
                    >
                      Add
                    </Button>
                  </FormControl>
                ) : (
                  <Grid style={{ width: "auto", paddingBottom: "10px" }}>
                    <Grid
                      item
                      container
                      gap={3}
                      mb={3}
                      m={"auto"}
                      paddingTop={"10px"}
                    >
                      {salesData[0] && salesData.length > 2 ? (
                        <Autocomplete
                          sx={{ width: "10rem" }}
                          autoHighlight
                          noOptionsText="No match"
                          freeSolo
                          onChange={(e: any) => {
                            handleAutocomplete(e);
                          }}
                          renderInput={(params) => (
                            <TextField
                              value={salesDataItem.id || ""}
                              onChange={(e) => {
                                setSalesDataItem((prev) => ({
                                  ...prev,
                                  id: Number(e.target.value),
                                }));
                              }}
                              {...params}
                              label="Product ID"
                            ></TextField>
                          )}
                          options={Array.from(IDautocompleteOptions)}
                          renderOption={(props, option) => {
                            return (
                              <Box component={"li"} {...props}>
                                {option}
                              </Box>
                            );
                          }}
                        ></Autocomplete>
                      ) : (
                        <TextField
                          label="Product ID"
                          maxRows={1}
                          sx={{ width: "10rem" }}
                          value={salesDataItem.id || ""}
                          error={!salesDataItem.id}
                          onChange={(e) => {
                            setSalesDataItem((prev) => ({
                              ...prev,
                              id: Number(e.target.value),
                            }));
                          }}
                        ></TextField>
                      )}
                      {/* <TextField
                        value={salesDataItem.category}
                        onChange={(e) =>
                          setSalesDataItem((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        label="Category"
                        sx={{ m: "auto 0", maxWidth: "13rem" }}
                      ></TextField> */}
                      <Autocomplete
                        sx={{ width: "10rem" }}
                        autoHighlight
                        noOptionsText="No match"
                        freeSolo
                        value={salesDataItem.category}
                        onChange={(e: any) => {
                          setSalesDataItem((prev) => ({
                            ...prev,
                            category: e.target.textContent,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            value={salesDataItem.category || ""}
                            onChange={(e) => {
                              setSalesDataItem((prev) => ({
                                ...prev,
                                category: e.target.value,
                              }));
                            }}
                            {...params}
                            label="Category"
                          ></TextField>
                        )}
                        options={Array.from(categoryAutocompleteOptions)}
                        renderOption={(props, option) => {
                          return (
                            <Box component={"li"} {...props}>
                              {option}
                            </Box>
                          );
                        }}
                      ></Autocomplete>
                    </Grid>

                    <Grid
                      item
                      container
                      xs={8}
                      margin={"auto"}
                      justifyContent={"center"}
                      width={"100%"}
                      rowGap={3}
                      columns={2}
                      marginTop={"1rem"}
                    >
                      <TextField
                        type="number"
                        error={!salesDataItem.period}
                        value={salesDataItem.period || ""}
                        sx={{ m: "auto", width: "100px" }}
                        onChange={(e) => {
                          if (Number(e.target.value) > 99) {
                            return setSalesDataItem((prev) => ({
                              ...prev,
                              period: "99",
                            }));
                          } else if (Number(e.target.value) < 0) {
                            return setSalesDataItem((prev) => ({
                              ...prev,
                              period: "1",
                            }));
                          }

                          setSalesDataItem((prev) => ({
                            ...prev,
                            period: e.target.value,
                          }));
                        }}
                        label="Period"
                      ></TextField>

                      <TextField
                        type="number"
                        value={salesDataItem.amount || ""}
                        error={!salesDataItem.amount}
                        // error={!isFormInvalid.date}
                        sx={{ m: "auto", width: "100px" }}
                        onChange={(e) =>
                          setSalesDataItem((prev) => ({
                            ...prev,
                            amount: Number(e.target.value),
                          }))
                        }
                        label="Amount"
                      ></TextField>
                      <Select
                        value={salesDataItem.gender || "Gender"}
                        sx={{ m: "auto" }}
                        onChange={(e) =>
                          setSalesDataItem((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value="Gender">Gender</MenuItem>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Undefined">X</MenuItem>
                        <MenuItem value="Undefined">N/A</MenuItem>
                      </Select>
                      <Select
                        value={salesDataItem.age_group || "Age Group"}
                        sx={{ m: "auto" }}
                        onChange={(e) =>
                          setSalesDataItem((prev) => ({
                            ...prev,
                            age_group: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value="Age Group">Age Group</MenuItem>
                        <MenuItem value="0-12">0-12</MenuItem>
                        <MenuItem value="13-18">13-18</MenuItem>
                        <MenuItem value="19-30">19-30</MenuItem>
                        <MenuItem value="31-40">31-40</MenuItem>
                        <MenuItem value="41-60">41-60</MenuItem>
                        <MenuItem value="60+">60+</MenuItem>
                        <MenuItem value="N/A">N/A</MenuItem>
                      </Select>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: "fit-content" }}
                      onClick={() => {
                        if (salesData.length > 0) {
                          setSalesData((prev) => [...prev, salesDataItem]);
                        } else {
                          setSalesData([salesDataItem]);
                        }
                        setSalesDataItem(defaultSalesItem);
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                )}
              </div>
            </Resizable>

            <div
              style={{
                color: "black",
                overflowY: "hidden",
                width: "75%",
                minWidth: "1px",
                height: "485px",
              }}
            >
              <div
                style={{
                  display:
                    selectedOption === "budget" && appliedFilters.simple_month
                      ? "block"
                      : "none",
                }}
              >
                <p
                  style={{
                    display: graphView === "table" ? "flex" : "none",
                    fontWeight: "bolder",
                    height: "fit-content",
                    margin: " 1rem",
                    color: darkMode ? "white" : "black",
                  }}
                >
                  Initial Budget:{" "}
                  <span style={{ fontWeight: "normal" }}>
                    ${" "}
                    {isFormInvalid.budget.toLocaleString() !== "NaN"
                      ? isFormInvalid.budget.toLocaleString()
                      : "N/D"}
                  </span>
                  {" | " +
                    (months[
                      new Date(appliedFilters.simple_month).getMonth() + 1
                    ] || currentMonth) +
                    "-" +
                    (new Date(appliedFilters.simple_month)
                      .getFullYear()
                      .toString() ||
                      new Date(isFormInvalid.date).getFullYear().toString())}
                </p>
              </div>
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {budgetData[0] && (
                  <div
                    style={{
                      position: "sticky",
                      top: 0,
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: backgroundColor,
                      boxShadow: "0 3px 3px -2px gray",
                      zIndex: 2,
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content",
                        gap: "10px",
                        marginLeft: "6px",
                        fontSize: "18px",
                        color: darkMode ? "white" : "black",
                      }}
                    >
                      <b>{!isFormInvalid.budget ? "Overall" : ""} Balance:</b>{" "}
                      <Balance />
                    </div>
                    <div
                      style={{
                        marginLeft: "1rem",
                        gap: ".5rem",
                        display: "flex",
                      }}
                    >
                      <TableChart
                        sx={{
                          fill: svgFill,
                          borderRadius: "100%",
                          padding: "3px",
                          backgroundColor:
                            graphView === "table" ? mainColor : "transparent",
                        }}
                        onClick={(e) => handleGraphChange(e, "table")}
                      />
                      <ShowChart
                        sx={{
                          fill: svgFill,
                          borderRadius: "100%",
                          padding: "3px",
                          backgroundColor:
                            graphView === "chart" ? mainColor : "transparent",
                        }}
                        onClick={(e) => handleGraphChange(e, "chart")}
                      />
                      <Assessment
                        sx={{
                          fill: svgFill,
                          borderRadius: "100%",
                          padding: "3px",
                          backgroundColor:
                            graphView === "Bar" ? mainColor : "transparent",
                        }}
                        onClick={(e) => handleGraphChange(e, "Bar")}
                      />
                      <Tooltip title="Pie Chart">
                        <PieChart
                          sx={{
                            fill: svgFill,
                            borderRadius: "100%",
                            padding: "3px",
                            backgroundColor:
                              graphView === "PieChart"
                                ? mainColor
                                : "transparent",
                          }}
                          onClick={(e) => handleGraphChange(e, "PieChart")}
                        />
                      </Tooltip>
                      <Tooltip
                        title="Predict"
                        style={{
                          display:
                            selectedOption === "budget" ? "flex" : "none",
                        }}
                      >
                        <Timeline
                          sx={{
                            fill: svgFill,
                            borderRadius: "100%",
                            padding: "3px",
                            backgroundColor:
                              graphView === "timeline"
                                ? mainColor
                                : "transparent",
                          }}
                          onClick={() => setGraphView("Predict")}
                        />
                      </Tooltip>
                      <div
                        style={{
                          opacity: selectedOption === "sales" ? "0" : "1",
                        }}
                      >
                        <FilterAlt
                          sx={{
                            fill: svgFill,
                            backgroundColor: showFilters
                              ? mainColor
                              : "transparent",
                          }}
                          onClick={() => setShowFilters(!showFilters)}
                        ></FilterAlt>
                      </div>
                      {/* <Button sx={{ p: 0, ml: "1rem" }} onClick={handleDownload}>
                        <Download sx={{ fill: svgFill }}></Download>
                      </Button> */}
                      {showFilters && selectedOption === "budget" && (
                        <Grid
                          item
                          container
                          sx={{
                            position: "absolute",
                            width: "500px",
                            right: 0,
                            top: "60px",
                            height: "300px",
                            color: darkMode ? "white" : "black",
                            zIndex: 1,
                            boxShadow: "0 0 4px 2px gray",
                            backgroundColor: backgroundColor,
                            borderRadius: "15px",
                          }}
                        >
                          <Grid item container>
                            <Grid
                              item
                              xs={12}
                              height={"50px"}
                              sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                borderRadius: "15px 15px 0 0",
                              }}
                            >
                              <Button
                                fullWidth
                                variant={
                                  filterTabNav === "Year"
                                    ? "contained"
                                    : "outlined"
                                }
                                onClick={() => setFilterTabNav("Year")}
                                sx={{ borderRadius: "15px 0 0 0" }}
                              >
                                Year
                              </Button>
                              <Button
                                fullWidth
                                variant={
                                  filterTabNav === "Month"
                                    ? "contained"
                                    : "outlined"
                                }
                                sx={{ borderRadius: "0" }}
                                onClick={() => setFilterTabNav("Month")}
                              >
                                Month
                              </Button>
                              <Button
                                fullWidth
                                variant={
                                  filterTabNav === "Advanced"
                                    ? "contained"
                                    : "outlined"
                                }
                                sx={{ borderRadius: "0 15px 0 0" }}
                                disabled={
                                  graphView === "table" ||
                                  graphView === "PieChart"
                                }
                                onClick={() => setFilterTabNav("Advanced")}
                              >
                                Advanced
                              </Button>
                            </Grid>
                            {filterTabNav === "Month" && (
                              <Grid
                                width={"100%"}
                                height={"calc(100% - 50px)"}
                                sx={{
                                  borderRadius: "0 0 15px 15px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "center",
                                    marginTop: "2rem",
                                    marginLeft: "1rem",
                                  }}
                                >
                                  <Tooltip title="Show all availble data from the selected month. e.g: July of 202X">
                                    <span className="filter-tooltip">
                                      <Info
                                        className="info-icon"
                                        sx={{
                                          fill: svgFill,
                                          fontSize: "20px",
                                          verticalAlign: "middle",
                                        }}
                                      />
                                      Show available months
                                    </span>
                                  </Tooltip>
                                  <FilterSelect
                                    type={"simple_month"}
                                    filter={filter}
                                    setFilter={setFilter}
                                    splitIndex={1}
                                    monthOnly={true}
                                    availableDates={
                                      graphView === "table" ||
                                      graphView === "PieChart"
                                        ? tableAvailableDates
                                        : availableDates
                                    }
                                  />
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    gap: "1rem",
                                    color:
                                      graphView === "table"
                                        ? "gray"
                                        : darkMode
                                        ? "white"
                                        : "black",
                                    alignItems: "center",
                                    marginTop: "2rem",
                                    marginLeft: "1rem",
                                  }}
                                >
                                  <Tooltip title="Compare availble data from the selected months. e.g: July of 202X and June 202X">
                                    <span className="filter-tooltip">
                                      <Info
                                        className="info-icon"
                                        sx={{
                                          fill: svgFill,
                                          fontSize: "20px",
                                          verticalAlign: "middle",
                                        }}
                                      />
                                      Compare
                                    </span>
                                  </Tooltip>
                                  <FilterSelect
                                    disabled={
                                      graphView === "table" ||
                                      graphView === "PieChart"
                                    }
                                    type={"simple_month_compare_0"}
                                    filter={filter}
                                    setFilter={setFilter}
                                    splitIndex={1}
                                    monthOnly={true}
                                    availableDates={availableDates}
                                  />
                                  and
                                  <FilterSelect
                                    disabled={
                                      graphView === "table" ||
                                      graphView === "PieChart"
                                    }
                                    type={"simple_month_compare_1"}
                                    filter={filter}
                                    setFilter={setFilter}
                                    splitIndex={1}
                                    monthOnly={true}
                                    availableDates={availableDates}
                                  />
                                </div>

                                <Button
                                  variant="contained"
                                  sx={{
                                    width: "fit-content",
                                    margin: "1rem",
                                  }}
                                  disabled={!Boolean(filter.valid)}
                                  onClick={handleApplyFilter}
                                >
                                  Apply
                                </Button>
                                <Button
                                  variant="contained"
                                  sx={{ width: "fit-content" }}
                                  disabled={!Boolean(appliedFilters.valid)}
                                  onClick={() => {
                                    setFilter({});
                                    setAppliedFilters({});
                                  }}
                                >
                                  Reset Filters
                                </Button>
                              </Grid>
                            )}
                            {filterTabNav === "Year" && (
                              <Grid
                                width={"100%"}
                                height={"calc(100% - 50px)"}
                                sx={{
                                  borderRadius: "0 0 15px 15px",
                                  border: "solid gray 1px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "center",
                                    marginTop: "2rem",
                                    marginLeft: "1rem",
                                    color: darkMode ? "white" : "black",
                                  }}
                                >
                                  <Tooltip title="Shows all available data for the selected year">
                                    <span className="filter-tooltiṕ">
                                      <Info
                                        className="info-icon"
                                        sx={{
                                          fill: svgFill,
                                          fontSize: "20px",
                                        }}
                                      />
                                      Show available years
                                    </span>
                                  </Tooltip>
                                  <FilterSelect
                                    type={"simple_year"}
                                    splitIndex={0}
                                    filter={filter}
                                    setFilter={setFilter}
                                    availableDates={availableDates}
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "center",
                                    marginTop: "2rem",
                                    marginLeft: "1rem",
                                    color:
                                      graphView === "table"
                                        ? "gray"
                                        : darkMode
                                        ? "white"
                                        : "black",
                                  }}
                                >
                                  <Tooltip title="Compare all the availble data between two years">
                                    <span className="filter-tooltiṕ">
                                      <Info
                                        className="info-icon"
                                        sx={{
                                          fill: svgFill,
                                          fontSize: "20px",
                                        }}
                                      />
                                      Compare:
                                    </span>
                                  </Tooltip>
                                  <FilterSelect
                                    disabled={
                                      graphView === "table" ||
                                      graphView === "PieChart"
                                    }
                                    type={"simple_year_compare_0"}
                                    splitIndex={0}
                                    availableDates={availableDates}
                                    filter={filter}
                                    setFilter={setFilter}
                                  />
                                  and
                                  <FilterSelect
                                    disabled={
                                      graphView === "table" ||
                                      graphView === "PieChart"
                                    }
                                    type={"simple_year_compare_1"}
                                    splitIndex={0}
                                    availableDates={availableDates}
                                    filter={filter}
                                    setFilter={setFilter}
                                  />
                                </div>
                                <Button
                                  variant="contained"
                                  disabled={!Boolean(filter.valid)}
                                  sx={{
                                    width: "fit-content",
                                    margin: "1rem",
                                  }}
                                  onClick={handleApplyFilter}
                                >
                                  Apply
                                </Button>
                                <Button
                                  variant="contained"
                                  sx={{ width: "fit-content" }}
                                  disabled={!Boolean(appliedFilters.valid)}
                                  onClick={() => {
                                    setFilter({});
                                    setAppliedFilters({});
                                  }}
                                >
                                  Reset Filters
                                </Button>
                              </Grid>
                            )}
                            {filterTabNav === "Advanced" && (
                              <Grid
                                width={"100%"}
                                maxHeight={"250px"}
                                sx={{
                                  borderRadius: "0 0 15px 15px",
                                  overflowY: "scroll",
                                }}
                              >
                                <Grid
                                  container
                                  style={{
                                    margin: "auto",
                                    display: "flex",
                                    marginTop: "20px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Tooltip title="Sets the graph display to Linear(default) or Timeframe, depending on the filters applied ">
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "3px",
                                        margin: "auto 20px auto -20px",
                                      }}
                                    >
                                      <Info className="info-icon"></Info>
                                      Display Mode:
                                    </div>
                                  </Tooltip>
                                  <RadioGroup
                                    value={viewMode}
                                    onChange={(e) => {
                                      setViewMode(e.target.value);
                                    }}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Tooltip title="Linear Graph ">
                                      <FormControlLabel
                                        control={<Radio />}
                                        label="Linear"
                                        value="Linear"
                                      />
                                    </Tooltip>
                                    <Tooltip title={"Timeframe Graph"}>
                                      <FormControlLabel
                                        control={<Radio />}
                                        label="Timeframe"
                                        value="TImeframe"
                                      />
                                    </Tooltip>
                                  </RadioGroup>
                                  <Grid
                                    display={"flex"}
                                    alignItems={"center"}
                                    width={"100%"}
                                  >
                                    <Tooltip title="If set to yes (Default), Expenses or negative values, will be displays as is. Otherwise they're shown as posiive">
                                      <div
                                        style={{
                                          textAlign: "left",
                                          margin: "auto 2rem auto 4rem",
                                          display: "flex",
                                          gap: "3px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Info className="info-icon"></Info>
                                        Negative Values
                                      </div>
                                    </Tooltip>
                                    <RadioGroup
                                      value={descriminate}
                                      onChange={(e) => {
                                        setDescriminate(e.target.value);
                                      }}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <Tooltip title="Negative values">
                                        <FormControlLabel
                                          control={<Radio />}
                                          label="Yes"
                                          value={"Yes"}
                                        />
                                      </Tooltip>
                                      <Tooltip title={"All Positive"}>
                                        <FormControlLabel
                                          control={<Radio />}
                                          label="No"
                                          value={""}
                                        />
                                      </Tooltip>
                                    </RadioGroup>
                                  </Grid>
                                </Grid>
                                <div
                                  style={{
                                    display: "flex",
                                    maxWidth: "99%",
                                    margin: "auto .5rem",
                                    padding: "1rem  ",
                                  }}
                                >
                                  <p
                                    style={{
                                      margin: "auto",
                                    }}
                                  >
                                    Show from:
                                  </p>

                                  <AdvancedDateSelect
                                    endDate={
                                      budgetData[budgetData.length - 1].date
                                    }
                                    startDate={budgetData[0].date}
                                    filter={filter}
                                    setFilter={setFilter}
                                    type="show_from"
                                    budgetData={budgetData}
                                  ></AdvancedDateSelect>
                                  <p style={{ margin: "auto" }}>To:</p>

                                  <AdvancedDateSelect
                                    endDate={
                                      budgetData[budgetData.length - 1].date
                                    }
                                    startDate={budgetData[0].date}
                                    filter={filter}
                                    budgetData={budgetData}
                                    setFilter={setFilter}
                                    type="show_to"
                                  ></AdvancedDateSelect>
                                </div>
                                <p
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Advanced Compare
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {advancedFilters.map((ele, index) => {
                                    return (
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "1rem",
                                          position: "relative",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          paddingBottom:
                                            advancedFilters.length === 5 &&
                                            index === 4
                                              ? "2rem"
                                              : "0",
                                        }}
                                      >
                                        <p>{index + 1}. </p>
                                        <AdvancedDateSelect
                                          endDate={
                                            budgetData[budgetData.length - 1]
                                              .date
                                          }
                                          startDate={budgetData[0].date}
                                          filter={filter}
                                          setFilter={setFilter}
                                          budgetData={budgetData}
                                          type={
                                            "advanced_compare_from_" + index
                                          }
                                          compareCount={advancedFilters.length}
                                        ></AdvancedDateSelect>
                                        To
                                        <AdvancedDateSelect
                                          endDate={
                                            budgetData[budgetData.length - 1]
                                              .date
                                          }
                                          startDate={budgetData[0].date}
                                          filter={filter}
                                          setFilter={setFilter}
                                          type={"advanced_compare_to_" + index}
                                          compareCount={advancedFilters.length}
                                          budgetData={budgetData}
                                        ></AdvancedDateSelect>
                                        {index === advancedFilters.length - 1 &&
                                          advancedFilters.length > 2 && (
                                            <Remove
                                              sx={{
                                                ml: "-10px",
                                                mr: "-30px",
                                                ":hover": {
                                                  fill: mainColor,
                                                  cursor: "pointer",
                                                },
                                              }}
                                              onClick={() => {
                                                setAdvancedFilters((prev) =>
                                                  prev.slice(0, -1)
                                                );
                                                return setFilter((prev) => {
                                                  const newFilter = {
                                                    ...prev,
                                                  };
                                                  delete newFilter[
                                                    "advanced_compare_from" +
                                                      (advancedFilters.length -
                                                        1)
                                                  ];
                                                  delete newFilter[
                                                    "advanced_compare_to" +
                                                      (advancedFilters.length -
                                                        1)
                                                  ];
                                                  return newFilter;
                                                });
                                              }}
                                            />
                                          )}
                                      </div>
                                    );
                                  })}
                                  {}
                                  {advancedFilters.length < 5 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        paddingBottom: "1rem",
                                      }}
                                    >
                                      <Button
                                        variant="contained"
                                        onClick={() => {
                                          setAdvancedFilters((prev) => [
                                            ...prev,
                                            1,
                                          ]);
                                        }}
                                      >
                                        <Add />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="contained"
                                  disabled={!Boolean(filter.valid)}
                                  onClick={handleApplyFilter}
                                  sx={{
                                    margin: "15px  0",
                                    width: "fit-content",
                                    position: "sticky",
                                    bottom: 0,
                                  }}
                                >
                                  Apply
                                </Button>
                                <Button
                                  sx={{
                                    margin: "15px  15px",
                                    position: "sticky",
                                    bottom: 0,
                                    width: "fit-content",
                                  }}
                                  variant="contained"
                                  disabled={!Boolean(appliedFilters.valid)}
                                  onClick={() => {
                                    setFilter({});
                                    setAppliedFilters({});
                                  }}
                                >
                                  Reset Filters
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  </div>
                )}
                {graphView === "table" ? (
                  selectedOption === "budget" ? (
                    <TableComponent
                      budgetData={budgetData}
                      setBudgetData={setBudgetData}
                      filters={appliedFilters}
                    ></TableComponent>
                  ) : (
                    <TableComponent
                      salesData={salesDummyData}
                      setSalesData={setSalesData}
                    ></TableComponent>
                  )
                ) : null}
                {graphView === "chart" || graphView === "Bar" ? (
                  selectedOption === "budget" ? (
                    <LineChart
                      budgetData={budgetData}
                      filters={appliedFilters}
                      viewMode={viewMode}
                      setFilter={setAppliedFilters}
                      descriminate={descriminate}
                      chartType={
                        graphView === "chart" ? "LineChart" : graphView
                      }
                    ></LineChart>
                  ) : (
                    <SalesLineChart
                      salesData={salesDummyData}
                      chartType={graphView === "chart" ? "Line" : graphView}
                    ></SalesLineChart>
                  )
                ) : null}
                {graphView === "PieChart" && selectedOption !== "budget" && (
                  <SalesLineChart
                    salesData={salesDummyData}
                    chartType={graphView}
                  ></SalesLineChart>
                )}
                {graphView === "PieChart" && selectedOption === "budget" && (
                  <LineChart
                    budgetData={budgetData}
                    filters={appliedFilters}
                    viewMode={viewMode}
                    setFilter={setAppliedFilters}
                    descriminate={descriminate}
                    chartType={"PieChart"}
                  ></LineChart>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DynaGraph;
