import { NextFunction, Request, Response } from 'express';
import * as candidateService from '../services/candidateService';
import { findById } from '../services/worldcupService';
import s3 from '../config/s3';

const candidateController = {
  remove: async (request: Request, response: Response, next: NextFunction) => {
    const { key } = request.params;
    await s3
      .deleteObject({
        Bucket: process.env.NCP_BUCKET_NAME,
        Key: key,
      })
      .promise();
    const sizes = [{ width: 120, height: 120 }];
    await Promise.all(
      sizes.map(({ width, height }) =>
        s3
          .deleteObject({
            Bucket: `image-w${width}h${height}`,
            Key: `${key}.webp`,
          })
          .promise(),
      ),
    );
    await candidateService.removeByKey(key);
    response.json({ result: 'success' });
  },

  patchCandidate: async (request: Request, response: Response, next: NextFunction) => {
    const { key } = request.params;
    const { newKey, name } = request.body;
    await candidateService.patchCandidate(key, name, newKey);
    response.json({ result: 'success' });
  },

  createCandidates: async (request: Request, response: Response, next: NextFunction) => {
    const { worldcupId, newImgInfos } = request.body;
    const worldcup = await findById(worldcupId);
    await candidateService.save(newImgInfos, worldcup);
    response.json({ result: 'success' });
  },
};

export default candidateController;
