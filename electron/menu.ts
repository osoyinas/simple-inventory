import { executeQuery } from "../src/models/database";
import fs = require('fs');

export const menuTemplate = [
    {
        label: "DEV",
        submenu: [
            {
                label: "Insertar datos de ejemplo",
                click: ()=>{
                    const sqlFile = fs.readFileSync("./InsertSql.sql", 'utf8');
                    executeQuery(sqlFile)
                },
            }
        ],
    }
]