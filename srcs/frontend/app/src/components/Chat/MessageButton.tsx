function MessageButton() {

	const sendMessage = () => {
		let sendMessages = {authorId: user.user.id, channelId: current, content: value};
		sockets.emit('newMessage', sendMessages) ;
		setValue('');
	};

    return (
        <button onClick={sendMessage}>
            Send
        </button>
    );
};

export default MessageButton;