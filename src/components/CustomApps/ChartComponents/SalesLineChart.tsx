import { Chart, GoogleChartControlProp } from "react-google-charts";
import { SalesType } from "../DynaGraph";

import Papa from "papaparse";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { DarkModeContext } from "../../Wrapper";
const chartOptions = {
  curveType: "function",
  legend: { position: "bottom" },
  gridColumn: "span 3",
};

interface Props {
  salesData: SalesType[];
  chartType: string;
}
const papaConfig = {
  header: true,
};

///// falta sort by date,

const SalesLineChart: React.FC<Props> = ({ salesData, chartType }) => {
  const [processedData, setProcessedData] = useState([]);
  const [viewOptions, setViewOptions] = useState<GoogleChartControlProp[]>([]);
  const [viewFilterName, setViewFilterName] = useState<string>("All");
  const appContext = useContext(DarkModeContext);
  const darkMode = appContext?.darkMode;

  function sortData(data: string[][]) {
    const header = data[0];
    const copy = _.cloneDeep(data);
    copy.shift();
    copy.sort();
    copy.unshift(header);
    return copy;
  }

  function agreggateData(data: string[][]) {
    const header = data[0];
    const newArray: any = [header];
    data.map((item: string[], index: number) => {
      if (index > 0) {
        const id = item[1];
        const idAdded = newArray.findIndex((array: string) =>
          array.includes("ID: " + id)
        );
        const amount = Number(item[2]);
        const ageGroup = item[4];
        const category = item[3];
        const genderGroup = item[5];
        if (idAdded < 0) {
          const newRow: any = Array.from({
            length: header.length,
          }).fill(null);
          newRow[0] = "ID: " + id;
          newRow[1] = amount;
          newRow[2] = genderGroup;
          newRow[3] = ageGroup;
          newRow[4] = category;
          newArray.push(newRow);
          return;
        } else {
          const addedRow = newArray[idAdded];
          if (addedRow[2] !== genderGroup && addedRow[3] !== ageGroup) {
            newArray[idAdded][1] += amount;
          } else {
            const newRow = Array.from({
              length: header.length,
            }).fill(null);
            newRow[0] = "ID: " + id;
            newRow[1] = amount;
            newRow[2] = genderGroup;
            newRow[3] = ageGroup;
            newRow[4] = category;
            newArray.push(newRow);
          }
          return;
        }
      }
    });
    return newArray;
  }

  function addValues(data: string[][]) {
    const header = data[0];
    const newArray: any[] = [header];
    data.map((item, index) => {
      if (index > 0) {
        const periodAdded = newArray.findIndex((array) =>
          array.includes(item[0])
        );
        const id = item[1];
        const columnIndex = header.indexOf(id);
        const amount = Number(item[2]);
        const period = item[0];
        if (periodAdded < 0) {
          const newRow = Array.from({
            length: header.length,
          }).fill(null);
          newRow[columnIndex] = amount;
          newRow[0] = period;
          newArray.push(newRow);
          return;
        } else {
          newArray[periodAdded][columnIndex] += amount;
          return;
        }
      }
    });
    return sortData(newArray);
  }

  const addHeaders = (data: string[][], type: string) => {
    const header = data[0].splice(0, 1);

    if (type !== "PieChart") {
      data.map((item, index) => {
        if (index > 0) {
          const id = item[1];
          if (!header.includes(id)) {
            header.push(id);
            return header;
          }
        }
      });
    }
    const newHeaders = data;
    newHeaders[0] = header;
    if (type === "PieChart") {
      newHeaders[0] = ["ID", "Sales", "Gender", "Age Group", "Category"];
      return agreggateData(newHeaders);
    }
    return addValues(newHeaders);
  };

  const controls: GoogleChartControlProp[] = [
    {
      controlEvents: [
        {
          eventName: "statechange",
          callback: ({ chartWrapper, controlWrapper }) => {
            if (controlWrapper) {
              const value = controlWrapper.getState().selectedValues[0];
              if (!value) {
                setViewFilterName("All");
              }
              if (value) {
                setViewFilterName("Gender");
              }
            }
          },
        },
      ],
      controlType: "CategoryFilter",
      options: {
        filterColumnIndex: 2,
        ui: {
          lableStacking: "vertical",
          label: "Gender",
          allowTyping: false,
          allowMultiple: true,
        },
      },
    },
    {
      controlEvents: [
        {
          eventName: "statechange",
          callback: ({ chartWrapper, controlWrapper }) => {
            if (controlWrapper) {
              const value = controlWrapper.getState().selectedValues[0];
              if (!value) {
                setViewFilterName("All");
              }
              if (value) {
                setViewFilterName("Age");
              }
            }
          },
        },
      ],
      controlType: "CategoryFilter",
      options: {
        filterColumnIndex: 3,
        ui: {
          lableStacking: "vertical",
          label: "Age Group",
          allowTyping: false,
          allowMultiple: true,
        },
      },
    },
    {
      controlEvents: [
        {
          eventName: "statechange",
          callback: ({ chartWrapper, controlWrapper }) => {
            if (controlWrapper) {
              const value = controlWrapper.getState().selectedValues[0];
              if (!value) {
                setViewFilterName("All");
              }
              if (value) {
                setViewFilterName("Category");
              }
            }
          },
        },
      ],
      controlType: "CategoryFilter",
      options: {
        filterColumnIndex: 4,
        ui: {
          lableStacking: "vertical",
          label: "Category",
          allowTyping: false,
          allowMultiple: true,
        },
      },
    },
  ];

  useEffect(() => {}, [processedData]);

  useEffect(() => {
    setViewFilterName(viewFilterName);
  }, [viewFilterName]);

  useEffect(() => {
    const unparse = Papa.unparse(salesData, papaConfig);
    const toArray: any = Papa.parse(unparse, {});
    const parsedData = addHeaders(toArray.data, chartType);
    setViewOptions(controls);
    setProcessedData(parsedData);
  }, []);

  return (
    <div>
      {chartType === "Bar" || chartType === "Line" ? (
        <Chart
          height={"400px"}
          width={"100%"}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem auto",
          }}
          data={processedData}
          chartType={chartType}
          options={chartOptions}
        ></Chart>
      ) : (
        <>
          <Chart
            height={"350px"}
            width={"100%"}
            data={processedData}
            style={{
              display: "grid",
              gridTemplateColumns: "30% 30% 30% 10%",
              alignItems: "center",
              color: darkMode ? "white" : "black",
              gridColumn: "span 4",
              paddingBottom: "3rem",
            }}
            chartType={"PieChart"}
            chartWrapperParams={{
              view: {
                columns:
                  viewFilterName === "All"
                    ? [0, 1]
                    : viewFilterName === "Gender"
                    ? [0, 2]
                    : viewFilterName === "Category"
                    ? [0, 4]
                    : [0, 3],
              },
            }}
            chartPackages={["corechart", "controls"]}
            controls={viewOptions ? viewOptions : undefined}
            options={chartOptions}
          ></Chart>
        </>
      )}
    </div>
  );
};

export default SalesLineChart;
