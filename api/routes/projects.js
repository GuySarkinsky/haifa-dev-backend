const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/project');

router.get('/', (req, res, next) => {
    Project.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        tags: req.body.tags,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        image: req.body.image
    });
    project.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /project',
        createdproject: project
    });
});

router.get('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id).exec().then(doc => {
        console.log("Frome database:", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'No valid entry for provided ID'
            });
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Project.update({
        _id: id
    }, {
        $set: updateOps

    }).exec().then(result => {
        console.log(result)
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.remove({
        _id: id
    }).exec().then(result => res.status(200).json(result)).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;