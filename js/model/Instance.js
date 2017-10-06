function Instance(){
    this.type;
    this.docs;
    this.version;
    this.publication
    this.contact;
    this.repo;
    this.credits;

    this.construct(type,docs,version,publication,contact,repo,credits){
        this.setType(type)
        this.setDocs(docs);
        this.setVersion(version);
        this.setPublication(publication);
        this.setContact(contact);
        this.setRepo(repo);
        this.setCredits(credits);
    }

    this.setType = function (type) {this.type = type;}
    this.setDocs = function (docs){this.docs = docs;}
    this.setVersion = function (version){this.version = version;}
    this.setPublication = function (publication){this.publication = publication;}
    this.setContact = function (contact){this.contact = contact;}
    this.setRepo= function (repo) {this.repo = repo;}
    this.setCredits = function (credits) {this.credits = credits;}

    this.getType = function () {return this.type;}
    this.getDocs = function () {return this.docs;}
    this.getVersion = function () {return this.version;}
    this.getPublication = function () {return this.publication;}
    this.getContact = function () {return this.contact;}
    this.getRepo = function () {return this.repo;}
    this.getCredits = function () {return this.credits;}
}
