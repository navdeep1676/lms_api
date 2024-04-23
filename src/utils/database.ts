// src/utils/database.ts
import { Document } from "mongoose";

export const findById = async <T extends Document>(model: any, id: string) => {
  return model.findById(id);
};
export const findBySlug = async <T extends Document>(
  model: any,
  slug: string
) => {
  return model.findById(slug);
};

export const findOneAndUpdate = async <T extends Document>(
  model: any,
  conditions: any,
  update: any,
  options: any
) => {
  return model.findOneAndUpdate(conditions, update, options);
};
