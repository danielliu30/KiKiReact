import ApexChart from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import React, { useState } from 'react'

function LiveStock() {
    const [data, setData] = useState([]);
    const [date, setDate] = useState([]);
    const socket = io('http://localhost:3001')
    socket.on('event', (stock) => {
        let price = JSON.parse(stock)[0]["p"]
        let time = JSON.parse(stock)[0]["t"]

        setData(old => [...old, price])
        setDate(older => [...older, time])
    })

    //get past day, week and month of last viewed 3 stocks
    setInterval(() => {
        ApexCharts.exec('realtime', 'updateSeries', [{
            data: data
        }])
        ApexCharts.exec('realtime', 'updateOptions', [{
            xaxis: {
                categories: date
            }
        }])
    }, 5000)
    let item = {
        options: {
            chart: {
                id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 10000
                    }
                }
            },
            xaxis: {
                categories: date
            }
        },
        series: [{
            name: 'series-1',
            data: data
        }]
    }

    const handleStockChange = () => {
        socket.emit('stock_name', "GOOG")
    }
    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <ReactApexChart
                        options={item.options}
                        series={item.series}
                    />
                    <p>{date.length}</p>
                </div>
                <button onClick={() => handleStockChange()}>
                    YAY
                </button>
            </div>
        </div>
    );
}

export default LiveStock