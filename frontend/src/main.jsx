import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { store } from "./store/Store"
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
       <Provider store={store}>
            <App />
       </Provider>
    </BrowserRouter>

);
