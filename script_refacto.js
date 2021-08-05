var data = [
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

// array of period
var labels = data.map(item=>item.period)
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

// calculate the last item of 
function calculTotal(data){
return {
    label: "total",

    ...colors,
   // calculate the some of every item in data Array;
    data: data.map((item) => {

        // get all values of item
      const values = Object.keys(item)
        .map((key) => {
          if (key !== "period") return item[key];
        })
        
      
        //calculate the some of this values

      return  values.reduce((sum, current) => {
        if (current === undefined)  
        current = 0;
         return sum + current;
      }, 0) / 3;
    }),
  };
}


function generateGraph(data) {
  var graphValues = [];
  
  Object.keys(data[0]).map((key) => {
    if (key !== "period") {
      var temp = {
        label: key,
        //get all data with the same key
        data: data.map((item) => {
          return item[key];
        }),
        //bg and border colors
        ...colors,
      };

      graphValues.push(temp);
    }
  });


  graphValues.push(calculTotal(data));

 
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: graphValues
    }
  });
}

generateGraph(data);
