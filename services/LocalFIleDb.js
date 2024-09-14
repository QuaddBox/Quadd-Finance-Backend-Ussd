const fs = require("node:fs");
const { LocalDbError } = require("../utils/error/LocalDbError");

const LocalFileDb = function (collection,dbPath) {
    this.dbPath = dbPath || "./database.json";
    try {
        const res = fs.readFileSync(dbPath || "./database.json").toString();
        this.db = JSON.parse(res);
        this.collection = collection;
    }catch (error) {
        this.db = null;
    }
    this.getAll = function (query=null) {
        try {
            if(this.db === null) {
                throw LocalDbError("Local DB Error","Could not fetch local DB")
            }
            const queryRes =  this.db[this.collection].filter((document)=>{
                if(query === null) return true;
                return Object.keys(query).every(key => {
                    return document[key] === query[key];
                })
            });
            return {
                data:queryRes,
                error:null,
            };
        } catch (error) {
            return {
                data:null,
                error:{
                    error_code:error.name,
                    error_message:error.message
                }
            }
        }
    }
    this.getOne = function (query) {
        try {
            if(this.db === null) {
                throw LocalDbError("Local DB Error","Could not fetch local DB")
            }
            const data =  this.db[this.collection].find(document=>{
                return Object.keys(query).every(key => {
                    return document[key].includes(query[key]);
                })
            });
            return {
                data,
                error:null
            }
        } catch (error) {
            return {
                data:null,
                error:{
                    error_code:error.name,
                    error_message:error.message
                }
            }
        }
    }
    this.addOne = function (newData) {
        try {
            if(this.db === null) {
                throw LocalDbError("Local DB Error","Could not fetch local DB")
            }
            const snapshot = this.db[this.collection]
            const updatedData = [
                ...snapshot,
                newData,
            ]
            const updatedDB = JSON.stringify({
                ...this.db,
                [this.collection]: updatedData,
            },null,"\t")

            fs.writeFileSync(this.dbPath, updatedDB)
            return {
                data,
                error:null
            }
        } catch (error) {
            return {
                data:null,
                error:{
                    error_code:error.name,
                    error_message:error.message
                }
            }
        }
    }
}

module.exports = LocalFileDb;