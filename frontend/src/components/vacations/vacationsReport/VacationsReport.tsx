import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { init } from "../../../redux/vacationsActions";
import useService from "../../../hooks/useService";
import VacationsService from "../../../services/auth-aware/Vacations";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./VacationsReport.css";
import { showToast } from "../../common/toast/Toast";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function VacationStats() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vacationService = useService(VacationsService);

  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { vacations } = useAppSelector((state) => state.vacations);

  useEffect(() => {
    async function loadData() {
      if (vacations.length === 0) {
        try {
          setIsLoading(true);
          const allVacations = await vacationService.getAllVacations();
          dispatch(init(allVacations));
        } catch (error) {
          console.error("Unable to load vacation data:", error);
          setError(
            "Failed to retrieve vacation details. Please try again or return to the vacations page."
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const sortedVacations = [...vacations].sort((a, b) =>
    a.destination.localeCompare(b.destination)
  );

  const chartData = {
    labels: sortedVacations.map((v) => v.destination),
    datasets: [
      {
        label: "Number of Followers",
        data: sortedVacations.map((v) => v.followers?.length || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Vacations Report",
        font: {
          size: 15,
        },
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Followers",
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Destination",
        },
      },
    },
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);

      const csvBlob = await vacationService.getFollowersCSV();

      const url = window.URL.createObjectURL(csvBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "vacation_followers.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Error exporting CSV:", error);
        showToast.error(
          err.response?.data || "Data export failed. Please try again."
        );
      } else {
        showToast.error("Data export failed. Please try again..");
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="VacationStats">
      <div className="stats-header">
        <h2>Vacation Report</h2>
        <div className="header-actions">
          <button className="back-btn" onClick={() => navigate("/vacations")}>
            Back to Vacations
          </button>
          <button
            className="export-btn"
            onClick={handleExportCSV}
            disabled={isExporting || isLoading}
          >
            {isExporting ? "Export in progress..." : "Export to CSV"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <p>Loading vacation statistics...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : vacations.length === 0 ? (
        <div className="no-data">
          <p>No vacation information to show. .</p>
        </div>
      ) : (
        <>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
}
