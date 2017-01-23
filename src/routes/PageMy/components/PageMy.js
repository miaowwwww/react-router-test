import React, { PropTypes } from 'react';
import defaultImg from '../../../images/default.png';
import UserImg from '../../../images/user.jpg';
// import Options from './Options';
import VisitableOptions from '../container/VisitableOptions';
import Header from '../container/Header';
class PageMy extends React.Component {

	render() {
		return (
			<div className="PageMy">
				<Header />
				<VisitableOptions />
			</div>
		)
	}
};


module.exports =  PageMy;