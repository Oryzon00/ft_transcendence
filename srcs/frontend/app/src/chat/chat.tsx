import React from 'react'
import ReactDOM from 'react-dom/client'

export function Chat() {
	function receivedMessage() : void {
		
	}
	return (
		<>
			<input type="text"/>
			<button onClick={receivedMessage}>click</button>
		</>
	);
}
