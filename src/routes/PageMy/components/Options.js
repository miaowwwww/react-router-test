import React, {PropTypes} from 'react';

class Options extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	static propTypes = {
		options: PropTypes.array
	}
	handleClick = (e) => {
		if(e.which === 13 && e.target.value) {
			const { addOption } = this.props;
			addOption(e.target.value);
			e.target.value = '';
		}
	}
	render() {
		const { options } = this.props;
		const optionDts = options.map(option => (
			<dt key={option}>{option}</dt>
		))
		return (
				<dl>
					<dt><input type="text" placeholder="new one" onKeyPress={this.handleClick} /></dt>
					{optionDts}

					<dt>我的消息</dt>
					<dt>我的关注</dt>
					<dt>我的缓存</dt>
					<dt>功能开关</dt>
				</dl>
		)
	}
}

export default Options;
