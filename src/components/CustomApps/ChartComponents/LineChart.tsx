import { BudgetType } from "../DynaGraph";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import {
  format,
  isEqual,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
} from "date-fns";
import {
  FormControlLabel,
  Tooltip,
  Button,
  Radio,
  RadioGroup,
  Grid,
  Slider,
} from "@mui/material";
import { Chart } from "react-google-charts";
import {
  OpenInFull,
  CloseFullscreen,
  StyleOutlined as Style,
} from "@mui/icons-material";

interface Props {
  budgetData: BudgetType[];
  filters: { [key: string]: string };
  setFilter: React.Dispatch<SetStateAction<{ [key: string]: string }>>;
  viewMode: string;
  descriminate: string;
  chartType: string;
}
import { isArray } from "mathjs";
import Papa from "papaparse";

import _ from "lodash";
import { DarkModeContext } from "../../Wrapper";
const monthsArray = [
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

interface ChartOptions {
  curveType: string;
  legend: { position: string };
  lineWIdth: number;
  colors: string[];
}

const defaultOptions: ChartOptions = {
  curveType: "function",
  legend: { position: "bottom" },
  lineWIdth: 2,
  colors: [
    "#3B74BA",
    "#F04E32",
    "#F0609E",
    "#FBAD18",
    "black",
    "red",
    "blue",
    "green",
    "yellow",
  ],
};

const papaConfig = {
  header: true,
};

//////// MISSING: CHECK  CORRECT DATES OUTPUT AND SORT

const LineChart: React.FC<Props> = ({
  budgetData,
  filters,
  viewMode,
  chartType,
  descriminate,
}) => {
  const [processedData, setProcessedData] = useState<string[][]>([]);
  const [expandedGraph, setExpandedGraph] = useState<boolean>(false);
  const [openStyling, setOpenStyling] = useState<boolean>(false);
  const [customRangeData, setCustomRangeData] = useState<string[][]>([]);
  const appContext = useContext(DarkModeContext);
  const darkMode = appContext?.darkMode;
  const [graphType, setGraphType] = useState<string>(chartType);
  const [chartDistance, setChartDistance] = useState<number[]>([
    0,
    processedData ? processedData.length - 1 : 100,
  ]);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(
    _.cloneDeep(defaultOptions)
  );
  const chartContainer = useRef<HTMLDivElement>(null);

  const addHeaders = (
    data: string[][],
    arg: string,
    labels?: string[],
    linear?: boolean
  ) => {
    const header = data[0].splice(1, 3); //["amount", "typeof", "date"]
    const newHeader = [header[2]];
    const dataArray: any = [newHeader];

    if (arg === "all") {
      newHeader.push("Expense", "Income", "Balance");
    }
    if (arg.match("compare") || arg.match("advanced")) {
      if (labels) {
        if (linear === true) {
          newHeader.push(...labels);
        } else {
          if (arg.match("month")) {
            newHeader[0] = "Day";
          } else {
            newHeader[0] = "Month";
          }
          newHeader.push(...labels);
        }
      }
    }
    if (arg.match("simple")) {
      if (labels) {
        newHeader.push(...labels, labels[0] + "-Expense", "Balance");
      }
    }

    if (arg === "advanced") {
      if (labels) {
        newHeader.push(...labels);
        if (!linear) {
          newHeader[0] = "Day";
        }
      }
    }

    let sum = 0; /// balance column
    data.map((item: string[], index: number) => {
      if (index > 0) {
        const amount = +item[1];
        const type = item[2];
        const date = new Date(item[3]).toUTCString();

        let amountValue = amount;

        if (!descriminate && graphType !== "PieChart" && arg !== "advanced") {
          amountValue = amount < 0 ? amount * -1 : amount;
        }
        let columnIndex = newHeader.indexOf(type);
        sum += amount;
        let newRow =
          arg === "all" || arg.match("simple")
            ? [date, NaN, NaN, sum]
            : [date, NaN, NaN];

        if (arg.match("advanced")) {
          newRow = Array.from({ length: newHeader.length }).fill(NaN) as (
            | string
            | number
          )[];
          newRow[0] = date;
        }

        function findAdvancedCompareIndex() {
          for (let i = 1; i < newHeader.length; i++) {
            const headerDateRange: any = newHeader[i].toString().split(" - ");
            const itemDate: any | Date = date;

            const compareDate =
              (isAfter(itemDate, headerDateRange[0]) &&
                isBefore(itemDate, headerDateRange[1])) ||
              isEqual(itemDate, headerDateRange[0]) ||
              isEqual(itemDate, headerDateRange[1]);

            if (compareDate) {
              columnIndex = i;
              break;
            } else {
              continue;
            }
          }
        }
        if (linear || arg === "all") {
          if (arg === "compare_month") {
            const getMonth = format(new Date(date), "MMMM");
            columnIndex = newHeader.indexOf(getMonth);
          }
          if (arg === "compare_year") {
            const getYear = format(new Date(date), "yyyy");
            columnIndex = newHeader.indexOf(getYear);
          }

          if (arg.match("simple")) {
            columnIndex = type === "Expense" ? 2 : 1;
          }

          const dateAdded = dataArray.findIndex((array: string[]) =>
            array.includes(date)
          );

          if (dateAdded > 0) {
            if (arg === "all" || arg.match("simple")) {
              dataArray[dateAdded][3] = sum;
            }
            if (isNaN(dataArray[dateAdded][columnIndex])) {
              return (dataArray[dateAdded][columnIndex] = amountValue);
            }
            return (dataArray[dateAdded][columnIndex] += amountValue);
          } else {
            //// If date not added create a new row
            newRow[columnIndex] = amountValue;
            return dataArray.push(newRow);
          }
        }
        if (!linear) {
          const dateFormatArg = arg === "compare_month" ? "MMMM" : "yyyy";
          const dateFormatToSeacch =
            arg === "compare_month" ||
            arg === "advanced" ||
            arg === "simple_month"
              ? "dd"
              : "MMMM";
          const getDate = format(new Date(date), dateFormatArg);
          columnIndex = newHeader.indexOf(getDate);
          if (arg.match("simple")) {
            columnIndex = type === "Expense" ? 2 : 1;
          }
          if (arg === "advanced") {
            findAdvancedCompareIndex();
          }
          const dateAdded = dataArray.findIndex(
            (array: string[]) =>
              array[0] === format(new Date(date), dateFormatToSeacch)
          );

          if (dateAdded < 0) {
            newRow[0] = format(new Date(date), dateFormatToSeacch);
            newRow[columnIndex] = amountValue;
            return dataArray.push(newRow);
          } else {
            if (arg.match("simple")) {
              dataArray[dateAdded][3] += sum;
            }
            if (isNaN(dataArray[dateAdded][columnIndex])) {
              return (dataArray[dateAdded][columnIndex] = amountValue);
            }
            return (dataArray[dateAdded][columnIndex] += amountValue);
          }
        }
      }
    });

    if (arg) {
      if (!linear && arg.match("compare") && arg !== "advanced") {
        dataArray.sort((a: string[], b: string[]) => {
          if (monthsArray.indexOf(a[0]) < monthsArray.indexOf(b[0])) {
            return -1;
          } else if (monthsArray.indexOf(a[0]) > monthsArray.indexOf(b[0])) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      if (arg === "advanced") {
        dataArray.sort((a: string[], b: string[]) => {
          if (Number(a[0]) < Number(b[0])) {
            return -1;
          } else if (Number(a[0]) > Number(b[0])) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return dataArray;
    }
  };

  function addHeadersPiechart(data: string[][]) {
    const dataArray: any[] = [["Description", "Amount"]];
    const descriptionSet = new Set<string>();
    budgetData.map((item) => {
      if (item.description) {
        descriptionSet.add(item.description);
      } else {
        descriptionSet.add("Others");
      }
      return;
    });

    data.map((item: string[], index: number) => {
      if (index > 0) {
        const description = item[4] || "Others";
        const amount = +item[1];

        const itemAdded = dataArray.findIndex(
          (array) => array[0] === description
        );
        if (itemAdded <= 0) {
          const newRow = ["", NaN];
          newRow[0] = description;
          newRow[1] = amount < 0 ? amount * -1 : amount;
          return dataArray.push(newRow);
        } else {
          const add = amount < 0 ? amount * -1 : amount;
          dataArray[itemAdded][1] += add;
          return;
        }
      }
    });
    return dataArray;
  }

  function parseToArray(dataToParse: BudgetType[]) {
    const unparse = Papa.unparse(dataToParse, papaConfig);
    const toArray = Papa.parse(unparse, {});
    return toArray.data as string[][];
  }

  function splitData(from: string, to: string, multiple: boolean) {
    if (!multiple) {
      const startIndex = budgetData.findIndex((obj) => {
        return (
          new Date(obj.date).toISOString().split("T")[0] ===
          new Date(from).toISOString().split("T")[0]
        );
      });
      const endIndex = budgetData.findIndex((obj) => {
        return (
          new Date(obj.date).toISOString().split("T")[0] ===
          new Date(to).toISOString().split("T")[0]
        );
      });
      const array = _.cloneDeep(budgetData).sort();
      if (endIndex >= 0 && startIndex >= 0) {
        if (endIndex > startIndex) {
          const section = array.slice(startIndex, endIndex + 1);
          const parsed = parseToArray(section);
          return setProcessedData(addHeaders(parsed, "all"));
        } else if (endIndex < startIndex) {
          const section = array.slice(endIndex, startIndex + 1);
          const parsed = parseToArray(section);

          return setProcessedData(addHeaders(parsed, "all"));
        }
      }
    } else {
      const filterLength = (Object.keys(filters).length - 1) / 2;
      const dataArray = [];
      const headers = [];
      for (let i = 0; i <= filterLength - 1; i++) {
        const startIndex = budgetData.findIndex((obj) => {
          return (
            new Date(obj.date).toISOString().split("T")[0] ===
            new Date(filters["advanced_compare_from_" + i])
              .toISOString()
              .split("T")[0]
          );
        });
        const endIndex = budgetData.findIndex((obj) => {
          return (
            new Date(obj.date).toISOString().split("T")[0] ===
            new Date(filters["advanced_compare_to_" + i])
              .toISOString()
              .split("T")[0]
          );
        });

        headers.push(
          filters["advanced_compare_from_" + i] +
            " - " +
            filters["advanced_compare_to_" + i]
        );

        if (startIndex >= 0 && endIndex >= 0) {
          const array = _.cloneDeep(budgetData);
          let section: BudgetType[] = [];
          if (endIndex < startIndex) {
            section = array.slice(endIndex, startIndex + 1);
          } else if (endIndex > startIndex) {
            section = array.slice(startIndex, endIndex + 1);
          }

          dataArray.push(...section);
        }
      }
      const data = parseToArray(dataArray);
      return setProcessedData(addHeaders(data, "advanced", headers, false));
    }
  }

  function filterBugdetData(key: string, value?: string) {
    if (key.match("compare")) {
      const {
        simple_month_compare_0 = null,
        simple_month_compare_1 = null,
        simple_year_compare_0 = null,
        simple_year_compare_1 = null,
      } = { ...filters };
      if (simple_month_compare_0 && simple_month_compare_1) {
        const labels = [simple_month_compare_0, simple_month_compare_1];
        const filterData = budgetData.filter((item) => {
          const itemMonth = format(new Date(item.date), "MMMM");
          return (
            itemMonth === simple_month_compare_0 ||
            itemMonth === simple_month_compare_1
          );
        });
        const data = parseToArray(filterData);
        const linear = viewMode === "Linear" ? true : false;
        return setProcessedData(
          addHeaders(data, "compare_month", labels, linear)
        );
      }

      if (simple_year_compare_0 && simple_year_compare_1) {
        const labels = [simple_year_compare_0, simple_year_compare_1];
        const filterData = budgetData.filter((item) => {
          const itemYear = new Date(item.date).getFullYear();
          return (
            itemYear === +simple_year_compare_0 ||
            itemYear === +simple_year_compare_1
          );
        });
        const data = parseToArray(filterData);
        const linear = viewMode === "Linear" ? true : false;
        return setProcessedData(
          addHeaders(data, "compare_year", labels, linear)
        );
      }
    } else {
      if (value) {
        const label: string[] = [value];
        if (key === "simple_month") {
          const filterData = budgetData.filter((item) => {
            if (chartType === "PieChart") {
              const itemMonth = new Date(item.date).toISOString().split("T")[0];
              const valueMonth = new Date(value).toISOString().split("T")[0];
              return (
                format(new Date(itemMonth), "MM-yyyy") ===
                format(new Date(valueMonth), "MM-yyyy")
              );
            }
            const itemMonth = format(new Date(item.date), "MMMM");
            return itemMonth === value;
          });
          const data = parseToArray(filterData);
          const linear = viewMode === "Linear" ? true : false;
          if (chartType === "PieChart") {
            return setProcessedData(addHeadersPiechart(data));
          }
          return setProcessedData(
            addHeaders(data, "simple_month", label, linear)
          );
        } else {
          const filterData = budgetData.filter((item) => {
            return new Date(item.date).getFullYear() === Number(value);
          });
          const data = parseToArray(filterData);
          const linear = viewMode === "Linear" ? true : false;
          if (chartType === "PieChart") {
            return setProcessedData(addHeadersPiechart(data));
          }
          return setProcessedData(
            addHeaders(data, "simple_year", label, linear)
          );
        }
      } else {
        return setProcessedData([]);
      }
    }
  }

  function applyFilters() {
    for (const key of Object.keys(filters)) {
      const value = filters[key];
      if (key.match("show")) {
        return splitData(filters["show_from"], filters["show_to"], false);
      } else if (key === "simple_month") {
        return filterBugdetData(key, value);
      } else if (key === "simple_year") {
        return filterBugdetData(key, value);
      } else if (key.match("advanced")) {
        return splitData("", "", true);
      } else if (key.match("simple_month_compare")) {
        return filterBugdetData(key);
      } else if (key.match("simple_year_compare")) {
        return filterBugdetData(key);
      }
    }
  }

  useEffect(() => {
    setProcessedData(processedData);
    setCustomRangeData(processedData);
  }, [processedData]);

  useEffect(() => {
    if (processedData) {
      if (chartType === "PieChart") {
        if (filters.simple_month || filters.simple_year) {
          applyFilters();
        }
      } else {
        applyFilters();
      }
    }
    if (
      !filters.valid &&
      Object.keys(filters).length >= 0 &&
      chartType !== "PieChart"
    ) {
      const toArray = parseToArray(budgetData);
      const parsedData = addHeaders(toArray, "all");
      setProcessedData(parsedData);
    }
  }, [viewMode, descriminate, filters, budgetData]);

  useEffect(() => {
    if (
      processedData instanceof Array &&
      processedData.length >= 0 &&
      chartType !== "PieChart"
    ) {
      const toArray = parseToArray(budgetData);
      const parsedData = addHeaders(toArray, "all");
      setProcessedData(parsedData);
    } else if (
      processedData instanceof Array &&
      processedData.length >= 0 &&
      chartType === "PieChart"
    ) {
      const toArray = parseToArray(budgetData);
      const parseForPiechart = addHeadersPiechart(toArray);
      setProcessedData(parseForPiechart);
    }
  }, [budgetData]);

  function rangeData(value: number, value1: number) {
    const dataCopy = _.cloneDeep(processedData);
    const startIndex = value === 0 ? 1 : value;
    const getData = dataCopy.slice(startIndex, value1);
    getData.unshift(processedData[0]);
    setCustomRangeData(getData);
  }

  const minDistance = 10;
  const handleSliderChange = (
    e: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (!isArray(value)) {
      return;
    }
    if (value[1] - value[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(value[0], processedData.length + minDistance);
        if (clamped > minDistance + 5) {
          //// prevenst thumb from going past minDistance of 5 to data.lenght and beyond,  and thus setting rangeData to ∞,∞, tho thumbs overlap
          setChartDistance([clamped, clamped + minDistance]);
          return rangeData(value[1] - minDistance, value[1]);
        }
        setChartDistance([clamped, clamped + minDistance]);
        return rangeData(value[0], value[1]);
      } else {
        const clamped = Math.max(value[1], minDistance);
        if (clamped < minDistance + 5) {
          //// prevenst thumb from going beyond minDistance of 5 to 0 and beyond,  and thus setting rangeData to 0,0
          setChartDistance([clamped - minDistance, clamped]);
          return rangeData(value[0], value[0] + minDistance);
        }
        setChartDistance([clamped - minDistance, clamped]);
        return rangeData(value[0], value[1]);
      }
    } else {
      setChartDistance(value as number[]);
      return rangeData(value[0], value[1]);
    }
  };

  const valueLabelFormat = (value: number) => {
    if (value === 0) {
      value += 1;
    } else if (value === processedData.length - 1) {
      value -= 1;
    }
    if (processedData && processedData[value] && processedData[value][0]) {
      return new Date(processedData[value][0]).toLocaleDateString();
    } else {
      return;
    }
  };

  // const calculateBalance = (data: string[][]) => {
  //   let balance = 0;
  //   for (let i = 1; i <= data.length - 1; i++) {
  //     const numbers = data[i].slice(1);
  //     numbers.map((number: string, index: number) => {
  //       if (index % 2 === 0 && index === 0) {
  //         balance += Number(number);
  //       } else {
  //         balance -= Number(number);
  //       }
  //       return;
  //     });
  //   }
  //   return balance;
  // };

  if (!processedData) {
    return <p>No data to display</p>;
  }

  return (
    <div
      ref={chartContainer}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        position: expandedGraph ? "absolute" : "relative",
        top: expandedGraph ? 0 : "unset",
        left: expandedGraph ? 0 : "unset",
        backgroundColor: expandedGraph ? "white" : "transparent",
        margin: "auto",
        zIndex: expandedGraph ? 3 : 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="Customize the graph" sx={{ marginRight: "1rem" }}>
          <Style
            onClick={() => setOpenStyling(!openStyling)}
            sx={{
              fill: darkMode && !expandedGraph ? "white" : "black",
              margin: "10px",
            }}
          />
        </Tooltip>
        <Tooltip
          title={
            !expandedGraph ? "Enter fullscreen mode" : "Exit fullscreen mode"
          }
        >
          {!expandedGraph ? (
            <OpenInFull
              onClick={() => setExpandedGraph(!expandedGraph)}
              sx={{ fill: darkMode && !expandedGraph ? "white" : "black" }}
            />
          ) : (
            <CloseFullscreen
              onClick={() => setExpandedGraph(!expandedGraph)}
              sx={{ fill: darkMode && !expandedGraph ? "white" : "black" }}
            />
          )}
        </Tooltip>
        {openStyling && (
          <Grid
            container
            sx={{
              width: expandedGraph ? "300px" : "200px",
              height: expandedGraph ? "400px" : "280px",
              position: "absolute",
              boxShadow: "0 0 4px 2px gray",
              backgroundColor: "white",
              padding: "10px",
              zIndex: 3,
              top: expandedGraph ? "3rem" : 0,
              right: expandedGraph ? "5rem" : 0,
              borderRadius: "15px",
            }}
          >
            <Grid container justifyContent={"space-around"}>
              <RadioGroup
                sx={{
                  color: "black",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                defaultValue={graphType}
                onChange={(e) => setGraphType(e.target.value)}
              >
                <FormControlLabel
                  value="LineChart"
                  control={<Radio />}
                  label="Line"
                />
                <FormControlLabel
                  value="AreaChart"
                  control={<Radio />}
                  label="Area"
                />
              </RadioGroup>
              <Grid
                item
                direction={"row"}
                width={"100%"}
                display={"flex"}
                height={"50px"}
                gap={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {processedData &&
                  processedData[0].length > 1 &&
                  processedData[0].map((line: any, index: number) => {
                    if (index === 0) {
                      return null;
                    }
                    return (
                      <div>
                        <p>Line {index}</p>
                        <input
                          onChange={(e) => {
                            setChartOptions((prev) => {
                              const obj = prev;
                              obj.colors[index - 1] = e.target.value;
                              return obj;
                            });
                          }}
                          type="color"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "100%",
                            border: "none",
                          }}
                          defaultValue={chartOptions.colors[index - 1]}
                        ></input>
                      </div>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid
              container
              margin={"auto auto 20px auto "}
              justifyContent={"space-evenly"}
              width={"100%"}
              height={"20px"}
            >
              <Button variant="contained" onClick={() => setOpenStyling(false)}>
                Accept
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setChartOptions(_.cloneDeep(defaultOptions));
                }}
              >
                Default
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
      {chartType === "LineChart" || chartType === "Bar" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Slider
            sx={{ width: "80%", m: "0 auto" }}
            disableSwap
            value={chartDistance}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
            max={processedData.length - 1}
          ></Slider>
          {/* <p style={{ margin: 0 }}>
            Balance:
            {customRangeData && calculateBalance(customRangeData)}
          </p> */}
          <Chart
            height={"350px"}
            width={"100%"}
            data={customRangeData || processedData}
            chartType={graphType === "AreaChart" ? graphType : chartType}
            options={chartOptions}
          ></Chart>
        </div>
      ) : (
        <Chart
          height={"350px"}
          width={"100%"}
          data={processedData}
          chartType={"PieChart"}
          chartWrapperParams={{
            view: {
              columns: [0, 1],
            },
          }}
          options={chartOptions}
        ></Chart>
      )}
    </div>
  );
};

export default LineChart;
