import { Router } from "express";
import {addGame, fetchGame, updateGame, deleteGame, fetchAllGames} from "../controllers/game.js"

const router = Router();

router.post('/add', addGame)

router.route('/:id').get(fetchGame).put(updateGame).delete(deleteGame)

router.route('/').get(fetchAllGames)

export default router