import React, { PropTypes } from 'react';
import defaultImg from '../../../images/default.png';
import UserImg from '../../../images/user.jpg';

class Header extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {};
	}
	static propTypes = {

	}
	handleImg = (e) => {
		const { toggleLoginView } = this.props;
		toggleLoginView();
	}

	render() {
		const { username } = this.props;
		return (
				<header>
					<i className="icon" >☺</i>
					<img src={ this.state.photoId && userImg || defaultImg } onClick={this.handleImg} />
					<p>{ username || '点击登陆后可评论'}</p>
					<ul>
						<li onClick={this.handleCollection}><i>♥</i>我的收藏</li>
						<li onClick={this.handleComment}><i>✉</i>我的评论</li>
					</ul>
				</header>
		)
	}
};


export default Header;