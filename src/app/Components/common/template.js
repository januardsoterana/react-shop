import React from 'react'
import { Link } from 'react-router-dom'  

import { useStateValue } from '../store/state'

import Search from './search'

import './template.css'

export default ({ children }) => {
    const [state] = useStateValue()

	return (
        <div className="container">
            <header className="container__header">
                <div className="container__logo">
                    <img src={state.logo.primary} />
                </div>
                <div className="container__navigation">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/stores">Stores</Link>
                            </li>
                            <li>
                                <Link to="/franchise">Franchise</Link>
                            </li>
                            <li>
                                <Link to="/stylist">Stylist</Link>
                            </li>
                            <li>
                                <Link to="/buttercup">Buttercup</Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="container__utilities">
                    <Search />
                </div>
            </header>
            {children}
        </div>
	)
}
