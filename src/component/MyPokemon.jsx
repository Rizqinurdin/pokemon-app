import React from 'react';
import { usePokemonContext } from '../PokemonContext';
import { Container, Row, Col } from "react-bootstrap";
import RemoveIcon from '../assets/img/x-button.png';
import { useState } from 'react';

const MyPokemon = () => {
    const { caughtPokemon, removePokemon } = usePokemonContext();
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3;

    // const handleRemovePokemon = (index) => {
    //     console.log(`Removing Pokemon at index ${index}`);
    //     const updatedPokemonList = [...caughtPokemon];
    //     updatedPokemonList.splice(startIndex + index, 1); // Menghapus Pokemon dari daftar sesuai dengan index yang diberikan
    //     removePokemon(updatedPokemonList); // Perbarui daftar Pokemon di PokemonContext
    // };

    const handleRemovePokemon = (index) => {
        console.log(`Removing Pokemon at index ${index}`);
        removePokemon(index); // Panggil fungsi removePokemon dari context
    };

    const handlePrevious = () => {
        setStartIndex(Math.max(0, startIndex - itemsPerPage));
    };

    const handleNext = () => {
        setStartIndex(Math.min(caughtPokemon.length - itemsPerPage, startIndex + itemsPerPage));
    };

    const visiblePokemon = caughtPokemon.slice(startIndex, startIndex + itemsPerPage);


    return (
        <section className="mypokemon-page min-vh-100 d-flex justify-content-center align-items-center">
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h2 className={`text-center my-4 ${caughtPokemon.length === 0 ? 'no-pokemon-text' : 'my-pokemon-text'}`}>
                                {caughtPokemon.length === 0 ? 'No Pokemon' : 'My Pokemon'}
                            </h2>
                            {visiblePokemon.length > 0 && (
                                <div className="pokemon-list-success">
                                    {visiblePokemon.map((pokemon, index) => (
                                        <div key={index} className="pokemon-card-success">
                                            <div className="remove-icon" onClick={() => handleRemovePokemon(index)}>
                                                <img
                                                    src={RemoveIcon}
                                                    alt="remove-icon"
                                                    style={{ width: '20px', height: '20px', position: 'relative', bottom: '5px', left: '70px', cursor: 'pointer' }}
                                                />
                                            </div>
                                            {pokemon.image ? (
                                                <img
                                                    src={pokemon.image}
                                                    alt={`Caught Pokemon ${index + 1}`}
                                                    className="pokemon-image-success"
                                                />
                                            ) : (
                                                <div className="empty-image-placeholder">
                                                    No Image
                                                </div>
                                            )}
                                            <h3 className="mt-3">{pokemon.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {caughtPokemon.length > itemsPerPage && (
                                <div className="pagination">
                                    <button className="pagination-btn" onClick={handlePrevious} disabled={startIndex === 0}>Previous</button>
                                    <button className="pagination-btn" onClick={handleNext} disabled={startIndex + itemsPerPage >= caughtPokemon.length}>Next</button>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MyPokemon;
