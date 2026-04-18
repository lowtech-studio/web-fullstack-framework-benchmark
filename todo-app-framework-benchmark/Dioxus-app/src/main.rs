use dioxus::prelude::*;

// ── Server-only: SQLite database ──────────────────────────────────────────────
#[cfg(feature = "server")]
mod db {
    use rusqlite::Connection;

    thread_local! {
        pub static DB: Connection = {
            let conn = Connection::open("todos.db").expect("Failed to open database");
            conn.execute_batch(
                "CREATE TABLE IF NOT EXISTS todos (
                    id   INTEGER PRIMARY KEY AUTOINCREMENT,
                    todo TEXT NOT NULL
                );",
            )
            .expect("Failed to create table");
            conn
        };
    }
}

// ── Shared data types ─────────────────────────────────────────────────────────
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize)]
struct Todo {
    id: i64,
    todo: String,
}

// ── Server functions ──────────────────────────────────────────────────────────

/// Return all todos from the database.
#[server]
async fn get_todos() -> Result<Vec<Todo>, ServerFnError> {
    db::DB.with(|conn| {
        let mut stmt = conn
            .prepare("SELECT id, todo FROM todos ORDER BY id")
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        let todos = stmt
            .query_map([], |row| {
                Ok(Todo {
                    id: row.get(0)?,
                    todo: row.get(1)?,
                })
            })
            .map_err(|e| ServerFnError::new(e.to_string()))?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        Ok(todos)
    })
}

/// Insert a new todo and return the updated list.
#[server]
async fn create_todo(todo: String) -> Result<Vec<Todo>, ServerFnError> {
    db::DB
        .with(|conn| {
            conn.execute("INSERT INTO todos (todo) VALUES (?1)", [&todo])
                .map_err(|e| ServerFnError::new(e.to_string()))
                .map(|_| ())
        })
        .map_err(|e: ServerFnError| e)?;
    get_todos().await
}

/// Delete a todo by its text and return the updated list.
#[server]
async fn delete_todo(todo: String) -> Result<Vec<Todo>, ServerFnError> {
    db::DB
        .with(|conn| {
            conn.execute("DELETE FROM todos WHERE todo = ?1", [&todo])
                .map_err(|e| ServerFnError::new(e.to_string()))
                .map(|_| ())
        })
        .map_err(|e: ServerFnError| e)?;
    get_todos().await
}

// ── Entry point ───────────────────────────────────────────────────────────────

fn main() {
    dioxus::launch(App);
}

// ── Root component ────────────────────────────────────────────────────────────

#[component]
fn App() -> Element {
    rsx! {
        document::Title { "ToDo App" }
        TodoApp {}
    }
}

// ── TodoApp component ─────────────────────────────────────────────────────────

#[component]
fn TodoApp() -> Element {
    // Reactive list of todos fetched from the server
    let mut todos = use_resource(|| async move { get_todos().await.unwrap_or_default() });

    // Input field value
    let mut input_value = use_signal(String::new);

    // Create a new todo
    let create = move |_| async move {
        let value = input_value.peek().trim().to_string();
        if value.is_empty() {
            return;
        }
        if let Ok(updated) = create_todo(value).await {
            todos.set(Some(updated));
            input_value.set(String::new());
        }
    };

    // Handle Enter key in the input
    let create_on_enter = move |evt: KeyboardEvent| async move {
        if evt.key() == Key::Enter {
            let value = input_value.peek().trim().to_string();
            if value.is_empty() {
                return;
            }
            if let Ok(updated) = create_todo(value).await {
                todos.set(Some(updated));
                input_value.set(String::new());
            }
        }
    };

    rsx! {
        h1 { "ToDo App Benchmark" }

        input {
            id: "create-todo-field",
            r#type: "text",
            name: "todo",
            value: "{input_value}",
            oninput: move |evt| input_value.set(evt.value()),
            onkeydown: create_on_enter,
        }
        input {
            id: "create-todo-button",
            r#type: "submit",
            value: "Submit",
            onclick: create,
        }

        ul {
            id: "todos",
            match todos() {
                Some(list) => rsx! {
                    for todo in list {
                        TodoItem { key: "{todo.id}", todo: todo.clone(), todos }
                    }
                },
                None => rsx! { li { "Loading..." } },
            }
        }
    }
}

// ── TodoItem component ────────────────────────────────────────────────────────

#[component]
fn TodoItem(todo: Todo, mut todos: Resource<Vec<Todo>>) -> Element {
    let todo_text = todo.todo.clone();

    let delete = move |evt: MouseEvent| {
        evt.prevent_default();
        let text = todo_text.clone();
        async move {
            if let Ok(updated) = delete_todo(text).await {
                todos.set(Some(updated));
            }
        }
    };

    rsx! {
        li {
            "{todo.todo} "
            a {
                id: "delete-todo-link-{todo.todo}",
                href: "#",
                onclick: delete,
                "Delete"
            }
        }
    }
}

/// Echo component that demonstrates fullstack server functions.
#[component]
fn Echo() -> Element {
    let mut response = use_signal(|| String::new());

    rsx! {
        div {
            id: "echo",
            h4 { "ServerFn Echo" }
            input {
                placeholder: "Type here to echo...",
                oninput:  move |event| async move {
                    let data = echo_server(event.value()).await.unwrap();
                    response.set(data);
                },
            }

            if !response().is_empty() {
                p {
                    "Server echoed: "
                    i { "{response}" }
                }
            }
        }
    }
}

/// Echo the user input on the server.
#[post("/api/echo")]
async fn echo_server(input: String) -> Result<String, ServerFnError> {
    Ok(input)
}
