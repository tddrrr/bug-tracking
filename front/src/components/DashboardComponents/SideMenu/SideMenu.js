import React, { Component, Fragment } from 'react';
import { MenuItems } from "./SideMenuItem";
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
        this.setState({
            clicked: !this.state.clicked
        })
    }
    render() {
        return (
            <nav className="nav-menu " style={styles.sidemenu("LightSteelBlue")}>

                <div className="menu">
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
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
                                    {/* <button onClick={(item) => {
                                        this.history.push(`/dashboard/${item.path}`)
                                    }}>{item.title}</button>  */}
                                </li>
                            )
                        })}

                </ul>
                
            </nav>

        )
    }
}


export default SideMenu;