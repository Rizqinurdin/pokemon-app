import React, { useState, useEffect } from 'react'; // Tambahkan import useEffect
import { usePokemonContext } from '../PokemonContext';
import { Button, Container, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CatchPokemonPage = ({ history }) => {
    const { selectedImagePokemon, addCaughtPokemon } = usePokemonContext();
    const [showModal, setShowModal] = useState(false);
    const [pokemonName, setPokemonName] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    // const [data, setData] = useState([]);

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const randomInt = getRandomInt(3);

    const handleInputChange = (e) => setPokemonName(e.target.value);

    const handleSuccessCatch = () => {
        if (randomInt === 0) {
            setShowModal(false);
            alert("You Missed!");
        } else {
            setShowModal(true);
        }
    };

    const handleCatchConfirm = () => {
        if (pokemonName.trim() !== '') {
            console.log("Caught Pokemon Name:", pokemonName);
            addCaughtPokemon({ name: pokemonName, image: selectedImagePokemon });
            setShowSuccessAlert(true);
            // Simpan informasi Pokemon yang ditangkap ke dalam localStorage
            localStorage.setItem('caughtPokemon', JSON.stringify({ name: pokemonName, image: selectedImagePokemon }));
            setTimeout(() => {
                setShowSuccessAlert(false);
                handleCloseModal();
                history.push('/');
            }, 2000);
        } else {
            alert("Please enter the Pokemon's name.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPokemonName('');
    };

    // // Gunakan useEffect untuk memuat informasi Pokemon yang telah ditangkap dari localStorage saat komponen dimuat
    // useEffect(() => {
    //     // Pindahkan pengambilan data dari localStorage ke sini
    //     const storedPokemon = localStorage.getItem('caughtPokemon');
    //     if (storedPokemon) {
    //         const { name, image } = JSON.parse(storedPokemon);
    //         console.log("Stored Pokemon:", name, image);
    //         setPokemonName(name);
    //     }
    // }, []);

    useEffect(() => {
        localStorage.setItem('dataKey', JSON.stringify(selectedImagePokemon));
    }, [selectedImagePokemon]);

    return (
        <section className="catch-pokemon-page min-vh-100 d-flex justify-content-center align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="catch-pokemon-content text-center">
                            <h2 className="mt-5 py-4">Wild Blastoise Appears</h2>
                            {selectedImagePokemon && (
                                <img
                                    src={selectedImagePokemon}
                                    alt="Selected Pokemon"
                                    className="pokemon-image-catch"
                                />
                            )}
                            <div className="button-catch">
                                <Button variant="primary" onClick={handleSuccessCatch}>
                                    Catch
                                </Button>
                                <Link to="/">
                                    <Button variant="primary" className="ms-2">
                                        Run
                                    </Button>
                                </Link>
                            </div>
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Alert variant="success" show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible>
                                    Pokemon successfully caught!
                                </Alert>
                                <Modal.Header closeButton>
                                    <Modal.Title>Catch Pokemon</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Are you sure you want to catch this Pokemon?</p>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Pokemon Name"
                                        value={pokemonName}
                                        onChange={handleInputChange}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleCatchConfirm}>
                                        Yes, Catch it!
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CatchPokemonPage;