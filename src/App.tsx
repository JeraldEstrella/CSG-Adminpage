import Sidebar from './components/sidebar/Sidebar';
import ContentPanel from './contentPanel/ContentPanel';
import './App.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_PANEL = 'dashboard';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const panelParam = searchParams.get('panel') || DEFAULT_PANEL;
  const [panel, setPanel] = useState(panelParam);

  useEffect(() => {
    setSearchParams({ panel });
  }, [panel]);

  return (
    <div className='app-container'>
      <Sidebar panel={panel} setPanel={setPanel} />
      <ContentPanel active={panel} />
    </div>
  );
};

export default App;
