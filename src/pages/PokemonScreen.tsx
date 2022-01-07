import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { usePokemon } from '../hooks/usePokemon';
import { FadeInImage } from '../components/FadeInImage';
import { RootStackParams } from '../navigator/Navigator';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

export default function PokemonScreen({ navigation, route }: Props) {

    const { simplePokemon, color } = route.params;
    const { name, id, picture } = simplePokemon
    const { top } = useSafeAreaInsets();
    const { isLoading, pokemon } = usePokemon(id);

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    ...styles.headerContainer,
                    backgroundColor: color,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,
                        top: top + 10
                    }}
                >
                    <Icon
                        name="arrow-back-outline"
                        color="white"
                        size={40}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 40,
                        left: 20
                    }}
                >
                    {name + '\n'} # {id}
                </Text>

                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokeball}
                />

                <FadeInImage
                    uri={picture}
                    style={styles.pokemonImage}
                />
            </View>

            {
                isLoading ? (
                    <View style={styles.loadingIndicator}>
                        <ActivityIndicator
                            color={color}
                            size={50}
                        />
                    </View>
                ) : (
                    <PokemonDetails
                        pokemon={pokemon}
                    />
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start'
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
