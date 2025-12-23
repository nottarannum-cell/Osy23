import express from 'express';
import { supabase } from '../supabaseClient.js';

export const router = express.Router();

function validateEmail(email) {
  return typeof email === 'string' && email.includes('@');
}

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!validateEmail(email) || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        error: true,
        message: 'Please provide a valid email and a password with at least 6 characters.',
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: true, message: error.message });
    }

    return res.status(201).json({
      error: false,
      message: 'Signup successful. Please check your email to confirm your account if required.',
      user: data.user,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!validateEmail(email) || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        error: true,
        message: 'Please provide a valid email and password.',
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: true, message: error.message });
    }

    // For now we just return a success message and basic user info.
    // You can handle access tokens or sessions in a more advanced flow later.
    return res.json({
      error: false,
      message: 'Login successful.',
      user: data.user,
    });
  } catch (err) {
    next(err);
  }
});
