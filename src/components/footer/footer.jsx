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

	constructor(props) {
		super(props);
	}

	handleClose = () => {
		const { store, notify } = this.props;
		const { toggleFooterShowing } = store;
		notify('onClose');
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
				style={{display: isFooterShowing ? 'flex' : 'none'}}
				>
				<CloseButton
					hasBorder={true}
					class={style.close}
					onClick={this.handleClose}
				/>
				<LocalLabel localizeKey='message' class={style.message}>A reminder you can control your user privacy preferences</LocalLabel>
				<a
					class={style.openConsent}
					onClick={this.handleShowConsent}
				>
					<LocalLabel localizeKey='consentLink'>here</LocalLabel>
				</a>
			</div>
		);
	}
}
