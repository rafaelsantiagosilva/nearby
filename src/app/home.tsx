import { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import MapView, { Callout, Marker } from 'react-native-maps';
import { api } from '@/services/api';
import { fontFamily, colors } from '@/styles/theme';
import { Categories, CategoryModel } from './components/categories';
import { Place, DataPlaceModel } from './components/place';
import { Places } from './components/places';

interface PlacesProps extends DataPlaceModel {
	latitude: number;
	longitude: number;
}

const currentLocation = {
	latitude: -23.561187293883442,
	longitude: -46.656451388116494,
};

export default function Home() {
	const [categories, setCategories] = useState<CategoryModel[]>([]);
	const [categorySelectedId, setCategorySelectedId] = useState('');
	const [places, setPlaces] = useState<PlacesProps[]>([]);

	async function fetchCategories() {
		try {
			const { data } = await api.get('/categories');
			setCategories(data);
			setCategorySelectedId(data[0].id);
		} catch (error) {
			console.log(error);
			Alert.alert('Categorias', 'Não foi possível carregar as categorias');
			router.navigate('./index');
		}
	}

	async function fetchPlaces() {
		try {
			if (!categorySelectedId) return;

			const { data } = await api.get('/markets/category/' + categorySelectedId);
			setPlaces(data);
		} catch (error) {
			console.error(error);
			Alert.alert('Locais', 'Não foi possível carregar os locais.');
			router.navigate('./index');
		}
	}

	async function getCurrentLocation() {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();

			if (granted) {
				const location = await Location.getCurrentPositionAsync();
				console.log(location);
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchCategories();
		getCurrentLocation();
	}, []);

	useEffect(() => {
		fetchPlaces();
	}, [categorySelectedId]);

	return (
		<View style={{ flex: 1, backgroundColor: '#CECECE' }}>
			<Categories
				data={categories}
				selected={categorySelectedId}
				onSelect={setCategorySelectedId}
			/>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Marker
					identifier="current"
					coordinate={currentLocation}
					image={require('@/assets/location.png')}
				/>
				{places.map((item) => (
					<Marker
						key={item.id}
						identifier={item.id}
						coordinate={{
							latitude: item.latitude,
							longitude: item.longitude,
						}}
						image={require('@/assets/pin.png')}
					>
						<Callout onPress={() => router.navigate(`./market/${item.id}`)}>
							<View>
								<Text
									style={{
										fontSize: 14,
										color: colors.gray[600],
										fontFamily: fontFamily.medium,
									}}
								>
									{item.name}
								</Text>
								<Text
									style={{
										fontSize: 12,
										color: colors.gray[600],
										fontFamily: fontFamily.regular,
									}}
								>
									{item.address}
								</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
			<Places data={places} />
		</View>
	);
}
