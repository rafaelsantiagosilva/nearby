import { FlatList } from 'react-native';
import { Category } from '../category';
import { s } from './styles';

export interface CategoryModel {
	id: string;
	name: string;
}

interface CategoriesProps {
	data: CategoryModel[];
	selected: string;
	onSelect: (id: string) => void;
}

export function Categories({ data, selected, onSelect }: CategoriesProps) {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Category
					name={item.name}
					iconId={item.id}
					onPress={() => onSelect(item.id)}
					isSelected={item.id === selected ? true : false}
				/>
			)}
			horizontal
			style={s.container}
			contentContainerStyle={s.content}
		/>
	);
}
