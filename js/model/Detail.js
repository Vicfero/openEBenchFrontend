function Detail(){
    this.name;
    this.desc;
    this.link;
    this.linkToBioTool;


    this.construct = function (name,desc,link,linkToBioTool){
        this.setName(name);
        this.setDesc(desc);
        this.setLink(link);
        this.setLinkToBioTool(linkToBioTool);

    }

    //Setters
    this.setName = function (name) {this.name = name;}
    this.setDesc = function (desc){this.desc = desc;}
    this.setLink = function (link){this.link = link;}
    this.setLinkToBioTool = function (linkToBioTool) {this.linkToBioTool = linkToBioTool;}


    //Getters
    this.getName = function () {return this.name;}
    this.getDesc = function () {return this.desc;}
    this.getLink = function () {return this.link;}
    this.getLinkToBioTool = function () {return this.linkToBioTool;}

}
