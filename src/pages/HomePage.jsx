import React, { useEffect, useState } from 'react';
import { httpService } from '../service/listService';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePokemonContext } from '../PokemonContext';

const HomePage = () => {

    const { setPokemonImage } = usePokemonContext();

    const [pokemonList, setPokemonList] = useState([]); ``
    const [startIndex, setStartIndex] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const itemsPerPage = 3;
    const [showModal, setShowModal] = useState(false);
    const [selectedImagePokemon, setSelectedImagePokemon] = useState('');


    const fetchPokemonDetails = async () => {
        try {
            const response = await httpService.get("/pokemon");
            const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
                const detailsResponse = await httpService.get(`/pokemon/${pokemon.name}`);
                return detailsResponse.data;
            });
            const pokemonDetails = await Promise.all(pokemonDetailsPromises);
            setPokemonList(pokemonDetails);
        } catch (error) {
            console.error("Error fetching Pokemon:", error);
        }
    };

    useEffect(() => {
        fetchPokemonDetails();
    }, []);

    const handlePrevious = () => {
        setStartIndex(Math.max(0, startIndex - itemsPerPage));
    };

    const handleNext = () => {
        setStartIndex(Math.min(pokemonList.length - itemsPerPage, startIndex + itemsPerPage));
    };

    const handleDetailClick = (pokemon) => {
        setSelectedPokemon(pokemon);
        const selectedImagePokemonCatch = pokemon.sprites.other.dream_world.front_default;
        console.log("selectedImagePokemonCatch", selectedImagePokemonCatch);
        setSelectedImagePokemon(selectedImagePokemonCatch);
        setPokemonImage(selectedImagePokemonCatch);
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPokemon(null);
    };


    return (
        <>
            <section className='home-page min-vh-100'>
                <Container>
                    <Row className="justify-content-center list-pokemon">
                        <h2 className='mt-5 py-5 text-center'>List Pokemon</h2>
                        {pokemonList.slice(startIndex, startIndex + itemsPerPage).map((pokemon, index) => (
                            <Col key={index} md={6} lg={4} xl={3} className="mb-4">
                                <div className="pokemon-card">
                                    <img
                                        className="pokemon-image"
                                        src={pokemon.sprites.other.dream_world.front_default}
                                        alt={`${pokemon.name} image`}
                                    />
                                    <p className="pokemon-name">{pokemon.name}</p>
                                    <Button variant="primary" onClick={() => handleDetailClick(pokemon)}>
                                        Show Detail
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="prev-next text-center">
                            <Button
                                variant={startIndex === 0 ? "secondary" : "primary"}
                                className="prev"
                                onClick={handlePrevious}
                                disabled={startIndex === 0}
                                style={{ cursor: startIndex === 0 ? 'not-allowed' : 'pointer' }}
                            >
                                Previous
                            </Button>{' '}
                            <Button
                                variant={startIndex + itemsPerPage >= pokemonList.length ? "secondary" : "primary"}
                                className="next"
                                onClick={handleNext}
                                disabled={startIndex + itemsPerPage >= pokemonList.length}
                                style={{ cursor: startIndex + itemsPerPage >= pokemonList.length ? 'not-allowed' : 'pointer' }}
                            >
                                Next
                            </Button>
                        </Col>
                    </Row>
                </Container>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPokemon && selectedPokemon.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedPokemon && (
                            <div className="pokemon-details">
                                <div className="pokemon-details-header">
                                    <img
                                        className="pokemon-image-detail mb-2"
                                        src={selectedPokemon.sprites.other.dream_world.front_default}
                                        alt={`${selectedPokemon.name} image`}
                                    />
                                    <div className="pokemon-stats row">
                                        {selectedPokemon.stats.map((stat, index) => (
                                            <div key={index} className="stat-item col-md-6 mx-auto mb-2" >
                                                <span className="stat-name">{stat.stat.name} : </span>
                                                <span className="stat-value">{stat.base_stat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pokemon-info">
                                    <p><strong>Types:</strong> {selectedPokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}</p>
                                    <p><strong>Abilities:</strong> {selectedPokemon.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)).join(', ')}</p>
                                    <p><strong>Weight:</strong> {selectedPokemon.weight} Kg</p>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Link
                            to={{
                                pathname: '/catch-page',
                                state: { selectedImagePokemon: selectedImagePokemon }
                            }}
                        >
                            <Button variant="primary">
                                Catch
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    );
};

export default HomePage;
