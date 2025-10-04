const { createApp } = Vue;

createApp({
  data() {
    return {
      newTodo: '',
      currentTab: 'all',
      todos: [
        { id: 1, text: '學習 Vue.js', completed: false },
        { id: 2, text: '完成作業', completed: false },
        { id: 3, text: '看教學影片', completed: true }
      ],
      nextId: 4
    }
  },

  computed: {
    filteredTodos() {
      switch (this.currentTab) {
        case 'active':
          return this.todos.filter(todo => !todo.completed);
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        default:
          return this.todos;
      }
    },

    completedCount() {
      return this.todos.filter(todo => todo.completed).length;
    }
  },

  methods: {
    addTodo() {
      const text = this.newTodo.trim();

      if (!text) {
        alert('請輸入待辦事項！');
        return;
      }

      this.todos.push({
        id: this.nextId++,
        text: text,
        completed: false
      });

      this.newTodo = '';
    },

    deleteTodo(id) {
      const originalIndex = this.todos.findIndex(todo => todo.id === id);
      if (originalIndex !== -1) {
        this.todos.splice(originalIndex, 1);
      } else {
        console.warn(`找不到 ID 為 ${id} 的待辦事項`);
      };
    },

    clearCompleted() {
      if (this.completedCount === 0) {
        alert('沒有已完成的待辦事項！');
        return;
      }

      if (confirm(`確定要清除${this.completedCount} 個已完成的待辦事項嗎？`)) {
        this.todos = this.todos.filter(todo => !todo.completed);
      }
    }
  },
}).mount('#app');
