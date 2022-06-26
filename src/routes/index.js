const { Router } = require('express');
const Movie = require('../models/Movie')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) => {
    try{
        const movies = await Movie.find()
        res.json(movies)
    }
    catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    try{
        const movie = await Movie.find({_id:id})
        res.json(movie)
    }
    catch(err){
        next(err)
    }
})

router.post('/', async (req, res) => {
    const movie = Movie(req.body)
    movie.slug = movie.title.replace(/[^a-zA-Z0-9 ]/g, "").replaceAll(" ", "-")
    await movie.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}))
})

router.put('/:id', async (req, res) => {
    const {title, image, director, plataforms} = req.body
    const {id} = req.params
    if(title){
        const slug = title.replace(/[^a-zA-Z0-9 ]/g, "").replaceAll(" ", "-")
        await Movie.updateOne({_id:id}, {$set: {title, slug}})
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}))
    }
    if(image){
        await Movie.updateOne({_id:id}, {$set: {image}})
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}))
    }
    if(director){
        await Movie.updateOne({_id:id}, {$set: {director}})
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}))
    }
    if(plataforms){
        await Movie.updateOne({_id:id}, {$set: {plataforms}})
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}))
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await Movie.remove({_id:id})
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}))
})

module.exports = router;
