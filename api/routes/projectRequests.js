const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ProjectRequest = require('../models/projectRequest');

router.get('/', (req, res, next) => {
    ProjectRequest.find().exec().then(docs => {
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
    const projectRequest = new ProjectRequest({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        submittedBy: req.body.submittedBy,
        content: req.body.content
    });
    projectRequest.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /projectRequest',
        createdprojectRequest: projectRequest
    });
});

router.get('/:projectRequestId', (req, res, next) => {
    const id = req.params.projectRequestId;
    ProjectRequest.findById(id).exec().then(doc => {
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

router.patch('/:projectRequestId', (req, res, next) => {
    const id = req.params.projectRequestId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ProjectRequest.update({
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

router.delete('/:projectRequestId', (req, res, next) => {
    const id = req.params.projectRequestId;
    ProjectRequest.remove({
        _id: id
    }).exec().then(result => res.status(200).json(result)).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;