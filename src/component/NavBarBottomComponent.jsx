import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import homeLogo from '../assets/img/home.png';
import pokemonLogo from '../assets/img/avatar.png';

const NavBarBottomComponent = () => {
    return (
        <Navbar expand="lg" bg="dark" fixed="bottom" className="navbar-mobile">
            <Container>
                <Navbar.Brand className="d-flex mx-auto align-items-center">
                    <div className="d-flex align-items-center">
                        <Link to="/">
                            <div className="rounded-circle bg-white p-2 ml-4">
                                <Image
                                    src={homeLogo}
                                    alt="Home"
                                    rounded
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className='ms-4'>
                        <Link to="/myPokemon">
                            <div className="rounded-circle bg-white p-2 ml-4">
                                <Image
                                    src={pokemonLogo}
                                    alt="My Pokemon"
                                    rounded
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBarBottomComponent;
