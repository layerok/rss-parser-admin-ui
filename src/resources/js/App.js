import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./pages/Login";
import {NotFound} from "./pages/NotFound";
import {Posts} from "./pages/Admin/Posts";
import {Dashboard} from "./pages/Admin/Dashboard";
import {RequireAuth} from "./auth/RequireAuth";
import {AuthProvider} from "./auth/AuthProvider";
import {Home} from "./pages/Home";
import {Provider} from "mobx-react";
import { stores } from "./stores/stores";
import {EditPost} from "./pages/Admin/EditPost";
import {CreatePost} from "./pages/Admin/CreatePost";
import {Register} from "./pages/Register";
import "tachyons"

function App() {
    return (
        <Provider {...stores}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={
                            <RequireAuth>
                                <Dashboard/>
                            </RequireAuth>
                        } />
                        <Route path="/admin/posts"  element={
                            <RequireAuth>
                                <Posts/>
                            </RequireAuth>
                            } />
                        <Route path="/admin/posts/:id"  element={
                            <RequireAuth>
                                <EditPost/>
                            </RequireAuth>
                        } />
                        <Route path="/admin/posts/create"  element={
                            <RequireAuth>
                                <CreatePost/>
                            </RequireAuth>
                        } />
                        <Route path="/login"  element={<Login/>} />
                        <Route path="/register"  element={<Register/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </Router>
            </AuthProvider>
        </Provider>

    );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('app'));

if (document.getElementById('app')) {
    root.render(<App />);
}
