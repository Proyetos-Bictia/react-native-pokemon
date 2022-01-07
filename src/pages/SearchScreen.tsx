import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePokemonSearch } from '../hooks/usePokemonSearch';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';

import { styles } from "../theme/AppTheme";
import { SimplePokemon } from '../interfaces/pokemon.interfaces';

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();
    
    const [term, setTerm] = useState('');
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

    useEffect(() => {
        if(term.length === 0) {
            return setPokemonFiltered([]);
        }

        setPokemonFiltered(
            simplePokemonList.filter(
                poke => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
            )
        )
    }, [term])

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={{
            flex: 1,
            marginTop: top + 10,
            marginHorizontal: 20
        }}>
            <SearchInput
                onDebounce={setTerm}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: '100%',
                    top: 15
                }}
            />

            <FlatList
                data={pokemonFiltered}
                keyExtractor={(pokemon) => pokemon.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                //Header
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        marginTop: top + 60,
                        marginBottom: top + 20,
                        paddingBottom:  10
                    }}>{term}</Text>
                )}
                renderItem={({ item, index }) => (
                    <PokemonCard
                        pokemon={item}
                        key={index}
                    />
                )}
            />

        </View>
    )
}

export default SearchScreen
