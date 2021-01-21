import React, { Component, Fragment } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItems } from "./SideMenuItem";
import { Button } from "../Button/Button"
import "./SideMenu.css"
const styles = {
    sidemenu: color => ({
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: color,
        left: "0px",
        width: "250px",
        height: "100%"
    }),
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1em"
    },
};
class SideMenu extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return (
            <nav className="sidemenu" style={styles.sidemenu("LightSteelBlue")}>
                <h1 className="navbar-logo"></h1>
                <h1 className="navbar-logo">Welcome!</h1>
                <h1 className="navbar-logo"></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url} >
                                    {item.title}

                                </a>
                            </li>
                        )
                    })}

                </ul>
                <Button>Add a new bug</Button>
            </nav>

        )
    }
}


export default SideMenu;