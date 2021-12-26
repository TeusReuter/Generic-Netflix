import react from "react";
import './style.css';

export default ({black}) => {
    return (

        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://psfonttk.com/wp-content/uploads/2020/09/netflix-logo.png" alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Usuário" />
                </a>
            </div>

        </header>
    );
}