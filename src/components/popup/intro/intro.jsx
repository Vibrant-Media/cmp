import { h, Component } from 'preact';
import style from './intro.less';
import Button from '../../button/button';
import Label from '../../label/label';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
import {findLocale} from "../../../lib/localize";
import config from "../../../lib/config";
import {lightenDarkenColor, addCss} from "../../../lib/customizer";

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
		console.log(countryCode);
		this.props.store.updateLanguage(countryCode);
	}

	componentWillMount() {
		this.selectDefaultFlag();
		if (config.themeColor) {
			const buttonBackgroundStyle = "background: "+config.themeColor+"!important; ";

			const brighterColor = lightenDarkenColor(config.themeColor, -0.3);
			const buttonHoverColorStyle = "color: "+brighterColor+"!important; ";

			const acceptAllCSS      = "."+style.acceptAll+"{"+buttonBackgroundStyle+"}";
			const acceptAllHoverCSS = "."+style.acceptAll+":hover {"+buttonHoverColorStyle+"}";

			const rejectAllCss = "."+style.rejectAll+"{"+"border: 2px solid "+config.themeColor+"!important; color: "+config.themeColor+"!important}";

			const css  = acceptAllCSS + acceptAllHoverCSS + rejectAllCss;

			addCss(css);

		}
	}

	selectDefaultFlag() {
		let defaultFlag = findLocale();
		defaultFlag = defaultFlag.toUpperCase();
		if (defaultFlag.indexOf("GB") !== -1 || defaultFlag.indexOf("EN") !== -1) {
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
				{config.customLogo &&
					<img src={config.customLogo} class={style.customLogo}/>
				}
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
