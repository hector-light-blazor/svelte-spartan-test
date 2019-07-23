export class Tickets {

    constructor(json) {
      if(json) {
        this.objectid = json.objectid;
        this.x        = json.x;
        this.y        = json.y;
        this.walk_in  = json.walk_in;
        this.view     = json.view;
        this.id_ticket = json.id_ticket;
        this.cfirst_name = json.cfirst_name;
        this.clast_name  = json.clast_name;
        this.cfull_name  = json.cfull_name;
        this.init        = json.init;
        this.lat         = json.lat;
        this.longy       = json.longy;
      }
    }
  
    sayHi() {
      alert(this.cfirst_name);
    }
  
  }
  