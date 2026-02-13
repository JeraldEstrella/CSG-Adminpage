import './contenePanel.css';
import Dashboard from '../panel/dashboard/Dashboard';
import Announcement from '../panel/announcement/Announcement';
import Contributor from '../panel/contributors/Contributor';
import Documents from '../panel/documents/Document';
import Audit from '../panel/auditlog/Auditlog';
import Settings from '../panel/settings/Settings';

const panel = [
  {
    name: 'dashboard',
    content: <Dashboard />,
  },
  {
    name: 'announcement',
    content: <Announcement />,
  },
  {
    name: 'documents',
    content: <Documents />,
  },
  {
    name: 'auditlog',
    content: <Audit />,
  },
  {
    name: 'contributors',
    content: <Contributor />,
  },
  {
    name: 'settings',
    content: <Settings />,
  },
];

const ContentPanel = ({ active }: { active: string | null }) => {
  return (
    <div className='contentPanel-container'>
      {panel.find((p) => p.name === active)?.content}
    </div>
  );
};

export default ContentPanel;
