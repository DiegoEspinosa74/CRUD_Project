import express from 'express';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

router.get('/clients', clientController.getClients);
router.post('/clients', clientController.addClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);
router.get('/clients/search', (req, res, next) => {
    console.log('Se recibió una petición GET en /clients/search');
    next();
  }, clientController.searchClients);

export default router;
