import { Text, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { s } from './styles';
import { Place, DataPlaceModel } from '../place';
import { useRef } from 'react';
import Market from '@/app/market/[id]';

interface PlacesProps {
	data: DataPlaceModel[];
}

export function Places({ data }: PlacesProps) {
	const dimensions = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = [250, dimensions.height - 100];

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			handleIndicatorStyle={s.indicator}
			backgroundStyle={s.container}
			enableOverDrag={false}
		>
			<BottomSheetFlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Place
						data={item}
						onPress={() =>
							router.navigate(`./market/${item.id}`)
						}
					/>
				)}
				contentContainerStyle={s.content}
				ListHeaderComponent={() => (
					<Text style={s.title}>Explore locais perto de você</Text>
				)}
			/>
		</BottomSheet>
	);
}
