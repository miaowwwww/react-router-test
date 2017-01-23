import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute, IndexLink, Redirect } from 'react-router';

import './css/index.less'

class App extends PureComponent {
	render() {
		return (
			<div>
				<GlobalNav />
				{ this.props.children } { /* this.props.children 是被嵌套在App的组件，相当于放子路由的View*/}
			</div>
		)
	}
}
class GlobalNav extends PureComponent {
	render() {
		return (
				<ul className="GlobalNav">
					<li><Link to={{pathname:"/select", hash:'#ahash', query:{foo: 'bar', boo:'boz'}, state:{data:'miao'}  }} activeClassName="GlobalNav-active">精选</Link></li>
					{ false && <li><Link to={(location) => { 
													return {pathname:"/found"} 
												} 
					} activeClassName="GlobalNav-active">发现</Link></li> }

					<li><Link to="/found" activeClassName="GlobalNav-active">发现</Link></li>
					<li><Link to="/follow" activeClassName="GlobalNav-active">关注</Link></li>
					<li><IndexLink to="/my" activeClassName="GlobalNav-active">我的</IndexLink></li>
				</ul>
		)
	}
}


class Select extends PureComponent {
	render() {
		console.log(this.props)
		return (
			<div>page select</div>
		)
	}
}
class Found extends PureComponent {
	constructor(props, context) {
		super(props, context);
	}
	changeRouter = () => {
		console.log(this.props)
		// this.props.router.push('/follow');
		// this.props.router.push({
		// 	pathname:'/follow',
		// 	state:{name:'xxx'},
		// 	query: {foo: 'bar'}
		// })

		// this.props.router.replace('/follow');
		// this.props.router.replace({
		// 	pathname: '/follow',
		// 	query: {foo:'bar'}
		// })
	}
	render() {
		console.log(this.context)
		return (
			<div>
				page Found<br/>
				<button onClick={this.changeRouter}>chenge router with function</button>			
			</div>
		)
	}
}

// class Follow extends PureComponent {
// 	render() {
// 		return (
// 			<div>page Follow</div>
// 		)
// 	}
// }
class My extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			name: 'miaowwwww'
		}
	}
	handleChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}
	render() {
		console.log(this.props, this.props.children)
		return (
			<div>
				<h1>page My</h1>
				<ul>
					<li>
						<input type="text" onChange={ this.handleChange } />
						<button><Link to={`/my/name/${this.state.name}`}>go</Link></button>
					</li>
					<li><button><Link to='/my/mysex'>go mysex page</Link></button></li>
				</ul>
				<br/>
				<hr/>
				{ this.props.children || 'nonoonnonnnnnnnnnn'}
			</div>
		)
	}
}
class MyName extends PureComponent {
	render() {
		const { myname } = this.props.params;
		return (
			<div>
				my name is {this.props.params.myname}
				<p><button><Link to={{pathname:`/my/name/${myname}/info`, query:{foo:'bar'}}}>check my info</Link></button></p>
				<br/>
				<br/>
				<br/>
				<hr/>
				{ this.props.children }
			</div>
		)
	}
}

class MySex extends PureComponent {
	render() {
		return (
			<div>this is mysex page</div>
		)
	}
}
class MyInfo extends PureComponent {
	render() {
		const { myname } = this.props.params;
		return (
			<div>this is { myname }  info page</div>
		)
	}
}
class IndexApp extends PureComponent {
	render() {
		return (
			<div>{ `this is IndexApp with <IndexRoute>` }</div>
		)
	}
}

const onEnterHook = (nextState, replace /*,cb*//*若添加cb参数，钩子变成异步执行，cb返回之前，将发生阻塞*/) => {
	console.log('onenter', nextState);
	// replace // 是router.replace(),若访问者没有权限，则引导到其他页面
}
const onLeaveHook = (nextState, replace /*,cb*/) => {
	console.log('onleave', nextState);	
}
const onChangeHook = (prevState, nextState, replace, callback) => {
	console.log('onChange', prevState, nextState)
}
// render((
// 	<Router history={ browserHistory }>
// 		<Route path="/" component={ App }>
// 			<IndexRoute component={ IndexApp } />
// 			<Route path="select" component={ Select }></Route>
// 			<Route path="found" component={ Found } onEnter={onEnterHook} onLeave={onLeaveHook}></Route>
// 			<Route path="follow" component={ Follow }>
// 			</Route>
// 			<Route path="my" component={ My } >
// 				<Redirect from="name/xxx" to='mysex' />
				
// 				<Route path="name/:myname" component={ MyName }>
// 					<Route path="info" component={ MyInfo } ></Route>
// 				</Route>
// 				<Route path="mysex" component={ MySex } />
// 			</Route>
// 			// <Redirect from="*" to='/' />
// 		</Route>
// 	</Router>
// ), document.getElementById('root'));



const selectRouter = {
	path:'select',
	component: Select
}
const foundRouter = {
	path:'found',
	component: Found
}
const myRouter = {
	path:'my',
	getComponent(nextState,cb) {
		cb(null, My)
	}
}
// import Follow from './components/Follow.js';
const followRouter = {
	path:'follow',
	getComponent(nextState,cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/Follow'))
		})
	}
	// getComponent(nextState, cb) {
	// 	cb(null, Follow)
	// }
}
const rootRouter = {
	path: '/',
	component: App,
	// indexRoute: IndexApp,
	childRoutes: [
		selectRouter,
		foundRouter,
		followRouter,
		// require('./components/Follow.index'),
		myRouter
		]
}
// const rootRouter = {
// 	path: '/',
// 	component: App,
// 	getIndexRoute(partialNextState, cb) {
// 		cb(null,  IndexApp);
// 	},
// 	getChildRoutes(location, cb) {
// 		cb(null, [
// 			selectRouter,
// 			foundRouter,
// 			followRouter,
// 			myRouter
// 		])
// 	}
// }
render(
	<Router history={browserHistory} routes={rootRouter} />,
	document.getElementById('root')
)