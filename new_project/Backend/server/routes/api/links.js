const express = require("express");
const db = require("../../model/dblink");

const router = express.Router();

//Get all links

router.get("/", async (req,res) => {
    let dbresponse = await db.getLinks()
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dbresponse))
})

router.get("/off=:off/lim=:lim", async (req,res) => {
    var offset = req.params.off;
    var limit = req.params.lim;
    let dbresponse = await db.getLinksOffsetLimited(offset,limit)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dbresponse))
})

router.post("/", async (req,res) => {
    var link = {
        from :req.body.from,
        to: req.body.to,
        domain: req.body.domain,
        status: req.body.status,
        comment: req.body.comment
    }

    await db.insertOneLink(link);
    res.status(201).send();
})

//GET SPECFIC DOMAIN LIMIT AND OFFSET --add Injection sec

router.get("/off=:off/lim=:lim/domain=:domain", async (req,res) => {
    var offset = req.params.off;
    var limit = req.params.lim;
    var domain = req.params.domain;
    let dbresponse = await db.getLinksOffsetLimitedDomain(offset,limit,domain);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dbresponse))
})

//GET BY ID

router.get("/id=:id", async (req,res) => {
    var id = req.params.id;
    let dbresponse = await db.getLinkById(id);
    res.setHeader('Content-Type', 'application/json');
    res.end("[" + JSON.stringify(dbresponse) + "]")
})



//Delete Link

router.delete("/id=:id", async (req,res) => {
    var id = req.params.id;
    await db.deleteOneLink(id);
    res.status(204).send;
    res.end()
})

//Update Link

router.put("/id=:id", async (req,res) => {
    var id = req.params.id;

    var link = {
        from :req.body.from,
        to: req.body.to,
        domain: req.body.domain,
        status: req.body.status,
        comment: req.body.comment
    }

    await db.updateOneLink(id,link);
    let dbresponse = db.getLinkById(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dbresponse));
    
})









module.exports = router;
