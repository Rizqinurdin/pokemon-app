import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import icon from '../assets/img/icon1.png';

const NavBarComponent = () => {
    return (
        <Navbar expand="lg" bg="dark" fixed="top" className="navbar-mobile">
            <Container>
                <Navbar.Brand className="d-flex mx-auto align-items-center">
                    <div className="d-flex align-items-center">
                        <Image
                            src={icon}
                            alt="Icon"
                            roundedCircle
                            style={{
                                marginRight: '10px',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBarComponent;
