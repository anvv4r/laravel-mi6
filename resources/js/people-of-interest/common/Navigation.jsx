import { useState } from "react";

const Navigation = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <nav className={"left-menu" + (collapsed ? " left-menu_hidden" : "")}>
            <div
                className="left-menu__visibility-toggle"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? ">" : "<"}
            </div>

            <div className="left-menu__content">
                <div className="left-menu__header">
                    <img
                        className="left-menu__seal"
                        src="/images/mi6-seal.png"
                        alt="MI6 seal"
                    />
                </div>

                <div className="left-menu__links">
                    <a to="/">Home</a>
                    <a to="/people-of-interest">People of interest</a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
