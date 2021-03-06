import {FilterValuesType} from "../redux/reducers/todolist-reducer/todolists-reducer";
import {TaskStatuses, TaskType} from "../api";

export const tasksForRender = (tasks: TaskType[], filterTdl: FilterValuesType) => {
    if (filterTdl === "active") {
        return tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filterTdl === "completed") {
        return tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return tasks
}