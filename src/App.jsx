import React from 'react';
import './styles/App.css';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';

function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<AppRouter/>
			
		</BrowserRouter>
	);
	// <Routes>
    //         {routes.map((route, index) => (
    //             <Route
    //                 key={index}
    //                 path={route.path}
    //                 element={<route.component />}
    //                 exact={route.exact}
    //             />
    //         ))}
    //     </Routes>
}

export default App;

