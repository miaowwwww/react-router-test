// import Follow from './components/Follow.js';
const followRouter = {
	path:'follow',
	getComponent(nextState,cb) {
		require.ensure([], (require) => {
			cb(null, require('./Follow'))
		})
	}
	// getComponent(nextState, cb) {
	// 	cb(null, Follow)
	// }
}
module.exports = followRouter;
// export default followRouter;//这种不可以实现代码分割