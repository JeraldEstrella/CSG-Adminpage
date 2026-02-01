import './contributor.css';

export const contributorConfig = [
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Bob Smith',
    position: 'Backend Engineer',
    bio: 'Specializes in server-side logic and database design.',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Bob Smith',
    position: 'Backend Engineer',
    bio: 'Specializes in server-side logic and database design.',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Bob Smith',
    position: 'Backend Engineer',
    bio: 'Specializes in server-side logic and database design.',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Bob Smith',
    position: 'Backend Engineer',
    bio: 'Specializes in server-side logic and database design.',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Bob Smith',
    position: 'Backend Engineer',
    bio: 'Specializes in server-side logic and database design.',
  },
];

import ContributorAvatar from '../../components/avatar/ContributorAvatar';

const Contributor = () => {
  return (
    <div className='contributor-container'>
      <div className='contributor-header'>
        <span>Contributors</span>
        <p>
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className='avatar-list'>
        {contributorConfig.map((i) => (
          <ContributorAvatar info={i} />
        ))}
      </div>
    </div>
  );
};

export default Contributor;
