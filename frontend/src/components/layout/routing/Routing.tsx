import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth/Auth";
import Login from "../../auth/login/Login";
import SignUp from "../../auth/sign-up/SignUp";
import Vacations from "../../vacations/vacations/Vacations";
import NotFound from "../not-found/NotFound";
import VacationStats from "../../vacations/vacationsReport/VacationsReport";
import EditVacation from "../../vacations/editVacation/EditVacation";
import AddVacation from "../../vacations/addVacation/AddVacation";

export default function Routing() {
  const { isLoading, user } = useContext(AuthContext)!;
  const isAdmin = user?.role === "admin";

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/vacations" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/vacations" /> : <SignUp />}
      />

      <Route path="/" element={<Navigate to="/vacations" />} />

      <Route
        path="/vacations"
        element={user ? <Vacations /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/add-vacation"
        element={
          user ? (
            isAdmin ? (
              <AddVacation />
            ) : (
              <Navigate to="/vacations" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/admin/edit-vacation/:vacationId"
        element={
          user ? (
            isAdmin ? (
              <EditVacation />
            ) : (
              <Navigate to="/vacations" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/admin/stats"
        element={
          user ? (
            isAdmin ? (
              <VacationStats />
            ) : (
              <Navigate to="/vacations" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
