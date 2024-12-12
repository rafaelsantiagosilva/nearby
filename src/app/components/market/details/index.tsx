import { View, Text } from 'react-native';
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native';
import { Info } from '../info';
import { s } from './styles';

export interface MarketModel {
	id: string;
	name: string;
	description: string;
	address: string;
	phone: string;
	coupons: number;
	rules: {
		id: string;
		description: string;
	}[];
}

interface DetailsProps {
	data: MarketModel;
}

export function Details({ data }: DetailsProps) {
	return (
		<View style={s.container}>
			<Text style={s.name}>{data.name}</Text>
			<Text style={s.description}>{data.description}</Text>
			<View style={s.group}>
				<Text style={s.title}>Informações</Text>
				<Info
					icon={IconTicket}
					description={`${data.coupons} cupons disponíveis`}
				/>
				<Info icon={IconMapPin} description={data.address} />
				<Info icon={IconPhone} description={data.phone} />
			</View>
			<View style={s.group}>
				<Text style={s.title}>Regulamento</Text>
				{data.rules.map((rule) => (
					<Text key={rule.id} style={s.rule}>
						{`\u2022 ${rule.description}`}
					</Text>
				))}
			</View>
		</View>
	);
}
