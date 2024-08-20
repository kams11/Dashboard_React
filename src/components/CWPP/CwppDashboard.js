import React, { useState } from 'react';
import '../CWPP/CwppDashboard.css';
import { Chart } from 'react-google-charts';
import chartConfig from '../../chartData.json';
import WidgetPanel from '../WidgetPanel';
import { PlusOutlined } from '@ant-design/icons';

const CwppDashboard = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const handleOpenPanel = () => setIsPanelVisible(true);
  const handleClosePanel = () => setIsPanelVisible(false);

  const handleConfirm = (selectedCharts) => {
    const updatedWidgets = {};
    selectedCharts.forEach(chartId => {
      if (chartConfig.CWPP[chartId]) {
        updatedWidgets[chartId] = chartConfig.CWPP[chartId];
      }
    });
    setSelectedWidgets(updatedWidgets);
    handleClosePanel();
  };

  const handleRemoveChart = (chartName) => {
    setSelectedWidgets(prevState => {
      const newState = { ...prevState };
      delete newState[chartName];
      return newState;
    });
  };

  return (
    <>
      <label className="label-cwpp">CWPP Dashboard:</label>
      <div className='dashboard-cwpp'>
        {['top5NamespaceSpecificAlerts', 'workloadAlerts', 'taskAlert'].map(chartName => (
          <div key={chartName} className="cwpp_chart">
            {selectedWidgets[chartName] ? (
              <>
                <Chart
                  className='dashboard_chart'
                  chartType="PieChart"
                  data={selectedWidgets[chartName].data}
                  options={selectedWidgets[chartName].options}
                />
                <button
                  className="chart-close-button"
                  onClick={() => handleRemoveChart(chartName)}
                >
                  X
                </button>
              </>
            ) : (
              <button className='btn' onClick={handleOpenPanel}>
                <PlusOutlined /> Add Widget
              </button>
            )}
          </div>
        ))}
      </div>
      {isPanelVisible && (
        <div className="widget-panel-wrapper show">
          <WidgetPanel
            onClose={handleClosePanel}
            onConfirm={handleConfirm}
            selectedWidgets={Object.keys(selectedWidgets)}
            category="CWPP"
          />
        </div>
      )}
    </>
  );
};

export default CwppDashboard;
