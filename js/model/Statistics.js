function Statistics(){
    this.total;
    this.operational;
    this.notOperational;
    this.type={};
    // this.cmd;
    // this.web;
    // this.db;
    // this.app;
    // this.lib;
    // this.ontology;
    // this.workflow;
    // this.plugin;
    // this.sparql;
    // this.soap;
    // this.script;
    // this.rest;
    // this.workbench;
    // this.suite;

    this.construct =function (total,operational,cmd, web,db,app,lib,ontology,workflow,plugin,sparql,soap,script,rest,workbench,suite){
        this.total=total;
        this.operational=operational;
        this.notOperational=total-operational;
        this.type = {
            "Cmd" : cmd,
            "Web" : web,
            "Db" : db,
            "App" : app,
            "Lib" : lib,
            "Ontology" : ontology,
            "Workflow" : workflow,
            "Plugin" : plugin,
            "Sparql" : sparql,
            "Soap": soap,
            "Script": script,
            "Rest" : rest,
            "Workbench" : workbench,
            "Suite" : suite
        }

    }
}
