const mysql = require('mysql');
const { connect } = require('../routes/api/links');

class db{

    static con = null

    static from = "/about"
    static to = "/company/rittal/docs/about"   
    static domain = "rittal.de"

    static getConnection(){

        this.con = mysql.createConnection({
            host: "localhost",
            user: "nxdash",
            password: "nxdash",
            database: "nxdash"
        });

        this.con.connect((err) =>{

            if(err){
                console.log(err.message);
                console.log("Could not connect database");
            }else{
                console.log("Database connected successfully")
            }

            

        })

    }

    //GET ALL
    static getLinks(){
        return new Promise((resolve,reject) => {
        this.con.query("SELECT * FROM links", (err,result,fields) => {
            
            if(err){
                throw err;
            } 
            resolve(result)   
        })  
        })        
    }

    //INSERT ONE

    static insertOneLink(link){
        return new Promise((resolve,reject) => {

            var pad = function(num) { return ('00'+num).slice(-2) };
            var date;
            date = new Date();
            date = date.getUTCFullYear()         + '-' +
                    pad(date.getUTCMonth() + 1)  + '-' +
                    pad(date.getUTCDate())       + ' ' +
                    pad(date.getUTCHours())      + ':' +
                    pad(date.getUTCMinutes())    + ':' +
                    pad(date.getUTCSeconds());
            
            let efrom = this.con.escape(link.from)
            let eto = this.con.escape(link.to)
            let edomain = this.con.escape(link.domain)
            
            this.con.query
            (
                `INSERT INTO links (\`from\`,\`to\`,\`domain\`,\`created\`) VALUES (${efrom},${eto},${edomain},'${date}')`
            )
            resolve(); 
        })
    }

    //GET ALL DOMAIN LIMIT AND OFFSET --add Injection Sec
    static getLinksOffsetLimited(offset,limit){
        return new Promise((resolve,reject) => {
        this.con.query(`SELECT \`from\`,\`to\`,\`domain\` FROM \`links\` LIMIT ${offset}, ${limit}`, (err,result,fields) => {
            
            if(err){
                throw err;
            } 
            resolve(result)   
        })  
        })        
    }

    //GET SPECFIC DOMAIN LIMIT AND OFFSET --add Injection Sec

    static getLinksOffsetLimitedDomain(offset,limit,domain){
        return new Promise((resolve,reject) => {
        this.con.query(`SELECT \`from\`,\`to\`,\`domain\` FROM \`links\` WHERE \`domain\`='${domain}' LIMIT ${offset}, ${limit}`, (err,result,fields) => {
            
            if(err){
                throw err;
            } 
            resolve(result)   
        })  
        })        
    }

    //GET BY ID

    static getLinkById(id){
        return new Promise((resolve,reject) => {
        this.con.query(`SELECT \`from\`,\`to\`,\`domain\` FROM \`links\` WHERE \`id\`='${id}'`, (err,result,fields) => {
            
            if(err){
                throw err;
            } 
            resolve(result[0])   
        })  
        })        
    }

    //UPDATE ENTRY

    static updateOneLink(id,link){
        return new Promise(async (resolve,reject) => {



            var oldLink = await this.getLinkById(id);

            var newfrom = "'" + oldLink.from + "'";
            var newto = "'" + oldLink.to + "'";
            var newdomain ="'" + oldLink.domain + "'";

            if(link.from != null){
                var newfrom = this.con.escape(link.from); 
            }
            if(link.to != null){
                var newto = this.con.escape(link.to);
            }
            if(link.domain != null){
                var newdomain = this.con.escape(link.domain);
            }

            // UPDATE `nxdash`.`links` SET `from` = '/hi', `to` = '/rittal/database/hi', `domain` = 'loh-services.com' WHERE (`id` = '7');
            this.con.query
            (
                `UPDATE links SET \`from\` = ${newfrom} , \`to\` = ${newto} , \`domain\` = ${newdomain} WHERE (\`id\` = ${id})` 
            )
            resolve(); 
        })
    }



    //DELETE ENTRY DELETE FROM `nxdash`.`links` WHERE (`id` = '9');

    static deleteOneLink(id){
        return new Promise((resolve,reject) => {

            this.con.query
            (
                `DELETE FROM links WHERE (\`id\` = ${id})` 
            )
            resolve(); 
        })
    }



}

module.exports = db;