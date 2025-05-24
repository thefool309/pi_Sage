import { Request, Response } from "express";

import { Scan } from "../../db/models/Scan";
import { Host } from "../../db/models/Host";
import { Port } from "../../db/models/Port";

// TODO: expand scansControllers to return all hosts and ports as well

export async function listScans(req: Request, res: Response): Promise<any> {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 20;
  const scans = await Scan.findAll({
    attributes: ["id", "date", "host_up", "host_down"],
    order: [["date", "DESC"]],
    limit: perPage,
    offset: (page - 1) * perPage,
    include: [
      {
        model: Host,
        as: "hosts",
        include: [
          {
            model: Port,
            as: "ports",
          },
        ],
      },
    ],
  });
  return res.json(scans);
}

export async function getScan(req: Request, res: Response): Promise<any> {
  const scan = await Scan.findByPk(req.params.id, {
    attributes: ["id", "date", "host_up", "host_down"],
    include: [
      {
        model: Host,
        as: "hosts",
        include: [
          {
            model: Port,
            as: "ports",
          },
        ],
      },
    ],
  });
  return scan ? res.json(scan) : res.status(404).end();
}

export async function getLatest(req: Request, res: Response): Promise<any> {
  console.log("getLatest hit!");
  try {
    const latest = await Scan.findOne({
      attributes: ["id", "date", "host_up", "host_down"],
      order: [["date", "DESC"]],
      include: {
        model: Host,
        as: "hosts",
        include: [
          {
            model: Port,
            as: "ports",
          },
        ],
      },
    });
    if (!latest) {
      return res.status(404).json({ error: "No scans found" });
    }
    //const somePorts = await Port.findAll({ limit: 5 });
    //console.log(somePorts.map((p) => p.toJSON()));
    res.json(latest);
  } catch (err) {
    console.error(err);
  }
}
