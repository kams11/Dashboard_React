import React, { useState } from 'react';
import '../CSPM/CspmDashboard.css';
import { Chart } from 'react-google-charts';
import chartConfig from '../../chartData.json';
import WidgetPanel from '../WidgetPanel';
import { PlusOutlined} from '@ant-design/icons'

const CspmDashboard = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const handleOpenPanel = () => setIsPanelVisible(true);
  const handleClosePanel = () => setIsPanelVisible(false);
  const handleConfirm = (selectedCharts) => {
    const updatedWidgets = {};
    selectedCharts.forEach(chartId => {
      if (chartConfig.CSPM[chartId]) {
        updatedWidgets[chartId] = chartConfig.CSPM[chartId];
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
      <label className="label-cspm">CSPM Executive Dashboard</label>
      <div className='dashboard-cspm'>
        {['cloudAccount', 'cloudAccountRiskAssessment', 'complianceStatus'].map(chartName => (
          <div key={chartName} className="cspm_chart">
            {selectedWidgets[chartName] ? (
              <>
                <Chart
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
              <button className='btn' onClick={handleOpenPanel}> <PlusOutlined/> Add Widget</button>
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
            category="CSPM"
          />
        </div>
      )}
    </>
  );
};

export default CspmDashboard;
