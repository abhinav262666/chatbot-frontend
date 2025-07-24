import Sidebar from '../components/Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-area">
        {/* Main chat/search area placeholder */}
        <h2>Welcome to your Dashboard</h2>
        <p>Select a chat or start a new one!</p>
      </div>
    </div>
  );
};

export default Dashboard; 