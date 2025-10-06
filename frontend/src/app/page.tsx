// app/page.tsx
'use client'; // ブラウザで動くコンポーネントであることを示すおまじない

import { useState, useEffect, FormEvent } from 'react';

// Todoアイテムの型定義
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = 'http://localhost:3001/todos'; // バックエンドのURL

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // 最初にデータを取得する
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTodos(data);
  };

  // 新しいTodoを追加する処理
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodoTitle }),
    });
    setNewTodoTitle('');
    fetchTodos(); // リストを再取得して更新
  };

  // Todoの完了状態を切り替える処理
  const handleToggleComplete = async (todo: Todo) => {
    await fetch(`${API_URL}/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos(); // リストを再取得して更新
  };

  // Todoを削除する処理
  const handleDeleteTodo = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchTodos(); // リストを再取得して更新
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">TODO App</h1>

      {/* 新規TODO追加フォーム */}
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="新しいTODOを入力"
          className="flex-grow border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          追加
        </button>
      </form>

      {/* TODOリスト */}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border-b"
          >
            <span
              onClick={() => handleToggleComplete(todo)}
              className={`cursor-pointer ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}