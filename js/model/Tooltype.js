function Tooltype(){
    this.type;
    this.total;
    this.operational;
    this.notOperational;

    this.construct = function (type,total,operational,notOperational){
        this.setType(type);
        this.setTotal(total);
        this.setOperational(operational);
        this.setNotOperational(notOperational);
    }

        this.setType = function (type){this.type = type;}
        this.setTotal = function (total){this.total = total;}
        this.setOperational = function (operational){this.operational = operational;}
        this.setNotOperational = function (notOperational){this.notOperational = notOperational;}

        this.getType = function (){return this.type;}
        this.getTotal = function () {return this.total;}
        this.getOperational = function (){return this.operational;}
        this.getNotOperational = function (){return this.notOperational;}

}
