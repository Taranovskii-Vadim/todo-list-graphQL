new Vue({
  el: "#app",
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: "",
      todos: [],
    };
  },
  created() {
    fetch("/api/tasks", { method: "get" })
      .then(res => res.json())
      .then(data => {
        this.todos = [...data];
      })
      .catch(e => console.log(e));
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      fetch("/api/tasks", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
        .then(response => response.json())
        .then(data => {
          this.todos.push(data);
        })
        .catch(e => console.log(e));
      this.todoTitle = "";
    },
    completeTask(id) {
      fetch(`/api/tasks/${id}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: true }),
      });
    },
    removeTodo(id) {
      fetch(`/api/tasks/${id}`, {
        method: "delete",
      })
        .then(() => {
          this.todos = this.todos.filter(t => t._id !== id);
        })
        .catch(e => console.log(e));
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value) {
      return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(value));
    },
  },
});
