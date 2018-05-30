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
		this.state = {
			vmCookieName: 'VM_CONSENT',
			vmCookieExpiration: Date.now() + 7*24*60*60*1000 // Expire in 7 days
		}
	}

	setCookie = function (cname, cvalue, exdays) {
		let d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	};

	setVMCookie = function (_consentStr, _lastPrompDate) {
		let vmCookie = getVMCookie(this.state.vmCookieName);
		let lastPrompDate;
		if (_lastPrompDate) {
			lastPrompDate = _lastPrompDate;
		} else if (vmCookie && vmCookie.length) {
			vmCookie = JSON.parse(vmCookie);
			if (vmCookie.lastPrompDate) {
				lastPrompDate = vmCookie.lastPrompDate;
			} else {
				lastPrompDate = this.state.vmCookieExpiration;
			}
		} else {
			lastPrompDate = this.state.vmCookieExpiration;
		}

		let cookieData = {
			consentStr: _consentStr,
			consentExpiryDate: Date.now() + 86400000, //Expires in 24hrs
			lastPrompDate: lastPrompDate
		};

		let cookieDataJson = JSON.stringify(cookieData);
		this.setCookie(this.state.vmCookieName, cookieDataJson, 365);
	};

	handleClose = () => {
		const { store } = this.props;
		const { toggleFooterShowing } = store;
		const vmConsentCookie = getVMCookie('VM_CONSENT');
		this.setVMCookie(vmConsentCookie.consentStr, this.state.vmCookieExpiration);
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
