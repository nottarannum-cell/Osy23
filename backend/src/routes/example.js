import express from 'express';
import { supabase } from '../supabaseClient.js';

export const router = express.Router();

// Basic example hitting Supabase (adjust table/columns later)
router.get('/items', async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('items').select('*').limit(10);
    if (error) throw error;
    res.json({ items: data });
  } catch (err) {
    next(err);
  }
});
