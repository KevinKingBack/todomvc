(function (Vue) {
	var todos = [
    { id: 1, title: 'grenadier', completed: false },
    { id: 2, title: 'hormonize', completed: true },
    { id: 3, title: 'heterochrome', completed: false },
  ]
	var vm = new Vue({
		el: '#app',
		data:{
			title: '任务清单',
			todos: todos,
			todoText: '',
			checkAll: false
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
				this.todos.some(function(todo,index) {
					if (todo.id === id) {
						_this.todos.splice(index,1)
						return true	
					}
				})
			},
			clearAllCompleted: function () {
				for (var i = 0;i < this.todos.length; i++) {
					if (this.todos[i].completed) {
						this.todos.splice(i,1)
						i--
					}
				}
			},
			toggleAll: function () {
				var _this = this
				this.todos.forEach(function (todo,index) {
					todo.completed = _this.checkAll
				})
			}
		}
	})

})(window.Vue);
