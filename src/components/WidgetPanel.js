import React, { useState, useEffect } from 'react';
import './WidgetPanel.css'; 
import chartConfig from '../chartData.json';
import { CloseOutlined  } from '@ant-design/icons'

const WidgetPanel = ({ onClose, onConfirm, selectedWidgets }) => {
  const [activeTab, setActiveTab] = useState('CSPM');
  const [selectedCharts, setSelectedCharts] = useState([]);

  useEffect(() => {
    setSelectedCharts(selectedWidgets);
  }, [selectedWidgets]);

  const getChartTitles = (category) => {
    const charts = chartConfig[category];
    return Object.entries(charts).map(([key, chart]) => ({
      id: key,
      title: chart.options.title
    }));
  };

  const tabs = ['CSPM', 'CWPP', 'Image', 'Ticket'];
  const csmpTitles = getChartTitles('CSPM');
  const cwppTitles = getChartTitles('CWPP');

  const handleCheckboxChange = (id) => {
    setSelectedCharts((prev) =>
      prev.includes(id)
        ? prev.filter(chartId => chartId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedCharts);
    onClose(); 
  };

  const handleCancel = () => {
    setSelectedCharts([]); 
    onClose();
  };

  return (
    <div className="widget-panel">
      <div className="widget-panel-header">
        <span className="widget-panel-title">Add Widget</span>
        <button className="widget-panel-close" onClick={onClose}><CloseOutlined /></button>
      </div>
      <h5 className='subtitle-widgetpanel'>Personalise your dashboard by adding the following widget</h5>
      <div className="widget-panel-tabs">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`tab-button ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="widget-panel-content">
        {activeTab === 'CSPM' ? (
          <ul>
            {csmpTitles.map(({ id, title }) => (
              <li key={id}>
                <input
                  type="checkbox"
                  id={id}
                  checked={selectedCharts.includes(id)}
                  onChange={() => handleCheckboxChange(id)}
                />
                <label htmlFor={id}>{title}</label>
              </li>
            ))}
          </ul>
        ) : activeTab === 'CWPP' ? (
          <ul>
            {cwppTitles.map(({ id, title }) => (
              <li key={id}>
                <input
                  type="checkbox"
                  id={id}
                  checked={selectedCharts.includes(id)}
                  onChange={() => handleCheckboxChange(id)}
                />
                <label htmlFor={id}>{title}</label>
              </li>
            ))}
          </ul>
        ) : (
          <div>No data</div>
        )}
      </div>
      <div className="widget-panel-footer">
        <button className="footer-button cancel" onClick={handleCancel}>Cancel</button>
        <button className="footer-button confirm" onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default WidgetPanel;
