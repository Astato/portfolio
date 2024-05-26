import { BudgetType } from "../components/CustomApps/DynaGraph";

export function budgetMergeSort(data: BudgetType[], combine?: string): [] {
  if (data.length <= 1) {
    return data;
  }

  let left = [];
  let right = [];
  for (let i = 0; i < data.length; i++) {
    if (i < data.length / 2) {
      left.push(data[i]);
    } else {
      right.push(data[i]);
    }
  }

  left = budgetMergeSort(left);
  right = budgetMergeSort(right);
  return budgetMerge(left, right, combine);
}

function budgetMerge(
  left: BudgetType[],
  right: BudgetType[],
  combine?: string
) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    if (combine) {
      if (combine === "monthly") {
        const leftDate = new Date(left[0].date).getTime();
        const leftYear = new Date(left[0].date).getFullYear();
        const leftMonth = new Date(left[0].date).getMonth();
        const rightYear = new Date(right[0].date).getFullYear();
        const rightMonth = new Date(right[0].date).getMonth();
        const rightDate = new Date(right[0].date).getTime();
        if (leftYear === rightYear && leftMonth === rightMonth) {
          left[0].amount += right[0].amount;
          result.push(left[0]);
          left.shift();
          right.shift();
        }
        if (leftDate <= rightDate) {
          result.push(left[0]);
          left.shift();
        } else {
          result.push(right[0]);
          right.shift();
        }
      } else {
        if (left[0].date === right[0].date && combine) {
          left[0].amount += right[0].amount;
          result.push(left[0]);
          left.shift();
          right.shift();
        }
      }
    } else if (
      new Date(left[0].date).getTime() <= new Date(right[0].date).getTime()
    ) {
      result.push(left[0]);
      left.shift();
    } else {
      result.push(right[0]);
      right.shift();
    }
  }

  while (left.length > 0) {
    result.push(left[0]);
    left.shift();
  }
  while (right.length > 0) {
    result.push(right[0]);
    right.shift();
  }
  return result;
}

export function mergeSort(data: string[]): [] {
  if (data.length <= 1) {
    return data;
  }

  let left = [];
  let right = [];
  for (let i = 0; i < data.length; i++) {
    if (i < data.length / 2) {
      left.push(data[i]);
    } else {
      right.push(data[i]);
    }
  }

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right);
}

function merge(left: string[], right: string[]) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    if (new Date(left[0]).getTime() <= new Date(right[0]).getTime()) {
      result.push(left[0]);
      left.shift();
    } else {
      result.push(right[0]);
      right.shift();
    }
  }

  while (left.length > 0) {
    result.push(left[0]);
    left.shift();
  }
  while (right.length > 0) {
    result.push(right[0]);
    right.shift();
  }
  return result;
}

// console.log(format(new Date(), "dd"));

// function generateRandomDate() {
//   const year = Math.floor(Math.random() * 2) + 2023; // Random year between 2023 and 2024
//   const month = Math.floor(Math.random() * 3) + 2; // Random month between 2 and 4
//   const day = Math.floor(Math.random() * 30) + 1; // Random day between 1 and 30
//   const randomDate = `${year}-${month.toString().padStart(2, "0")}-${day
//     .toString()
//     .padStart(2, "0")}`;
//   return randomDate;
// }

// function generateDate(arg: number, day: string, month: string) {
//   month = +month < 10 ? "0" + month : month;
//   day = +day < 10 ? "0" + day : day;
//   if (arg <= 365) {
//     return `${2022}-${month}-${day}`;
//   } else if (arg > 365 && arg <= 730) {
//     return `${2023}-${month}-${day}`;
//   } else {
//     return `${2024}-${month}-${day}`;
//   }
// }

// function generateRandomData() {
//   const types = ["Expense", "Income"];
//   const data = [];
//   let month = 1;
//   let day = 1;
//   for (let i = 1; i < 1096; i++) {
//     day = i % 30 === 0 ? 1 : ++day;
//     month = i % 30 === 0 ? ++month : month;
//     if (month === 13 && day === 1 && i % 31) month = 1;
//     const type = types[Math.floor(Math.random() * types.length)];
//     const amount = Math.floor(Math.random() * 1500) + 500; // Random amount between 1 and 1000
//     const date = generateDate(i, day.toString(), month.toString());
//     const item = {
//       typeof: type,
//       amount: type === "Expense" ? amount * -1 : amount,
//       date,
//       description: "",
//       initialBudget: undefined,
//     };
//     data.push(item);
//   }
//   return data;
// }

// const generatedData = generateRandomData();
// console.log(generatedData);
