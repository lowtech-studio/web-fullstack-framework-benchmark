use axum::{response::Html, routing::{get, post}, Form, Router};
use rusqlite::Connection;
use serde::Deserialize;
use std::sync::{Arc, Mutex};

#[derive(Clone)]
struct AppState {
    db: Arc<Mutex<Connection>>,
}
use tower_http::services::ServeDir;

#[derive(Deserialize)]
struct CreateTodo {
    todo: String,
}

#[derive(Deserialize)]
struct DeleteTodo {
    todo: String,
}

fn render_html(todos: &[String]) -> String {
    let mut html = r#"<!DOCTYPE html>
<html lang="en">
<head><title>ToDo App</title></head>
<body>
<h1>ToDo App Benchmark</h1>
<form action="/create" method="post">
<input id="create-todo-field" type="text" name="todo" />
<input id="create-todo-button" type="submit" value="Submit" />
</form>
<ul id="todos">
"#.to_string();
    for todo in todos {
        html.push_str(&format!(r#"<li>{} <a id="delete-todo-link-{}" href="/delete?todo={}">Delete</a></li>
"#, todo, todo, todo));
    }
    html.push_str("</ul></body></html>");
    html
}

#[tokio::main]
async fn main() {
    let conn = Connection::open("todos.db").unwrap();
    conn.execute("CREATE TABLE IF NOT EXISTS todos (todo TEXT)", [])
        .unwrap();

    let state = AppState { db: Arc::new(Mutex::new(conn)) };

    let app = Router::new()
        .route("/", get(move |axum::extract::State(state): axum::extract::State<AppState>| {
            let todos: Vec<String> = {
                let conn = state.db.lock().unwrap();
                let mut stmt = conn.prepare("SELECT todo FROM todos").unwrap();
                let rows = stmt.query_map([], |row| row.get(0)).unwrap();
                rows.filter_map(|r| r.ok()).collect()
            };
            async move { Html(render_html(&todos)) }
        }))
        .route("/create", post(move |axum::extract::State(state): axum::extract::State<AppState>, Form(form): Form<CreateTodo>| {
            async move {
                if !form.todo.is_empty() {
                    let conn = state.db.lock().unwrap();
                    conn.prepare("INSERT INTO todos (todo) VALUES (?)")
                        .unwrap()
                        .execute([&form.todo])
                        .unwrap();
                }
                axum::response::Redirect::to("/")
            }
        }))
        .route("/delete", get(move |axum::extract::State(state): axum::extract::State<AppState>, axum::extract::Query(params): axum::extract::Query<DeleteTodo>| {
            async move {
                let conn = state.db.lock().unwrap();
                conn.prepare("DELETE FROM todos WHERE todo = ?")
                    .unwrap()
                    .execute([&params.todo])
                    .unwrap();
                axum::response::Redirect::to("/")
            }
        }))
        .nest_service("/assets", ServeDir::new("."))
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Server running at http://0.0.0.0:3000/");
    axum::serve(listener, app).await.unwrap();
}
