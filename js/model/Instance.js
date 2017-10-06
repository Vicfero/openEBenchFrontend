function Instance(){
    this.type;
    this.docs;
    this.version;
    this.publication

    this.repo;


    this.construct = function(type,docs,version,publication,repo){
        this.setType(type)
        this.setDocs(docs);
        this.setVersion(version);
        this.setPublication(publication);
        this.setRepo(repo);

    }

    this.setType = function (type) {this.type = type;}
    this.setDocs = function (docs){this.docs = docs;}
    this.setVersion = function (version){this.version = version;}
    this.setPublication = function (publication){this.publication = publication;}

    this.setRepo= function (repo) {this.repo = repo;}


    this.getType = function () {return this.type;}
    this.getDocs = function () {return this.docs;}
    this.getVersion = function () {return this.version;}
    this.getPublication = function () {return this.publication;}

    this.getRepo = function () {return this.repo;}

}
