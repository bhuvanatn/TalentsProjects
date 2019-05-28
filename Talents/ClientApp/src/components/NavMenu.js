import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import { } from 'react-router-bootstrap';
import './NavMenu.css';


export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (

            <div>
                <Segment inverted>
                    <Menu inverted >
              
                    <Menu.Item>
                        Talent
                    </Menu.Item>
                    <Menu.Item as={Link} to='/fetchproducts'>
                        Products
                    </Menu.Item>
                    <Menu.Item as={Link} to='/getcustomers'>
                        Customers
                    </Menu.Item>
                    <Menu.Item as={Link} to='/getstore'>
                        Stores
                    </Menu.Item>
                    <Menu.Item as={Link} to='/getsales'>
                        Sales
                    </Menu.Item>
                    
                    </Menu>
                </Segment>
             </div>
            
        );
    }
}
