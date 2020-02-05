import React, { Component } from 'react';
import '../App.css';

class MenuBtn extends Component {
	state = {
		isActive: false
	};

	changeBtnToActiveState = (e) => {
		this.setState({ isActive: !this.state.isActive });
		this.props.showFlyOut();
	};

	render() {
		const { isActive } = this.state;
		const currentMenuBtnClass = isActive ? 'menuBtn active' : 'menuBtn';

		return (
			<div onClick={(e) => this.changeBtnToActiveState(e)} className={currentMenuBtnClass}>
				<span />
				<span />
				<span />
			</div>
		);
	}
}

export default MenuBtn;
