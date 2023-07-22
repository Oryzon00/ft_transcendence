function NameInput({name, setName}) {
    return (
        <div id="channel-name">
            <h2>Nom Channel</h2>
            <input type="text" value={name} placeholder="Entrer un nom" onChange={(e) => setName(e.target.value)}/>
        </div>
    );

}

export default NameInput;