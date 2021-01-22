import React, { Component, Fragment } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItems } from "./SideMenuItem";
import { Button } from "../Button/Button"
import PageHeader from '../PageHeader'
import "./SideMenu.css"
import { Link } from 'react-router-dom';
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
        this.setState({ clicked: !this.state.clicked 
        })
    }
    render() {
        return (
            <nav className="nav-menu active" style={styles.sidemenu("LightSteelBlue")}>
                {/* <h1 className="navbar-logo">Welcome!</h1>
                <br></br> 
                <br></br> 
                <br></br>            alea de mai sus sunt pentru spatiere, avem nevoie doar de welcome */}
                <div className="menu-icon">
                    {/* <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>  */}
                     {/* pentru efectul de hoover */}
                </div>
                <ul className='nav-menu-items'>
                    {
                    MenuItems.map((item, index) => {
                        return (
                            <li key={index} className=' nav-text'>
                                <Link to={item.path} >
                                    {item.title}
                                </Link>
                                
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