'use client'
import './styles.css'
//import { useNavigate } from "react-router-dom";
//import { BrowserRouter as Route, Router, Routes } from "react-router-dom";
import VolunteerDashboard from "./components/Dashboard/VolunteerDashboard/VolunteerDashboard";
import LogHoursButton from "./components/Shared/LogHoursButton";

export default function Home() {

  return (
    <div>
    <LogHoursButton></LogHoursButton>
    </div>
  );
}
