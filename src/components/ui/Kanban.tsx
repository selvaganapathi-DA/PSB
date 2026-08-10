import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Plus, Edit2, Trash2 } from "lucide-react";
import StatusChip from "./StatusChip";

interface KanbanTask {
  id: string;
  title: string;
  subtitle?: string;
  priority?: "Low" | "Medium" | "High" | "Urgent";
  dueDate?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

interface KanbanProps {
  initialColumns: KanbanColumn[];
  onTaskMove?: (taskId: string, fromColId: string, toColId: string) => void;
  onAddTask?: (colId: string) => void;
  onEditTask?: (taskId: string, colId: string) => void;
  onDeleteTask?: (taskId: string, colId: string) => void;
}

export function Kanban({ initialColumns, onTaskMove, onAddTask, onEditTask, onDeleteTask }: KanbanProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [draggingFromColId, setDraggingFromColId] = useState<string | null>(null);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const handleDragStart = (e: React.DragEvent, taskId: string, fromColId: string) => {
    setDraggingTaskId(taskId);
    setDraggingFromColId(fromColId);
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toColId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain") || draggingTaskId;
    const fromColId = draggingFromColId;

    if (!taskId || !fromColId || fromColId === toColId) return;

    // Find the task and move it
    let movedTask: KanbanTask | null = null;
    const newColumns = columns.map((col) => {
      if (col.id === fromColId) {
        movedTask = col.tasks.find((t) => t.id === taskId) || null;
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
        };
      }
      return col;
    });

    if (movedTask) {
      const updatedColumns = newColumns.map((col) => {
        if (col.id === toColId && movedTask) {
          return {
            ...col,
            tasks: [...col.tasks, movedTask],
          };
        }
        return col;
      });
      setColumns(updatedColumns);
      onTaskMove?.(taskId, fromColId, toColId);
    }

    setDraggingTaskId(null);
    setDraggingFromColId(null);
  };

  return (
    <div className="flex gap-5 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div
          key={col.id}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col.id)}
          className="flex flex-col w-80 flex-shrink-0 rounded-2xl bg-concrete-50/50 p-4 dark:bg-blueprint-900/40"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[13.5px] font-semibold text-concrete-900 dark:text-blueprint-100">
                {col.title}
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-concrete-100 text-[10px] font-bold text-concrete-600 dark:bg-blueprint-800 dark:text-blueprint-300">
                {col.tasks.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {onAddTask && (
                <button
                  onClick={() => onAddTask(col.id)}
                  className="rounded-lg p-1 text-concrete-300 hover:bg-concrete-100 hover:text-concrete-600 dark:text-blueprint-400 dark:hover:bg-blueprint-800 dark:hover:text-blueprint-200"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Column Tasks */}
          <div className="flex flex-col gap-3 min-h-[300px] overflow-y-auto pr-1">
            {col.tasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id, col.id)}
                className="group relative flex flex-col rounded-xl border border-concrete-100 bg-white p-4 shadow-card hover:border-signal-orange/30 transition-all dark:border-white/5 dark:bg-blueprint-850 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[13px] font-medium text-concrete-900 dark:text-blueprint-100 line-clamp-2">
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {onEditTask && (
                      <button
                        onClick={() => onEditTask(task.id, col.id)}
                        className="rounded p-1 text-concrete-600 hover:bg-concrete-100 hover:text-concrete-900 dark:text-blueprint-300 dark:hover:bg-blueprint-800 dark:hover:text-white"
                        title="Edit Task"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                    )}
                    {onDeleteTask && (
                      <button
                        onClick={() => onDeleteTask(task.id, col.id)}
                        className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                        title="Delete Task"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
                {task.subtitle && (
                  <p className="mt-1 text-[11.5px] text-concrete-300 dark:text-blueprint-400 line-clamp-1 text-left">
                    {task.subtitle}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                  {task.priority && (
                    <StatusChip label={task.priority} />
                  )}
                  {task.dueDate && (
                    <span className="text-[10px] text-concrete-300 dark:text-blueprint-400">
                      {task.dueDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
