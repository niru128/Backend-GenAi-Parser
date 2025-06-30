import express from 'express';
import { getVisaRequirements, postVisaRequirements } from '../controllers/VisaController.js';
const router = express.Router();


router.post('/' , postVisaRequirements);  
router.get('/:country' , getVisaRequirements);
export default router;