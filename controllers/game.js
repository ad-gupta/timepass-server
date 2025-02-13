import Game from "../models/game.js";

export const addGame = async (req, res) => {
    try {
        const newGame = await Game.create(req.body);
        res.status(201).json({newGame, message: "Game added successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const fetchGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGame) return res.status(404).json({ error: 'Game not found' });
        res.status(200).json({data: updateGame, message: "Game Updated successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteGame = async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) return res.status(404).json({ error: 'Game not found' });
        res.json(deletedGame);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fetchAllGames = async (req, res) => {
    try {
        const games = await Game.find({});
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}