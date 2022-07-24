import { Request, Response } from "express";

import { pool } from "../db/db";

export const getAllTasks = async (req: authRequest, res: Response) => {
  const { id, isAdmin } = req.user;
  let query = "SELECT * FROM `tasks` WHERE `userId`=:id";
  if (isAdmin) query = "SELECT * FROM `tasks`";

  const [tasks] = (await pool.execute(query, {
    id,
  })) as [TaskTypes[], FieldPacket[]];

  res.json({ tasks });
};
