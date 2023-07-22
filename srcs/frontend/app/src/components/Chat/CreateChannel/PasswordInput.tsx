function PasswordInput({password, setPassword}) {
    return (
        <div id="channel-password">
            <h2>
                Mot de passe
            </h2>
            <input type="text" value={password} placeholder="Entrer mot de passe" onChange={(e) => setPassword(e.target.value)}/>
        </div>
    );
}

export default PasswordInput;