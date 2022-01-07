import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import { usePokemonPagination } from '../hooks/usePokemonPagination';
import { styles } from '../theme/AppTheme';

export default function HomeScreen() {

    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();
    const { isLoading, simplePokemonList, loadPokemons } = usePokemonPagination();
    console.log(simplePokemonList)

    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />

            <View
                style={{
                    alignItems: 'center'
                }}
            >
                <FlatList
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    //Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            paddingBottom: 10
                        }}>Pokédex</Text>
                    )}
                    renderItem={({ item, index }) => (
                        <PokemonCard
                            pokemon={item}
                            key={index}
                        />
                    )}

                    //Infinite scroll
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}
                    ListFooterComponent={(
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={20}
                            color="grey"
                        />
                    )}
                />
            </View>
        </>
    )
}

const stylesLocal = StyleSheet.create({})
