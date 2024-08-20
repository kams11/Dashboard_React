import React, { useState } from 'react';

import { ClockCircleFilled,DownOutlined, PlusOutlined, MoreOutlined, SyncOutlined  } from '@ant-design/icons'
import '../pages/dashboard.css';
import CspmDashboard from '../components/CSPM/CspmDashboard';
import CwppDashboard from '../components/CWPP/CwppDashboard';
import WidgetPanel from '../components/WidgetPanel'; 
import chartConfig from '../chartData.json';

const Dashboard = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const handleOpenPanel = () => setIsPanelVisible(true);
  const handleClosePanel = () => setIsPanelVisible(false);

  const handleConfirm = (selectedCharts) => {
    const updatedState = {};
    selectedCharts.forEach(chartId => {
      if (chartConfig.CSPM[chartId]) {
        updatedState[chartId] = chartConfig.CSPM[chartId];
      } else if (chartConfig.CWPP[chartId]) {
        updatedState[chartId] = chartConfig.CWPP[chartId];
      }
    });
    setSelectedWidgets(updatedState);
    handleClosePanel();
  };

  return (
    <>
      <div className='dashboard'>
        <div className="header">
          <label className="dashboard-title">CNAPP Dashboard</label>
          <div className="header-buttons">
            <button className="btn" onClick={handleOpenPanel}> Add Widget <PlusOutlined style={{margin:'2px'}}/></button>
            <button className="btn" onClick={() => window.location.reload()}>
              <SyncOutlined style={{ transform: 'scaleX(-1)' }} />
            </button>
            <button className="btn"><MoreOutlined />
            </button>
            <div className="dropdown">
              <button className="btn dropdown-btn"><ClockCircleFilled style={{marginRight:"6px"}} /> <span >| </span>Last 2 days<DownOutlined style={{paddingLeft:'2px', width:"12px",marginTop:"2px"}} /></button>
              <div className="dropdown-content">
                <a href="#">History Item 1</a>
                <a href="#">History Item 2</a>
                <a href="#">History Item 3</a>
              </div>
            </div>
          </div>
        </div>
        <CspmDashboard selectedWidgets={selectedWidgets} />
        <CwppDashboard selectedWidgets={selectedWidgets} />
      </div>
      {isPanelVisible && (
        <div className={`widget-panel-wrapper ${isPanelVisible ? 'show' : ''}`}>
          <WidgetPanel
            onClose={handleClosePanel}
            onConfirm={handleConfirm}
            selectedWidgets={Object.keys(selectedWidgets)}
          />
        </div>
      )}
    </>
  );
}

export default Dashboard;
