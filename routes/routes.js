const express = require('express');
const router = express.Router();
// const request = require('request');

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      MODELS IMPORTS                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////

const Img = require('../models/heroSectionImgs');
const Slogons = require('../models/slogons');
const Cards = require('../models/queSouteneonsNousCards');
const Benevoles = require('../models/benevoles');
const Events = require('../models/events');
const Members = require('../models/members');
const News = require('../models/news');
const Subscribers = require('../models/subscribers');
const Temoins = require('../models/temoins');
const Trophies = require('../models/trophies');
const nodemailer = require('nodemailer');






////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                                                                                //
//                                        GET ROUTES                                              //
//                                                                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////

// get HeroSechtionImgs 
router.get('/heroSectionImgs', function (req, res, next) {
    Img.find((err, imgs) => {
        res.json(imgs)
    })
})

// get Slogons
router.get('/slogons', function (req, res, next) {
    Slogons.find((err, slogons) => {
        res.json(slogons)
    })
})

// get queSoutenons nous Cards
router.get('/qstnCards', function (req, res, next) {
    Cards.find((err, cards) => {
        res.json(cards)
    })
})

// get Benevoles
router.get('/benevoles', function (req, res, next) {
    Benevoles.find((err, benevoles) => {
        res.json(benevoles)
    })
})

// get Benevole by id
router.get('/benevoles/:id', function (req, res, next) {
    Benevoles.find({
        _id: req.params.id
    }, (err, benevoles) => {
        res.json(benevoles)
    })
})

// get Events
router.get('/events', function (req, res, next) {
    Events.find((err, events) => {
        res.json(events)
    })
})

// get events participants
router.get('/eventsParticipants/:id', function (req, res, next) {
    Events.find({
        _id: req.params.id
    }, (err, events) => {
        res.json(events[0].participants)
    })
})



// get Members
router.get('/members', function (req, res, next) {
    Members.find((err, members) => {
        res.json(members)
    })
})

// get News
router.get('/news', function (req, res, next) {
    News.find((err, news) => {
        res.json(news)
    })
})

// get Subscribers
router.get('/subscribers', function (req, res, next) {
    Subscribers.find((err, subscribers) => {
        res.json(subscribers)
    })
})

// get Temoins
router.get('/temoins', function (req, res, next) {
    Temoins.find((err, temoins) => {
        res.json(temoins)
    })
})

// get Trophies
router.get('/trophies', function (req, res, next) {
    Trophies.find((err, trophies) => {
        res.json(trophies)
    })
})






////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                                                                                //
//                                        POST ROUTES                                             //
//                                                                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////


// Add HeroSectionImg
router.post('/addHeroSectionImg', (req, res, next) => {
    let newImg = new Img({
        src: req.body.src,
        alt: req.body.alt
    })
    newImg.save((err, img) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!img) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "img added successfully",
                dataSent: img
            })
        }
    })
})

// Add SectionSlogons
router.post('/addSectionSlogon', (req, res, next) => {
    let newSlogon = new Slogons({
        section: req.body.section,
        slogons: req.body.slogons
    })
    newSlogon.save((err, slogon) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!slogon) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "slogonsSection added successfully",
                dataSent: slogon
            })
        }
    })
})

// Add Slogons to a section
router.post('/addSlogonToSection/:id', (req, res, next) => {
    Slogons.updateOne({
        _id: req.params.id
    }, {
        $push: {
            slogons: {
                en: req.body.en,
                fr: req.body.fr
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: req.body.en + " and " + req.body.fr + " are added successfully to section with id: " + req.params.id,
                status: result
            })
        }
    })
})

// add benevole
router.post('/addBenevoles', (req, res, next) => {
    let newBenevole = new Benevoles({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        email: req.body.email,
        nom_etablissement: req.body.nom_etablissement,
        telephone: req.body.telephone,
        nom_association: req.body.nom_association,
        exp_domaine_association: req.body.exp_domaine_association
    })
    newBenevole.save((err, benevole) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!benevole) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "slogonsSection added successfully",
                dataSent: benevole
            })
        }
    })
})

// add Event 
router.post('/addEvent', (req, res, next) => {
    let newEvent = new Events({
        date: new Date(req.body.date),
        title: {
            en: req.body.title.en,
            fr: req.body.title.fr
        },
        description: {
            en: req.body.description.en,
            fr: req.body.description.fr
        }
    })
    newEvent.save((err, event) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!event) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "event added successfully",
                dataSent: event
            })
        }
    })
})

// add participant to an event
router.post('/addParticipant/:id', (req, res, next) => {
    var id = req.params.id
    Events.updateOne({
        _id: id
    }, {
        $push: {
            participants: {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                tel: req.body.tel
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: req.body.name + " " + req.body.lastname + " is participant now to the event with id: " + req.params.id,
                status: result
            })
        }
    })
})

// add Subscriber
router.post('/addSubscriber', (req, res, next) => {
    let newSubscriber = new Subscribers({
        email: req.body.email,
    })

    newSubscriber.save((err, subscriber) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!subscriber) {
            res.status(404).end();
        } else {
            res.status(200).json(err)
        }
    })
})

// add Aljisr Memeber

router.post('/addAljisrMember', (req, res, next) => {
    let newMember = new Members({
        name: {
            en: req.body.name.en,
            fr: req.body.name.fr
        },
        lastname: {
            en: req.body.lastname.en,
            fr: req.body.lastname.fr
        },
        quote: {
            en: req.body.quote.en,
            fr: req.body.quote.fr
        },
        status: {
            en: req.body.status.en,
            fr: req.body.status.fr
        },
        img: {
            src: req.body.img.src,
            alt: req.body.img.alt
        }
    })
    newMember.save((err, member) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!member) {
            res.status(404).end();
        } else {
            res.status(200).json(member)
        }
    })
})

// add news 
router.post('/addNews', (req, res, next) => {
    let newNew = new News({
        title: {
            en: req.body.title.en,
            fr: req.body.title.fr
        },
        description: {
            en: req.body.description.en,
            fr: req.body.description.fr
        },
        img: {
            src: req.body.img.src,
            alt: req.body.img.alt,
        },
        auth: req.body.auth
    })
    newNew.save((err, New) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!New) {
            res.status(404).end();
        } else {
            res.status(200).json(New)
        }
    })
})


// add Temoin
router.post('/addTemoin', (req, res, next) => {
    let newTemoin = new Temoins({
        src: req.body.src,
        alt: req.body.alt,
        testimoin: {
            en: req.body.testimoin.en,
            fr: req.body.testimoin.fr
        },
        profile: {
            en: req.body.profile.en,
            fr: req.body.profile.fr
        },
        status: {
            en: req.body.status.en,
            fr: req.body.status.fr
        }
    })
    newTemoin.save((err, temoin) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!temoin) {
            res.status(404).end();
        } else {
            res.status(200).json(temoin)
        }
    })
})



// add Trophie
router.post('/addTrophie', (req, res, next) => {
    let newTrophie = new Trophies({
        title: {
            en: req.body.title.en,
            fr: req.body.title.fr
        },
        description: {
            en: req.body.description.en,
            fr: req.body.description.fr
        },
        img: {
            src: req.body.img.src,
            alt: req.body.img.alt
        }
    })
    newTrophie.save((err, trophie) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!trophie) {
            res.status(404).end();
        } else {
            res.status(200).json(trophie)
        }
    })
})

// send mail
router.post('/sendSubscribtionMail', (req, res) => {
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed'
        }]
    };

    const postData = JSON.stringify(data);
    const options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/0fcf9c9986',
        method: 'POST',
        headers: {
            Authorization: 'auth 76707fce793ba70c931443de031356ef-us4'
        },
        body: postData
    };

    request(options, (err, response, body) => {
        if (err) {
            res.send(err);
        } else {
            if (response.statusCode === 200) {
                console.log('done')
            } else {
                res.send(err);
            }
        }
    });

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: "smt.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: "aljisrassocia@gmail.com",
            pass: "Aljisr@2019"
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: '"Aljisr" aljisrassocia@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Thank you for your subscribing', // Subject line
        html: '<p>Thank you for your subscribing to our news letter </p>' // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.send(err)
        } else {
            res.send(info)
        }
    });
})

// send participationMail
router.post('/sendParticipationMail', (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: "smt.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: "aljisrassocia@gmail.com",
            pass: "Aljisr@2019"
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: '"Aljisr" aljisrassocia@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Merci pour votre participation', // Subject line
        html: `<p>Merci pour votre participation à l'évenement: ${req.body.event}</p>
                <p>Vous êtes le bienvenue le ${req.body.date}` // plain text body,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.send(err)
        } else {
            res.send(info)
        }
    });
})

// send contact mail
router.post('/sendContactMail', (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: "smt.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: "aljisrassocia@gmail.com",
            pass: "Aljisr@2019"
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: `${req.body.nom} ${req.body.prenom} ${req.body.email}`, // sender address
        to: "aljisrassocia@gmail.com", // list of receivers
        subject: 'Conact Message', // Subject line
        html: `<p>${req.body.message}</p>` // plain text body,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            res.send(err)
        } else {
            res.send(info)
        }
    });
})


// add Trophie




// add card
// router.post('/addcards', (req, res, next) => {
//     let newCard = new Cards({
//         title: {
//             en: req.body.title.en,
//             fr: req.body.title.fr
//         },
//         description: {
//             en: req.body.description.en,
//             fr: req.body.description.fr
//         },
//         icon: req.body.icon,
//         active:req.body.active ,
//         hoverId:req.body.hoverId ,
//     })
//     newCard.save((err, slogon) => {
//         if (err) {
//             res.status(500).send(err)
//         }
//         if (!slogon) {
//             res.status(404).end();
//         } else {
//             res.status(200).json({
//                 msg: "card added successfully",
//                 dataSent: slogon
//             })
//         }
//     })
// })





////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                                                                                //
//                                        put ROUTES                                              //
//                                                                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////

// Modify a heroSectionImg
router.put('/modifyHeroSectionImg/:id', (req, res, next) => {
    Img.updateOne({
        _id: req.params.id
    }, {
        $set: {
            src: req.body.src,
            alt: req.body.alt
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "img modified successfully",
                status: result
            })
        }
    })
})

// Modify a Slogon of a section
router.put('/modifySlogon/:sectionid/:slogonid', (req, res, next) => {
    Slogons.updateOne({
        _id: req.params.sectionid,
        "slogons._id": req.params.slogonid
    }, {
        $set: {
            "slogons.$": {
                en: req.body.en,
                fr: req.body.fr
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: req.body.en + " and " + req.body.fr + " are modifed successfully to section with id: " + req.params.sectionid,
                status: result
            })
        }
    })
})

// modify QueSoutenonsNous Cards
router.put('/modifyQstnCards/:id', (req, res, next) => {
    Cards.updateOne({
        _id: req.params.id
    }, {
        $set: {
            title: {
                en: req.body.title.en,
                fr: req.body.title.fr
            },
            description: {
                en: req.body.description.en,
                fr: req.body.description.fr
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "Card modified successfully",
                status: result
            })
        }
    })
})

// Modify Benevole infos
router.put('/modifyBenevole/:id', (req, res, next) => {
    Benevoles.updateOne({
        _id: req.params.id
    }, {
        $set: {
            nom: req.body.nom,
            prenom: req.body.prenom,
            adresse: req.body.adresse,
            email: req.body.email,
            nom_etablissement: req.body.nom_etablissement,
            telephone: req.body.telephone,
            nom_association: req.body.nom_association,
            exp_domaine_association: req.body.exp_domaine_association
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "Benevole modified successfully",
                status: result
            })
        }
    })
})

// Modify Event 
router.put('/modifyEvent/:id', (req, res, next) => {
    Events.updateOne({
        _id: req.params.id
    }, {
        $set: {
            date: new Date(req.body.date),
            title: {
                en: req.body.title.en,
                fr: req.body.title.fr
            },
            description: {
                en: req.body.description.en,
                fr: req.body.description.fr
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "Event modified successfully",
                status: result
            })
        }
    })
})

// Modify Member 
router.put('/modifyMember/:id', (req, res, next) => {
    Members.updateOne({
        _id: req.params.id
    }, {
        $set: {
            name: {
                en: req.body.name.en,
                fr: req.body.name.fr
            },
            lastname: {
                en: req.body.lastname.en,
                fr: req.body.lastname.fr
            },
            quote: {
                en: req.body.quote.en,
                fr: req.body.quote.fr
            },
            status: {
                en: req.body.status.en,
                fr: req.body.status.fr
            },
            img: {
                src: req.body.img.src,
                alt: req.body.img.alt
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "Member modified successfully",
                status: result
            })
        }
    })
})

// Modify News
router.put('/modifyNew/:id', (req, res, next) => {
    News.updateOne({
        _id: req.params.id
    }, {
        $set: {
            title: {
                en: req.body.title.en,
                fr: req.body.title.fr
            },
            description: {
                en: req.body.description.en,
                fr: req.body.description.fr
            },
            img: {
                src: req.body.img.src,
                alt: req.body.img.alt,
            },
            auth: req.body.auth
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "New modified successfully",
                status: result
            })
        }
    })
})


// Modify Temoin
router.put('/modifyTemoin/:id', (req, res, next) => {
    Temoins.updateOne({
        _id: req.params.id
    }, {
        $set: {

            src: req.body.src,
            alt: req.body.alt,
            testimoin: {
                en: req.body.testimoin.en,
                fr: req.body.testimoin.fr
            },
            profile: {
                en: req.body.profile.en,
                fr: req.body.profile.fr
            },
            status: {
                en: req.body.status.en,
                fr: req.body.status.fr
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "Temoin modified successfully",
                status: result
            })
        }
    })
})


// Modify Trophie
router.put('/modifyTrophie/:id', (req, res, next) => {
    Trophies.updateOne({
        _id: req.params.id
    }, {
        $set: {
            title: {
                en: req.body.title.en,
                fr: req.body.title.fr
            },
            description: {
                en: req.body.description.en,
                fr: req.body.description.fr
            },
            img: {
                src: req.body.img.src,
                alt: req.body.img.alt
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        if (!result) {
            res.status(404).end();
        } else {
            res.status(200).json({
                msg: "Trophie modified successfully",
                status: result
            })
        }
    })
})






////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                                                                                //
//                                        DELETE ROUTES                                           //
//                                                                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////

// delete a heroSectionImgs
router.delete('/deleteHeroSectionImg/:id', (req, res, next) => {
    Img.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "img deleted successfully",
                status: result
            });
        }
    })
});

// delete benevole
router.delete('/deletebenevole/:id', (req, res, next) => {
    Benevoles.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "benevole deleted successfully",
                status: result
            });
        }
    })
});

// delete aljisr memebre
router.delete('/deleteMember/:id', (req, res, next) => {
    Members.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "member deleted successfully",
                status: result
            });
        }
    })
});


// delete new 
router.delete('/deleteNew/:id', (req, res, next) => {
    News.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "new deleted successfully",
                status: result
            });
        }
    })
});

// delete Temoin
router.delete('/deleteTemoin/:id', (req, res, next) => {
    Temoins.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "temoin deleted successfully",
                status: result
            });
        }
    })
});

// delete Trophie
router.delete('/deleteTrophie/:id', (req, res, next) => {
    Trophies.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "trophie deleted successfully",
                status: result
            });
        }
    })
});



// delete a slogon from  section
router.delete('/deleteSlogon/:sectionid/:slogonid', (req, res, next) => {
    Slogons.updateOne({
        _id: req.params.sectionid,
        "slogons._id": req.params.slogonid
    }, {
        $pull: {
            "slogons": {
                _id: req.params.slogonid
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "slogon deleted successfully",
                status: result
            });
        }
    })
});

// delete event 
router.delete('/deleteEvent/:id', (req, res, next) => {
    Events.remove({
        _id: req.params.id
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "event deleted successfully",
                status: result
            });
        }
    })
});

// delete participant of an event 
router.delete('/deleteEventParticipant/:eventid/:participantid', (req, res, next) => {
    Events.updateOne({
        _id: req.params.eventid,
        "participants._id": req.params.participantid
    }, {
        $pull: {
            "participants": {
                _id: req.params.participantid
            }
        }
    }, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                msg: "participant deleted successfully",
                status: result
            });
        }
    })
});



module.exports = router;