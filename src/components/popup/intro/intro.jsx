import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
import {findLocale} from "../../../lib/localize";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'intro'
	};
}

const HOST_PARTS = ((window && window.location && window.location.hostname) || '').split('.');
const DOMAIN = HOST_PARTS.length > 0 ? HOST_PARTS.slice(-2).join('.') : '';

export default class Intro extends Component {

	static defaultProps = {
	};

	onSelectFlag(countryCode) {
		this.props.store.updateLanguage(countryCode);
	}

	componentWillMount() {
		this.selectDefaultFlag();
	}

	selectDefaultFlag() {
		let defaultFlag = findLocale();

		defaultFlag = defaultFlag.toUpperCase();

		//If it's supposed to be some version of english
		if (defaultFlag.indexOf("GB") !== -1 ||
			defaultFlag.indexOf("EN") !== -1 ) {
			//Default to GB
			defaultFlag = "GB";
		}

		defaultFlag = defaultFlag.split('-');

		this.setState({
			defaultFlag: defaultFlag[0]
		});
	}

	render(props, state) {

		const {
			onAcceptAll,
			onShowPurposes,
		} = props;

		return (
			<div class={style.intro}>
				<div className={style.customLogo}>

				</div>
				<div className={style.customFlagSelect}>
					<ReactFlagsSelect
						countries={["GB", "FR", "DE"]}
						customLabels={{"GB": "English", "FR": "Français", "DE": "Deutsch"}}
						onSelect={this.onSelectFlag.bind(this)}
						defaultCountry={this.state.defaultFlag}/>
				</div>
				<div class={style.title}>
					<LocalLabel localizeKey='title'>Thanks for visiting</LocalLabel> {DOMAIN}
				</div>
				<div class={style.description}>
					<LocalLabel localizeKey='description'>In order to run a successful website, we and certain third parties are setting cookies and accessing and storing information on your device for various purposes. Various third parties are also collecting data to show you personalized content and ads. Some third parties require your consent to collect data to serve you personalized content and ads.</LocalLabel>
				</div>
				<div class={style.options}>
					<Button
						class={style.rejectAll}
						invert={true}
						onClick={onShowPurposes}
					>
						<LocalLabel localizeKey='showPurposes'>Manage your choices</LocalLabel>
					</Button>
					<Button
						class={style.acceptAll}
						onClick={onAcceptAll}
					>
						<LocalLabel localizeKey='acceptAll'>Got it, thanks!</LocalLabel>
					</Button>
				</div>
			</div>
		);
	}
}
