import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    renderContent = () => {
        switch(this.props.auth) {
            case null: 
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                ) 
            default:
                return (
                    <li>
                        <a href="/api/logout"> Logout</a>
                    </li>
                )
        }
    }
    render() {
        return (
           <nav>
               <div className="nav-wrapper">
                    <Link 
                    to={this.props.auth ? '/surveys' : '/'} 
                    className="left brand-logo"
                    >
                        StartupFeedback
                    </Link>
                    <ul className="right">
                        <li>
                            <a>{this.renderContent()}</a>
                        </li>
                    </ul>
               </div>
           </nav>
        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, action)(Header);