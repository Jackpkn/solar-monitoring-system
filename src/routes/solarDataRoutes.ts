// src/routes/solarDataRoutes.ts
import express, { NextFunction, Request, Response } from 'express';
import { addSolarData, getSolarData } from '../controllers/solarDataController';

const router = express.Router();
router.post('/solar', async (req: Request, res:Response, next: NextFunction):Promise<any> => {
  try {
    const response = await addSolarData(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

router.get('/solar/:id', async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
      const data = await getSolarData(req.params.id);
      if (!data) {
        return res.status(404).send({ message: 'Data not found' });
      }
      res.send(data);
    } catch (error) {
      next(error);
    }
  });

export default router;
