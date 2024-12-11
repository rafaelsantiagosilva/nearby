import { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { api } from '@/services/api';
import { Categories, CategoryModel } from './components/categories';
import { DataPlaceModel } from './components/place';
import { Places } from './components/places';

interface PlacesProps extends DataPlaceModel {}

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
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchPlaces();
	}, [categorySelectedId]);

	return (
		<View style={{ flex: 1, backgroundColor: "#CECECE" }}>
			<Categories
				data={categories}
				selected={categorySelectedId}
				onSelect={setCategorySelectedId}
			/>
			<Places data={places} />
		</View>
	);
}
