import React, { ReactNode } from 'react';
import './styles.css';

type Color = string;

interface Param {
	id: number;
	name: string;
	type: 'string';
}
interface ParamValue {
	paramId: number;
	value: string;
}
interface Model {
	paramValues: ParamValue[];
	colors: Color[];
}
interface Props {
	params: Param[];
	model: Model;
}

interface State {
	values: ParamValue[];
}

const Types: Record<Param['type'], string> = {
	string: 'text',
};

class ParamEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { values: this.props.model.paramValues };
	}

	public getModel(): Model {
		return {
			paramValues: this.state.values.map((item) => ({ paramId: item.paramId, value: item.value })),
			colors: this.props.model.colors,
		};
	}

	private handleChange(e: React.ChangeEvent<HTMLInputElement>, id: ParamValue['paramId']) {
		const tmp = [...this.state.values];
		const index = tmp?.findIndex((item) => item.paramId === id);
		tmp[index] = { ...tmp[index], value: e.target.value };
		this.setState({ values: tmp });
	}

	render(): ReactNode {
		return (
			<div className="container">
				{this.props.model.paramValues?.map((item) => {
					const param = this.props.params.find((el) => el.id === item.paramId);
					const value = this.state.values.find((el) => el.paramId === item.paramId)?.value;
					if (!param) return null;
					return (
						<label key={param.id} className="input">
							<span className="label">{param.name}</span>
							<input type={Types[param.type]} value={value} onChange={(e) => this.handleChange(e, param.id)} />
						</label>
					);
				})}
			</div>
		);
	}
}

const App = () => {
	return (
		<ParamEditor
			model={{
				paramValues: [
					{
						paramId: 1,
						value: 'повседневное',
					},
					{
						paramId: 2,
						value: 'макси',
					},
				],
				colors: ['#333333'],
			}}
			params={[
				{
					id: 1,
					name: 'Назначение',
					type: 'string',
				},
				{
					id: 2,
					name: 'Длина',
					type: 'string',
				},
			]}
		/>
	);
};

export default App;
