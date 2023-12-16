import React, { createContext, useContext, useState } from 'react';

const PokemonContext = createContext();

export const usePokemonContext = () => {
    return useContext(PokemonContext);
};

export const PokemonProvider = ({ children }) => {
    const [selectedImagePokemon, setSelectedImagePokemon] = useState('');

    const setPokemonImage = (image) => {
        setSelectedImagePokemon(image);
    };

    const [caughtPokemon, setCaughtPokemon] = useState([]);

    const addCaughtPokemon = (pokemon) => {
        setCaughtPokemon([...caughtPokemon, pokemon]);
    };

    const removePokemon = (index) => {
        const updatedPokemonList = [...caughtPokemon];
        updatedPokemonList.splice(index, 1);
        setCaughtPokemon(updatedPokemonList);
    };

    // const contextValue = {
    //     caughtPokemon,
    //     addCaughtPokemon,
    //     removePokemon, // Fungsi untuk menghapus Pokemon
    // };

    return (
        <PokemonContext.Provider value={{ selectedImagePokemon, setPokemonImage, caughtPokemon, addCaughtPokemon, removePokemon }}>
            {children}
        </PokemonContext.Provider>
    );
};
