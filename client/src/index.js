import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserContextProvider } from "./Context/userContext"
import { MessageContextProvider } from "./Context/messageContext"

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import './theme.scss';

ReactDOM.render(
  	<React.StrictMode>
	  	<UserContextProvider>
	  		<MessageContextProvider>
	      		<App />
	      	</MessageContextProvider>
	  	</UserContextProvider>
  	</React.StrictMode>,
  document.getElementById('root')
);
