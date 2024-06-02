const List = require('../models/List');

exports.createList = async (req, res) => {
    const { name, isPublic } = req.body;
    try {
        const list = await List.create({
            user: req.user.id,
            name,
            isPublic,
        });
        res.status(201).json(list);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLists = async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id });
        res.json(lists);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getListById = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const list = await List.findById({_id:id});
        // console.log(list);
        if (list.isPublic || list.user.toString() === req.user.id) {
            res.json(list);
        } else {
           
            res.status(403).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error nako',});
    }
};

exports.addMovieToList = async (req, res) => {
    const { imdbID, title, year, poster, listid } = req.body;

    // console.log("Received list ID:", listid);
    
    try {
        const list = await List.findById(listid);

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        if (list.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const movie = {
            imdbID,
            title,
            year,
            poster
        };

        list.movies.push(movie);
        await list.save();
        res.json(list);
    } catch (err) {
        console.error("Error adding movie to list:", err);
        res.status(500).json({ message: 'Server error', err });
    }
};
