import { Text, useWindowDimensions } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { s } from './styles';
import { Place, DataPlaceModel } from '../place';
import { useRef } from 'react';

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
				renderItem={({ item }) => <Place data={item} />}
				contentContainerStyle={s.content}
				ListHeaderComponent={() => (
					<Text style={s.title}>Explore locais perto de você</Text>
				)}
			/>
		</BottomSheet>
	);
}
