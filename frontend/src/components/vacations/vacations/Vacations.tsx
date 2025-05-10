import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Vacations.css";
import VacationsService from "../../../services/auth-aware/Vacations";
import useService from "../../../hooks/useService";
import Vacation from "../vacationPage/vacationPage";
import { AuthContext } from "../../auth/auth/Auth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { init, setCurrentPage } from "../../../redux/vacationsActions";
import { useContext } from "react";

enum FilterType {
  NONE = "none",
  FOLLOWING = "following",
  UPCOMING = "upcoming",
  ACTIVE = "active",
}

export default function Vacations() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.NONE);

  const vacationService = useService(VacationsService);
  const { vacations, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.vacations
  );
  const dispatch = useAppDispatch();

  const { user } = useContext(AuthContext)!;
  const isAdmin = user?.role === "admin";

  const filteredVacations = vacations.filter((vacation) => {
    const today = new Date();
    const startDate = new Date(vacation.startingDate);
    const endDate = new Date(vacation.endingDate);

    switch (activeFilter) {
      case FilterType.FOLLOWING:
        return vacation.followers?.some(
          (follower) => follower.userId === user?.userId
        );
      case FilterType.UPCOMING:
        return startDate > today;
      case FilterType.ACTIVE:
        return startDate <= today && endDate >= today;
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredVacations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVacations = filteredVacations.slice(startIndex, endIndex);

  useEffect(() => {
    async function loadVacations() {
      try {
        if (vacations.length === 0) {
          const allVacations = await vacationService.getAllVacations();
          dispatch(init(allVacations));
        }
      } catch (e) {
        console.error("Error loading vacation details:", e);
        setError("Failed to load vacations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadVacations();
  }, []);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [activeFilter, dispatch]);

  function handleFilterChange(newFilter: FilterType) {
    setActiveFilter(newFilter);
  }

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="filters-wrapper">
      {isAdmin && (
        <div className="admin-controls">
          <Link to="/admin/add-vacation" className="add-btn">
            Add New Vacation
          </Link>
          <Link to="/admin/stats" className="stats-btn">
            Reports
          </Link>
        </div>
      )}

      {!isAdmin && (
        <div className="filter-controls">
          <div className="filter-title">View Vacations By:</div>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="checkbox"
                name="vacation-filter"
                value={FilterType.NONE}
                checked={activeFilter === FilterType.NONE}
                onChange={() => handleFilterChange(FilterType.NONE)}
              />
              <span>All Vacations</span>
            </label>

            <label className="filter-option">
              <input
                type="checkbox"
                name="vacation-filter"
                value={FilterType.FOLLOWING}
                checked={activeFilter === FilterType.FOLLOWING}
                onChange={() => handleFilterChange(FilterType.FOLLOWING)}
              />
              <span>Followed Vacations</span>
            </label>

            <label className="filter-option">
              <input
                type="checkbox"
                name="vacation-filter"
                value={FilterType.UPCOMING}
                checked={activeFilter === FilterType.UPCOMING}
                onChange={() => handleFilterChange(FilterType.UPCOMING)}
              />
              <span>Future Vacations</span>
            </label>
          </div>
        </div>
      )}

      <div className="vacations-content">
        {isLoading ? (
          <div className="loading-container">
            <p>Loading the vacations</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Please Try Again
            </button>
          </div>
        ) : filteredVacations.length === 0 ? (
          <div className="empty-container">
            <p>No vacations found for the selected filter. </p>
          </div>
        ) : (
          <>
            <div className="vacations-grid">
              {currentVacations.map((vacation) => (
                <Vacation
                  key={vacation.vacationId}
                  vacation={vacation}
                  isAdmin={isAdmin}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn prev"
                >
                  Previous
                </button>

                <div className="pagination-pages">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`pagination-btn ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn next"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
