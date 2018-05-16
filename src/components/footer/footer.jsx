import { h, Component } from 'preact';
import style from './footer.less';
import Label from '../label/label';
import CloseButton from '../closebutton/closebutton';
import config from '../../lib/config';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'footer'
	};
}

export default class Footer extends Component {

	static defaultProps = {
		onShowConsent: () => {},
	};

	handleClose = () => {
		const { store } = this.props;
		const { toggleFooterShowing } = store;
		toggleFooterShowing(false);
	};

	handleShowConsent = () => {
		const { store } = this.props;
		const { toggleConsentToolShowing } = store;
		toggleConsentToolShowing(true);
	};

	render(props) {
		const { store } = props;
		const { isFooterShowing } = store;

		return (
			<div
				class={style.footer}
				style={{ borderTop: "2px solid"+config.themeColor, display: isFooterShowing ? 'flex' : 'none'}}
				>
				<CloseButton
					hasBorder={true}
					class={style.close}
					onClick={this.handleClose}
					style={{boxShadow: "0 0 0 3px "+config.themeColor}}
				/>
				<LocalLabel localizeKey='message' class={style.message}>A reminder you can control your user privacy preferences</LocalLabel>
				<a
					class={style.openConsent}
					onClick={this.handleShowConsent}
				>
					<LocalLabel style={"color:"+config.themeColor} localizeKey='consentLink'>here</LocalLabel>
				</a>
			</div>
		);
	}
}
