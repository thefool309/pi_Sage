import { Request, Response } from "express";

import { Scan } from "../../db/models/Scan";

// TODO: expand scansControllers to return all hosts and ports as well

export async function listScans(req: Request, res: Response) {
  const page = +(req.query.page || 1);
  const perPage = +(req.query.page || 20);
  const scans = await Scan.findAll({
    attributes: ["id", "start_time", "hosts_up", "hosts_down"],
    order: [["start_time", "DESC"]],
    limit: perPage,
    offset: (page - 1) * perPage,
  });
  res.json(scans);
}

export async function getScan(req: Request, res: Response) {
  const scan = await Scan.findByPk(req.params.id, {
    attributes: ["id", "start_time", "hosts_up", "hosts_down"],
  });
  return scan ? res.json(scan) : res.status(404).end();
}

export async function getLatest(req: Request, res: Response) {
  const latest = await Scan.findOne({
    attributes: ["id", "start_time", "hosts_up", "hosts_down"],
    order: [["start_time", "DESC"]],
  });
  return res.json(latest);
}
