const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const DeveloperProfile = require('../models/developerProfile');

router.get('/', (req, res, next) => {
    DeveloperProfile.find().exec().then(docs => {
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
    const developerProfile = new DeveloperProfile({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.body.image,
        bio: req.body.bio,
        email: req.body.email,
        socials: req.body.socials
    });
    developerProfile.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /developerProfile',
        createddeveloperProfile: developerProfile
    });
});

router.get('/:developerProfileId', (req, res, next) => {
    const id = req.params.developerProfileId;
    DeveloperProfile.findById(id).exec().then(doc => {
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

router.patch('/:developerProfileId', (req, res, next) => {
    const id = req.params.developerProfileId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    DeveloperProfile.update({
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

router.delete('/:developerProfileId', (req, res, next) => {
    const id = req.params.developerProfileId;
    DeveloperProfile.remove({
        _id: id
    }).exec().then(result => res.status(200).json(result)).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;