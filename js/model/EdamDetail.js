function EdamDetail(){
    this.edamType;
    this.toolName;
    this.toolComment;
    this.formatLabel;
    this.formatComment;

    this.construct = function (edamType,toolName,toolComment,formatLabel,formatComment){
        this.setEdamType(edamType);
        this.setToolName(toolName);
        this.setToolComment(toolComment);
        this.setFormatLabel(formatLabel);
        this.setFormatComment(formatComment);
    }

    //Setters
    this.setEdamType = function (edamType) {this.edamType = edamType;}
    this.setToolName = function (toolName){this.toolName = toolName;}
    this.setToolComment = function (toolComment){this.toolComment = toolComment;}
    this.setFormatLabel = function (formatLabel){this.formatLabel = formatLabel;}
    this.setFormatComment = function (formatComment){this.formatComment = formatComment;}

    //Getters
    this.getEdamType = function () {return this.edamType;}
    this.getToolName = function () {return this.toolName;}
    this.getToolComment = function () {return this.toolComment;}
    this.getFormatLabel = function () {return this.formatLabel;}
    this.getFormatComment = function () {return this.formatComment;}
}
