import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import ChartWrapper from '../ChartWrapper'
import PropTypes from 'prop-types'

const LineChart = ({ settingsUpdate, data }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // if (chart && chart._id === data._id) {
  //   data = { ...chart }
  // }

  const mow = data && data.settings.includes('months') ? true : false
  const isOwner = userInfo._id === data.owner
  console.log(userInfo._id, data.owner)
  console.log(isOwner)

  const [timeToggle, setTimeToggle] = useState(!mow)

  // ************** SETTINGS ****************//
  const colors = {
    Productivity: '#2ecc71',
    Attitude: '#f1c40f',
    Teamworking: '#2980b9',
  }

  const dataSettings = {
    labels: mow
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      : ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5', 'Wk6'],
    datasets:
      data &&
      data.datasets.map((dataset) => {
        // console.log(dataset.label)
        return {
          label: dataset.label,
          data: mow ? dataset.data.months : dataset.data.weeks,
          fill: false,
          backgroundColor: colors[`${dataset.label}`],
          borderColor: colors[`${dataset.label}`],
        }
      }),
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  // ***************************************//

  const labelUpdate = (value) => {
    labelUpdate(value)
  }

  const settingsUpdateHandler = () => {
    settingsUpdate(data._id, mow)
  }

  // const settingsUpdate = () => {
  //   const chartSettings = {
  //     settings: !mow ? ['months'] : ['weeks'],
  //   }

  //   data && dispatch(updateChart(data._id, chartSettings))
  // }

  // useEffect(() => {
  //   settingsUpdate()
  // }, [])

  return (
    <ChartWrapper
      isOwner={isOwner}
      labelUpdate={labelUpdate}
      settingsUpdate={settingsUpdateHandler}
      label={data.title}
    >
      <Line data={dataSettings} options={options} />
    </ChartWrapper>
  )
}

LineChart.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LineChart
