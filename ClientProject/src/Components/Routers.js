import { Route, Routes } from "react-router";
import CoronaSummary from "./AboutCorona";
import Home from "./Home";
import JoinUs from "./JoinUs";
import AllMembers from "./Manager";
import User from "./User";

export default function Routers()
{
    return<div>
        <Home/>
        <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='manger' element={<AllMembers/>}></Route>
        <Route path='about' element={<CoronaSummary/>}></Route>
        <Route path='user' element={<User/>}></Route>
        <Route path='join' element={<JoinUs/>}></Route>
        </Routes>
    </div>
}