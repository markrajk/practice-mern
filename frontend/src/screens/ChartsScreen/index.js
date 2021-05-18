import { load } from 'dotenv'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getOwnersCharts,
  updateChart,
  createChart,
} from '../../actions/chartActions'
import { LineChart } from '../../components/Charts'
import { Container, CreateButton } from './styles'
import Loader from '../../components/Loader'

const ChartsScreen = ({ match }) => {
  const dispatch = useDispatch()
  const gotOwnersCharts = useSelector((state) => state.getOwnersCharts)
  const { charts, loading: getLoading } = gotOwnersCharts

  const updatedChart = useSelector((state) => state.updateChart)
  const { success, loading } = updatedChart

  const handleSettingsUpdate = async (chartId, bool) => {
    console.log(chartId, bool)
    await dispatch(
      updateChart(chartId, { settings: !bool ? 'months' : 'weeks' })
    )
    dispatch(getOwnersCharts(match.params.id))
  }

  const handleCreateChart = async () => {
    const chart = {
      title: 'New Chart',
      datasets: [
        {
          label: 'Productivity',
          data: {
            months: [5, 5, 4, 3, 5, 3],
            weeks: [3, 2, 2, 4, 5, 5],
          },
        },
        {
          label: 'Attitude',
          data: {
            months: [4, 4, 4, 2, 2, 3],
            weeks: [5, 5, 4, 3, 5, 3],
          },
        },
        {
          label: 'Teamworking',
          data: {
            months: [3, 2, 2, 4, 5, 5],
            weeks: [4, 4, 4, 2, 2, 3],
          },
        },
      ],
    }
    await dispatch(createChart(chart))
    dispatch(getOwnersCharts(match.params.id))
  }

  // useEffect(() => {
  //   console.log(charts)
  //   if ((charts && !charts.length) || (success && !loading)) {
  //     dispatch(getOwnersCharts(match.params.id))
  //   }
  // }, [success, loading, match, dispatch])
  useEffect(() => {
    dispatch(getOwnersCharts(match.params.id))
  }, [])

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <CreateButton onClick={handleCreateChart}>Create New</CreateButton>
      <Container>
        {charts && charts.length && !(loading || getLoading) ? (
          <>
            {charts.map((chart) => (
              <LineChart
                settingsUpdate={handleSettingsUpdate}
                key={chart._id}
                data={chart}
              />
            ))}
          </>
        ) : (
          <Loader />
        )}
      </Container>{' '}
    </div>
  )
}

export default ChartsScreen
