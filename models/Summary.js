const db=require('../util/database');
module.exports=class Summary{
    constructor(namesummary){
        this.namesummary=namesummary;
    }
    save(){
        return db.execute('insert into summary (`namesummary`) values (?)',[this.namesummary]); 
    }
}
