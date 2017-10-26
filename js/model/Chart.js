function Chart(){
    this.type;
    this.label = [];
    this.data = [];
    this.color = [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360','#222222', '#111111'];

    this.construct = function (type,label,data,color){
        this.setType(type);
        this.setLabel(label);
        this.setData(data);
        this.setColor(color);
    }

        this.setType = function (type){this.type = type;}
        this.setLabel = function (label){this.label = label;}
        this.setData = function (data){this.data = data;}
        this.setColor = function (color){this.color = color;}



        this.getType = function (){return this.type;}
        this.getLabel = function (){return this.label;}
        this.getData = function (){return this.data;}
        this.getColor = function (){return this.color;}
}
