```javascript
const boards = [
    board {
        id : "board_id",
        name : "board_name",
        writable : "board_write_permission",
        readable : "board_read_permission",
        lists : [
            list {
                id : "list_id",
                name : "list_name",
                todos : [
                    todo {
                        id : "todo",
                        order : "todo_order_in_list",
                        content : "todo_content",
                        addedBy : "user_id"
                    },
                    ...
                ]
            },
            ...
        ]
    },
    ...
]
```