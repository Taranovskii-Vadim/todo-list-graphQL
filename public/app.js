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
    const query = `
    query{
      getTasks{
        id title done date
        }
      }
    `;
    fetch("/graphql", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then(res => res.json())
      .then(response => {
        this.todos = response.data.getTasks;
      })
      .catch(e => console.log(e));
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      const query = `mutation {
        addTask(title: "${title}") {
          id
          title
          date
          done
        }
      }
      `;
      fetch("/graphql", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })
        .then(res => res.json())
        .then(response => {
          this.todos.push(response.data.addTask);
        });
      this.todoTitle = "";
    },
    completeTask(id) {
      const query = `
      mutation {
        finishTask(id: "${id}", done: true)
      }
      `;
      fetch("/graphql", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
    },
    removeTodo(id) {
      const query = `
      mutation {
        removeTask(id: "${id}")
      }`;
      fetch("/graphql", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }).then(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
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
      }).format(new Date(+value));
    },
  },
});
