function EdamDetail(){
    this.edamType;
    this.toolLabel;
    this.toolComment;
    this.formatLabel;
    this.formatComment;

    this.construct = function (edamType,toolLabel,toolComment,formatLabel,formatComment){
        this.setEdamType(edamType);
        this.setToolLabel(toolLabel);
        this.setToolComment(toolComment);
        this.setFormatLabel(formatLabel);
        this.setFormatComment(formatComment);
    }

    //Setters
    this.setEdamType = function (edamType) {this.edamType = edamType;}
    this.setToolLabel = function (toolLabel){this.toolLabel = toolLabel;}
    this.setToolComment = function (toolComment){this.toolComment = toolComment;}
    this.setFormatLabel = function (formatLabel){this.formatLabel = formatLabel;}
    this.setFormatComment = function (formatComment){this.formatComment = formatComment;}

    //Getters
    this.getEdamType = function () {return this.edamType;}
    this.getToolLabel = function () {return this.toolLabel;}
    this.getToolComment = function () {return this.toolComment;}
    this.getFormatLabel = function () {return this.formatLabel;}
    this.getFormatComment = function () {return this.formatComment;}
}
