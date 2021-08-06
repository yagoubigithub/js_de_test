const data = [
  {
    Cheese: 22.2,
    CHOCOLATE: 10.3,
    Impulse: 1.5,
    period: "2021_26",
  },
  {
    Cheese: 21.8,
    CHOCOLATE: 9.8,
    Impulse: 1.5,
    period: "2021_27",
  },
  {
    Cheese: 21.2,
    CHOCOLATE: 9.7,
    Impulse: 1.4,
    period: "2021_28",
  },
];

// bg and border color to push theme later
const colors = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
  ],
  borderColor: [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
  ],
};

//get keys of one object in data array
const getKeys = (item) => Object.keys(item).filter((key) => key !== "period");

//calcul total of one item in data array
const calculItemsTotal = (data) =>data.map((item) => sommeArray(getAllValuesOfItem(item)) / 3);

//get the values of one item in array 
const getAllValuesOfItem = (item) => getKeys(item).map((key) => item[key]);

//calcul the some of one array of numbers
const sommeArray = (array) =>array.reduce((sum, current) => sum + (current === undefined ? 0 : current),0);
  
//get all data with the same key
const getAllDataWithSameKey  = (data,key) =>data.map((item) => item[key])

const calculTotal = (data) => ({
  label: "total",
  ...colors,
  data: calculItemsTotal(data),
});

//calcul graph data (datasets)
const calculGraphData = (data) =>
  getKeys(data[0]).map((key) => ({
    label: key,
    data: getAllDataWithSameKey(data, key),
    ...colors,
  }));

function generateGraph(data) {
  const graphValues = calculGraphData(data);

  graphValues.push(calculTotal(data));
 
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels:  data.map((item) => item.period),
      datasets: graphValues,
    },
  });
}

generateGraph(data);
