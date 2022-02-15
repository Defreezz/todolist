import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../Common/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../api/api";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";


type TaskItemType = {
    todoListID:string
    task:TaskType
    removeTask: (todolistID: string,taskID: string) => void
    renameTask: (taskID: string, todolistID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string,taskID: string, status: TaskStatuses,title:string) => void
}

export const TaskItem = React.memo (({
                             task,
                             removeTask,
                             renameTask,
                             changeTaskStatus,
                             todoListID,
                         }: TaskItemType) => {

    const renameTaskHandler = useCallback ((newTitle: string) => {
        renameTask(task.id, todoListID, newTitle)
    },[task.id, todoListID,renameTask])

    const onChangeStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        const isDoneValue = e.currentTarget.checked
        changeTaskStatus(
            todoListID,task.id, isDoneValue?TaskStatuses.Completed:TaskStatuses.New,task.title
            )

    },[task.id, todoListID,changeTaskStatus])

    const removeTaskHandler = useCallback (() => {
        removeTask(todoListID,task.id )
    },[task.id, todoListID,removeTask])


    return (
        <ListItem key={task.id}>
            <div>
            <Checkbox
                size={"small"}
                checked={!!task.status}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan
                renameItem={renameTaskHandler}
                title={task.title}/>
            </div>
            <IconButton size={"small"} onClick={removeTaskHandler}><Delete/></IconButton>
        </ListItem>)
}
)