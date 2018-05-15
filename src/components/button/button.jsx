import { h, Component } from 'preact';
import style from './button.less';

export default class Button extends Component {

	static defaultProps = {
		onClick: () => {},
		invert: false
	};


	render(props) {
		const {
			children,
			onClick,
			styleName,
			invert
		} = props;

		return (
			<button
				class={[style.button, props.class, invert ? style.invert : ''].join(' ')}
				style={styleName}
				onClick={onClick}>
				{children}
			</button>
		);
	}
}
