
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

interface chartProps{
    coinId:string;
}

interface IHistorical{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId }:chartProps){
    const params = useParams();
    console.log(params);
    //https://api.coinpaprika.com/v1/coins/{coinId}/ohlcv/historical
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId], () =>
        fetchCoinHistory(coinId),
        {
            refetchInterval : 10000
        }
    );
    console.log(data);
    return (
    <div> 
        {isLoading ? "Load Chart..." : 
        <ReactApexChart
        type="line"
        series={[
            {
                name : "Price",
                data : data?.map(price => (price.close))
            },
            
        ]}
        options={{
            tooltip : {
                y:{
                    formatter:(value) => `$ ${value.toFixed(2)}`
                }
            },
            fill : {
                type:"gradient",
                gradient: { gradientToColors : ["blue"], stops : [0,100]}
            },
            colors : ["red"],
            chart : {
                height:200,
                width:500,
                toolbar:{
                    show:false
                },
                background: "transparent"
            },
            theme : {
                mode:"dark"
            },
            stroke:{
                curve:"smooth",
                width: 4
            },
            annotations : {
                
            },
            grid: {
                show:false
            },
            yaxis : {
                show:false
            },
            xaxis : {
                labels : {
                    show:false
                },
                axisTicks : {show : false},
                axisBorder : {show : false},
                type:"datetime",
                categories : data?.map(dateTime => (dateTime.time_close))
                
            },


        }}

        />
        
        }
    </div>
    );
}

export default Chart;