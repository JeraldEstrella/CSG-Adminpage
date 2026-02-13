import { fileTableConfig } from './dashboardExample';
import './dashboard.css';
import { useState } from 'react';
import Barcharts from '../../components/charts/bar-chart/Barchart';
import Linechart from '../../components/charts/line-chart/Linechart';
import Recents from '../../components/charts/recents/Recents';

const Dashboard = () => {
  const [active, setActive] = useState<string[]>([]);

  const handleActive = (fileName: string) => {
    setActive((prev) =>
      prev.includes(fileName)
        ? prev.filter((name) => name !== fileName)
        : [...prev, fileName]
    );
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-header'>
        <span>Dashboard</span>
        <p>
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className='dashboard-content'>
        {/*graph div*/}
        <div className='graph-container'>
          <Barcharts />
          <Linechart />
        </div>
        {/*graph div*/}
        <div className='dashboard-file-table'>
          <span>Recent Activity</span>
          <table>
            <thead>
              <tr className='table-header-black'>
                <th>
                  <input
                    type='checkbox'
                    title='Select All'
                    checked={active.length === fileTableConfig.length}
                    onChange={() => {
                      if (active.length === fileTableConfig.length) {
                        setActive([]);
                      } else {
                        setActive(fileTableConfig.map((file) => file.fileName));
                      }
                    }}
                  />
                </th>
                <th>File Name</th>
                <th>Description</th>
                <th>Size</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {fileTableConfig.map((file, idx) => (
                <tr
                  key={idx}
                  className={`table-row ${active.includes(file.fileName) ? 'active' : ''}`}
                >
                  <td>
                    <input
                      type='checkbox'
                      title={`Select ${file.fileName}`}
                      checked={active.includes(file.fileName)}
                      onChange={() => handleActive(file.fileName)}
                    />
                  </td>
                  <td>{file.fileName}</td>
                  <td>{file.description}</td>
                  <td>{file.size}</td>
                  <td>{file.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
