import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import FirstScreen from "./FirstScreen";
import SectionsMovie from "./SectionsMovie";
import Seats from "./Seats";
import Success from "./Success";
import "../css/reset.css"

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<FirstScreen />} />
                <Route path="/filme/:idFilme" element={<SectionsMovie />} />
                <Route path="/sessao/:idHora" element={<Seats />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes>
        </BrowserRouter>
    )
}