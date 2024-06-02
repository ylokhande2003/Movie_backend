exports.searchMovies = async (req, res) => {
    const { query } = req.query;
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
        const data = await response.json();
        res.json(data.Search);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
