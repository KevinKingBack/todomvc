(function (Vue) {
	var todos = [{
			id: 1,
			title: 'grenadier',
			completed: false
		},
		{
			id: 2,
			title: 'hormonize',
			completed: true
		},
		{
			id: 3,
			title: 'heterochrome',
			completed: false
		},
	]
	var filterTodos = {
		all: function () {
			return todos
		},
		active: function () {
			var tmp = []
			todos.forEach(function (todo) {
				!todo.completed && tmp.push(todo)
			})
			return tmp
		},
		completed: function () {
			var tmp = []
			todos.forEach(function (todo) {
				todo.completed && tmp.push(todo)
			})
			return tmp
		}
	}
	var vm = new Vue({
		el: '#app',
		data: {
			title: '任务清单',
			todos: todos,
			todoText: '',
			visibility: 'all',
			checkAll: false,
			currentEditing: null
		},

		computed: {
			getAllCompleted: function () {
				var count = 0
				this.todos.forEach(function (todo) {
					todo.completed && count++
				})
				return count
			},
			filterTodos: function () {
				return filterTodos[this.visibility]()
			}
		},
		filters: {
			allCompletedCount: function (val) {
				var count = 0
				val.forEach(function (todo, index) {
					todo.completed && count++
				})
				return count
			}
		},
		directives: {
			focus: {
				//当作用了该指令的元素被插入 dom 文档之后会自动执行
				inserted:function (el, binding) {
					console.log('inserted')
					//el 是作用该指令的 dom 元素
					// binding 可以拿到一些相关属性数据
					console.log(el);
					el.focus()
				},
				// bind 只调用一次
				bind: function () {
					console.log('bind');
				},
				// 每当 dom 跟新, update 就调用
				update: function () {
					console.log('update');
				}
			},
			'todo-focus': function (el, binding) {
			 
				if (binding.value) {
					el.focus()
				}
			}
		},
		methods: {
			addTodos: function () {
				var todoText = this.todoText.trim('')
				if (todoText.length === 0) {
					return
				}
				todos.push({
					id: 0,
					title: todoText,
					completed: false
				})
				this.todoText = ''
			},
			remove: function (id) {
				var _this = this
				this.todos.some(function (todo, index) {
					if (todo.id === id) {
						_this.todos.splice(index, 1)
						return true
					}
				})
			},
			clearAllCompleted: function () {
				for (var i = 0; i < this.todos.length; i++) {
					if (this.todos[i].completed) {
						this.todos.splice(i, 1)
						i--
					}
				}
			},
			toggleAll: function () {
				var _this = this
				this.todos.forEach(function (todo, index) {
					todo.completed = _this.checkAll
				})
			},
			//===========
			// getCompletedCount: function () {
			// 	var count = 0
			// 	this.todos.forEach(function (todo) {
			// 		todo.completed && count++
			// 	})
			// 	return count
			// }
			//============
		}
	})

	//注册 window 的 hash 改变事件
	window.onhashchange = function () {
		var hash = window.location.hash.substr(2)
		hash === '' && (hash = 'all')
		vm.visibility = hash
	}
   window.onhashchange()
})(window.Vue);
