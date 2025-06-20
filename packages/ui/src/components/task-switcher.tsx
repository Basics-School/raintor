"use client";

import { useState } from "react";

const tasks = [
    {
        id: 1,
        name: "Portfolio",
        path: process.env.NODE_ENV === "production"
            ? "https://raintor-task-1.vercel.app"
            : "http://localhost:3001"
    },
    {
        id: 2,
        name: "Location Sharing",
        path: process.env.NODE_ENV === "production"
            ? "https://raintor-task-2-snowy.vercel.app"
            : "http://localhost:3002"
    },
    {
        id: 3,
        name: "User Feed",
        path: process.env.NODE_ENV === "production"
            ? "https://raintor-task-3-kohl.vercel.app"
            : "http://localhost:3003"
    },
];

export function TaskSwitcher() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="relative">
                {isOpen && (
                    <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[200px]">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                            Switch Tasks
                        </div>
                        {tasks.map((task) => (
                            <a
                                key={task.id}
                                href={task.path}
                                className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                            >
                                <span className="w-6 h-6 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center justify-center mr-3">
                                    {task.id}
                                </span>
                                {task.name}
                            </a>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                    aria-label="Switch between tasks"
                >
                    <svg
                        className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
