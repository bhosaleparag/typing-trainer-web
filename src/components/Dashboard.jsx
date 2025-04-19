import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [progressData, setProgressData] = useState({
    labels: [],
    datasets: []
  });
  const [leaderboardData, setLeaderboardData] = useState({
    labels: [],
    datasets: []
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's progress data
        const progressQuery = query(
          collection(db, 'progress'),
          orderBy('timestamp', 'desc'),
          limit(7)
        );
        const progressSnapshot = await getDocs(progressQuery);
        const progressEntries = progressSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        // Fetch leaderboard data
        const leaderboardQuery = query(
          collection(db, 'users'),
          orderBy('wordRaceScore', 'desc'),
          limit(5)
        );
        const leaderboardSnapshot = await getDocs(leaderboardQuery);
        const leaderboardEntries = leaderboardSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        // Format progress data
        setProgressData({
          labels: progressEntries.map(entry => 
            new Date(entry.timestamp.toDate()).toLocaleDateString()
          ).reverse(),
          datasets: [{
            label: 'Words Per Minute',
            data: progressEntries.map(entry => entry.wpm).reverse(),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });

        // Format leaderboard data
        setLeaderboardData({
          labels: leaderboardEntries.map(entry => entry.name),
          datasets: [{
            label: 'High Scores',
            data: leaderboardEntries.map(entry => entry.wordRaceScore),
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
          }]
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Current Badge</h3>
            <div className="badge-container">
              <img 
                src={`https://firebasestorage.googleapis.com/v0/b/typing-trainer-ec708.appspot.com/o/badge%2Fbadge${user.badge || 1}.png?alt=media&token=e74041a6-5bd5-4eea-ba2d-0ec35b60c026`}
                alt="Badge"
                className="badge-image"
              />
              <span className="badge-level">
                Level {user.badge || 1}
              </span>
            </div>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">High Score</h3>
            <p className="stat-value">
              {user.highestScoreWordRace || 0}
            </p>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Games Played</h3>
            <p className="stat-value">
              {user.gamesPlayed || 0}
            </p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Progress Over Time</h3>
            {progressData.labels.length > 0 && (
              <Line
                data={progressData}
                options={{
                  responsive: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                        font: {
                          size: window.innerWidth < 640 ? 10 : 12
                        }
                      },
                      position: window.innerWidth < 640 ? 'bottom' : 'top'
                    }
                  },
                  scales: {
                    y: {
                      ticks: { 
                        color: 'white',
                        font: {
                          size: window.innerWidth < 640 ? 10 : 12
                        }
                      }
                    },
                    x: {
                      ticks: { 
                        color: 'white',
                        font: {
                          size: window.innerWidth < 640 ? 10 : 12
                        }
                      }
                    }
                  }
                }}
                height={window.innerWidth < 640 ? 200 : 300}
              />
            )}
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Top Players</h3>
            {leaderboardData.labels.length > 0 && (
              <Bar
                data={leaderboardData}
                options={{
                  responsive: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                        font: {
                          size: window.innerWidth < 640 ? 10 : 12
                        }
                      },
                      position: window.innerWidth < 640 ? 'bottom' : 'top'
                    }
                  },
                  scales: {
                    y: {
                      ticks: { 
                        color: 'white',
                        font: {
                          size: window.innerWidth < 640 ? 10 : 12
                        }
                      }
                    },
                    x: {
                      ticks: { 
                        color: 'white',
                        font: {
                          size: window.innerWidth < 640 ? 10 : 12
                        }
                      }
                    }
                  }
                }}
                height={window.innerWidth < 640 ? 200 : 300}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
