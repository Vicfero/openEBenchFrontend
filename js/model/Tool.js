function Tool(){
    this.name;
    this.desc;
    this.link;
    this.linkToBioTool;
    this.instanceArray=[];
    this.contact;
    this.credits;

    this.construct = function (name,desc,link,linkToBioTool,instance,contact,credits){
        this.setName(name);
        this.setDesc(desc);
        this.setLink(link);
        this.setLinkToBioTool(linkToBioTool);
        this.setInstance(instance);
        this.setContact(contact);
        this.setCredits(credits);
    }

    //Setters
    this.setName = function (name) {this.name = name;}
    this.setDesc = function (desc){this.desc = desc;}
    this.setLink = function (link){this.link = link;}
    this.setLinkToBioTool = function (linkToBioTool) {this.linkToBioTool = linkToBioTool;}
    this.setInstance = function (instance) {this.instanceArray.push(instance)}
    this.setContact = function (contact){this.contact = contact;}
    this.setCredits = function (credits) {this.credits = credits;}


    //Getters
    this.getName = function () {return this.name;}
    this.getDesc = function () {return this.desc;}
    this.getLink = function () {return this.link;}
    this.getLinkToBioTool = function () {return this.linkToBioTool;}
    this.getInstance = function () {return this.instanceArray;}
    this.getContact = function () {return this.contact;}
    this.getCredits = function () {return this.credits;}
}
