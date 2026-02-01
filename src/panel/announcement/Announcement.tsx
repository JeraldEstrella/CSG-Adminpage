import { useState } from 'react';
import './announcement.css';
import { announcementConfig } from './announcementExample';
import FilterSelect from '../../components/filter/Filter';

const filterOptions = ['All', 'Today', 'This Week', 'This Month'];

const Announcement = () => {
  const [spinning, setSpinning] = useState(false);
  const [active, setActive] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  const handleActive = (fileName: string) => {
    setActive((prev) =>
      prev.includes(fileName)
        ? prev.filter((name) => name !== fileName)
        : [...prev, fileName]
    );
  };

  const handleRefresh = () => {
    setSpinning(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className='announcement-container'>
      <div className='announcement-header'>
        <span>Announcement</span>
        <p>
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
      <span className='btn-container'>
        <span>{announcementConfig.length} Files</span>
        <button>Add Document</button>
      </span>
      <div className='announcement-file-table'>
        <table>
          <thead>
            <tr className='table-header-black'>
              <th colSpan={5} className='table-head'>
                <div>
                  <input
                    type='checkbox'
                    title='Select All'
                    checked={active.length === announcementConfig.length}
                    onChange={() => {
                      if (active.length === announcementConfig.length) {
                        setActive([]);
                      } else {
                        setActive(
                          announcementConfig.map((file) => file.fileName)
                        );
                      }
                    }}
                  />
                </div>
                <div className='table-actions'>
                  <FilterSelect
                    options={filterOptions}
                    value={filter}
                    onChange={setFilter}
                    label='Filter'
                  />
                  {/* for sort */}
                  <FilterSelect
                    options={filterOptions}
                    value={sort}
                    onChange={setSort}
                    label='Sort'
                  />
                  <button
                    className='action-btn refresh-btn'
                    title='Refresh'
                    onClick={handleRefresh}
                  >
                    <img
                      src='/refresh.png'
                      alt='refresh'
                      className={spinning ? 'spin' : ''}
                      style={{ width: 20, height: 20 }}
                    />
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {announcementConfig.map((file, idx) => (
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
                <td>{file.imageName}</td>
                <td>{file.fileName}</td>
                <td>{file.description}</td>
                <td>{file.date}</td>
                <td className='file-btn'>
                  <img src='/bin.png' alt='' />
                  <img src='/edit.png' alt='' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcement;
