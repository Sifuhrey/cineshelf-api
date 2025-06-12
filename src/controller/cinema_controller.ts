import { Request, Response } from "express";
import Cinema from "../models/Cinema";
import ex from 'express';
import { Op } from 'sequelize';

const CinemaController = {
  index: async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId;
      const cinema = await Cinema.findAll({
        where: {
          userId: userId,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "success",
        cinema: cinema,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetcing cinema: ${error.message}`,
      });
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      const cinemaId = req.params.id;
      const cinema = await Cinema.findByPk(cinemaId);

      if (cinema == null) {
        return res.status(404).json({
          status: 404,
          message: "Cinema not found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "success",
        cinema: cinema,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error fetcing cinema: ${error.message}`,
      });
    }
  },
  store: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Image is required",
        });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;

      const cinema = await Cinema.create({
        ...req.body,
        imageUrl: imageUrl,
      });

      return res.status(201).json({
        status: 201,
        message: "Cinema created successfully",
        cinema: cinema,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 200,
        message: `Error storing cinema: ${error.message}`,
      });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const cinemaId = req.params.id;
      const cinema = await Cinema.findByPk(cinemaId);
      if (cinema == null) {
        return res.status(404).json({
          status: 404,
          message: "Cinema not found",
        });
      }

      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const imageUrl = `${baseUrl}/public/images/${req.file.filename}`;
        req.body.imageUrl = imageUrl;
      }

      await cinema.update(req.body);

      return res.status(200).json({
        status: 200,
        message: "Cinema updated successfully",
        cinema: cinema,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: `Error updating cinema: ${error.message}`,
      });
    }
  },
  destroy: async (req: Request, res: Response) => {
    try {
      const cinemaId = req.params.id;
      const cinema = await Cinema.findByPk(cinemaId);
      if (cinema == null) {
        return res.status(404).json({
          status: 404,
          message: "Cinema not found",
        });
      }
      await cinema.destroy();
      return res.status(200).json({
        status: 200,
        message: "Cinema deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 200,
        message: `Error deleting cinema: ${error.message}`,
      });
    }
  },
}

export default CinemaController;

