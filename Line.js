import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
  } from "@progress/kendo-react-charts";
import { each } from "hammerjs";
  import { COLORS } from "../constants";
  import { stocks } from "../stockawards";
  import { stocksJames } from "../stocksJames";
  import { stocksShalini } from "../stocksShalini";

 const series = [];
 const seriesDollar = [];
 const stockPrice = 283.35;

  
  const categories = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  
  function transformData(arr) {
      const seriesData = {
        "2017": 0,
        "2018": 0,
        "2019": 0, 
        "2020": 0,
        "2021": 0,
        "2022": 0,
        "2023": 0,
        "2024": 0,
        "2025": 0,
        "2026": 0
      };    
      arr.forEach(stock => {
          stock.vestingSchedule.forEach(each => {
                let year = each.vestDate.substring(0,4);
                if(seriesData[year]) {
                    seriesData[year] += each.vestAmount;
                } else {
                    seriesData[year] = each.vestAmount;
                }
          });
      });

      console.log(seriesData);
      let seriesElement = {
        name: "Stock Awards",
        data: Object.keys(seriesData).map((key, idx) => seriesData[key]),
        color: COLORS.total,
      };
      series.push(seriesElement);
  }  

  function calculateSeriesDollars() {
    series.forEach(each =>{
      const data = each.data.map((key, idx) => key*stockPrice);
      let seriesElement = {
        name: "Stock Awards",
        data: data,
        color: COLORS.total,
      };
      seriesDollar.push(seriesElement);
    })
  }
  
  transformData(stocks);
  transformData(stocksJames);
  transformData(stocksShalini);
  calculateSeriesDollars();  

  const Line = props => {
    return (
        <div>
      <Chart pannable zoomable style={{ height: 350 }}>
        <ChartTitle text="My Stock Awards - last 3 months" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartValueAxis>
          <ChartValueAxisItem title={{ text: "Stock Vests Per Year" }} min={0} max={1000} />
        </ChartValueAxis>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} />
        </ChartCategoryAxis>
        <ChartSeries>
          {series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="line"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
            />
          ))}
        </ChartSeries>
      </Chart>           
      <p></p>
      <Chart pannable zoomable style={{ height: 350 }}>
        <ChartTitle text="My Stock Awards - Dollar value" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartValueAxis>
          <ChartValueAxisItem title={{ text: "Stock Vests Per Year" }} min={0} max={250000} />
        </ChartValueAxis>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} />
        </ChartCategoryAxis>
        <ChartSeries>
          {seriesDollar.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="line"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
            />
          ))}
        </ChartSeries>
      </Chart>
      </div>
      
    );
  };
  
  export default Line;