import { View, Text, Image } from 'react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { s } from './styles';
import { IconTicket } from '@tabler/icons-react-native';
import { colors } from '@/styles/theme';

export interface DataPlaceModel {
	id: string;
	name: string;
	description: string;
	coupons: number;
	cover: string;
	address: string;
}

interface PlaceProps extends TouchableOpacityProps {
	data: DataPlaceModel;
}

export function Place({ data, ...rest }: PlaceProps) {
	return (
		<TouchableOpacity style={s.container}>
			<Image style={s.image} source={{ uri: data.cover }} />
			<View style={s.content}>
				<Text style={s.name}>{data.name}</Text>
				<Text style={s.description}>{data.description}</Text>
				<View style={s.footer}>
					<IconTicket size={16} color={colors.red.base} />
					<Text style={s.tickets}>{data.coupons} cupons disponíveis</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
