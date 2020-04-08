// pragma solidity >=0.4.21 <0.7.0;
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract ItemAuthenticity{
    
    address public manufacturer;
    address payable manufactureraddress;
    address public assembler;
    
    
    constructor() public{
        manufacturer = msg.sender;
        manufactureraddress = msg.sender;
    }
    
    enum status{itemcreatedbymanufacturer,boughtandpaidbyassembler,outfordeliverybymanufacturer,itemrecievedbyassembler,itemsold}
    enum posession{manufacturer, intransit ,assembler}
    enum carstatus{readyforsale, sold}
    
        struct enginestruct {
    string itemname;
    uint itemprice;
    uint itemquantity;
    // uint itemuniqueid;
    uint itemnumber;
    address[] ownerarray;
    address itemowner;
    ItemAuthenticity.status itemstatus;
    ItemAuthenticity.posession itempossesdby;
}

struct batterystruct{
    string itemname;
    uint itemprice;
    uint itemquantity;
    // uint itemuniqueid;
    uint itemnumber;
    address[] ownerarray;
    address itemowner;
    ItemAuthenticity.status itemstatus;
    ItemAuthenticity.posession itempossesdby;
}

struct carstruct{
    enginestruct engine;
    batterystruct battery;
    string carname;
    string carmodel; 
    uint carprice;
    // uint caruniqueid;
    address[] carownerarray;
    address carowner;
    ItemAuthenticity.carstatus carstatus;
    
}
    
    event statusevent(string itemname, uint itemprice, uint itemquantity, uint itemid, uint itemtrackingstatus, address itemowner);
    event carevent(string itemname, uint itemprice, uint itemquantity, uint itemnumber, address itemowner,string carname, string carmodel, uint carprice);
    
    mapping(uint => enginestruct) public inventorymapping;
    mapping(uint => batterystruct) public batterymapping;
    mapping(uint => carstruct) public carmapping;
    
    // function uniqueidgenerator() private view returns(uint){
    //     return uint(sha256(block.difficulty, now, length));
    // }
    
    
    function itemcreation(string memory name, uint price, uint quantity, uint itemid) public{
        require(msg.sender == manufacturer,"Only the manufacturer can create the item");
        inventorymapping[itemid].itemname = name;
        inventorymapping[itemid].itemprice = price;
        inventorymapping[itemid].itemquantity = quantity;
        // inventorymapping[itemid].itemuniqueid = uniqueidgenerator();
        inventorymapping[itemid].itemnumber = itemid;
        inventorymapping[itemid].itemowner = msg.sender;
        inventorymapping[itemid].ownerarray.push(msg.sender);
        inventorymapping[itemid].itemstatus = status.itemcreatedbymanufacturer;
        inventorymapping[itemid].itempossesdby = posession.manufacturer;
        emit statusevent(inventorymapping[itemid].itemname, inventorymapping[itemid].itemprice, inventorymapping[itemid].itemquantity,inventorymapping[itemid].itemnumber, uint(status.itemcreatedbymanufacturer),inventorymapping[itemid].itemowner);
    }
    
    function batterycreation(string memory name, uint price, uint quantity, uint itemid) public{
        require(msg.sender == manufacturer,"Only the manufacturer can create the item");
        batterymapping[itemid].itemname = name;
        batterymapping[itemid].itemprice = price;
        batterymapping[itemid].itemquantity = quantity;
        // batterymapping[itemid].itemuniqueid = uniqueidgenerator();
        batterymapping[itemid].itemnumber = itemid;
        batterymapping[itemid].itemowner = msg.sender;
        batterymapping[itemid].ownerarray.push(msg.sender);
        batterymapping[itemid].itemstatus = status.itemcreatedbymanufacturer;
        batterymapping[itemid].itempossesdby = posession.manufacturer;
        emit statusevent(batterymapping[itemid].itemname, batterymapping[itemid].itemprice, batterymapping[itemid].itemquantity,batterymapping[itemid].itemnumber, uint(status.itemcreatedbymanufacturer),batterymapping[itemid].itemowner);
    }
    
    
    function buyandpayitem(uint itemid) public payable{
        require(inventorymapping[itemid].itemprice == msg.value, "Item price not matched");
        require(inventorymapping[itemid].itemstatus == status.itemcreatedbymanufacturer,"The item is already paid for");
        
        inventorymapping[itemid].itemstatus = status.boughtandpaidbyassembler;
        inventorymapping[itemid].itemowner = msg.sender;
        inventorymapping[itemid].ownerarray.push(msg.sender);
        emit statusevent(inventorymapping[itemid].itemname, inventorymapping[itemid].itemprice, inventorymapping[itemid].itemquantity,inventorymapping[itemid].itemnumber, uint(status.boughtandpaidbyassembler),inventorymapping[itemid].itemowner);
    }
    
    function buyandpaybattery(uint itemid) public payable{
        require(batterymapping[itemid].itemprice == msg.value, "Item price not matched");
        require(batterymapping[itemid].itemstatus == status.itemcreatedbymanufacturer,"The item is already paid for");
        
        batterymapping[itemid].itemstatus = status.boughtandpaidbyassembler;
        batterymapping[itemid].itemowner = msg.sender;
        batterymapping[itemid].ownerarray.push(msg.sender);
        emit statusevent(batterymapping[itemid].itemname, batterymapping[itemid].itemprice, batterymapping[itemid].itemquantity ,batterymapping[itemid].itemnumber, uint(status.boughtandpaidbyassembler),batterymapping[itemid].itemowner);
    }
    
    function enginedeliveredbymanufacturer(uint itemid) public{
        require(inventorymapping[itemid].itemstatus == status.boughtandpaidbyassembler,"Payment pending or item already delivered");
        require(msg.sender == manufacturer,"Only manufacturer can deliver the item.");    
        inventorymapping[itemid].itempossesdby = posession.intransit;
        inventorymapping[itemid].itemstatus = status.outfordeliverybymanufacturer;
        emit statusevent(inventorymapping[itemid].itemname, inventorymapping[itemid].itemprice, inventorymapping[itemid].itemquantity ,inventorymapping[itemid].itemnumber, uint(status.outfordeliverybymanufacturer),inventorymapping[itemid].itemowner);
    }
    
    function batterydeliveredbymanufacturer(uint itemid) public{
        require(batterymapping[itemid].itemstatus == status.boughtandpaidbyassembler,"Payment pending or item already delivered");
        require(msg.sender == manufacturer,"Only manufacturer can deliver the item.");    
        batterymapping[itemid].itempossesdby = posession.intransit;
        batterymapping[itemid].itemstatus = status.outfordeliverybymanufacturer;
        emit statusevent(batterymapping[itemid].itemname, batterymapping[itemid].itemprice, batterymapping[itemid].itemquantity ,batterymapping[itemid].itemnumber, uint(status.outfordeliverybymanufacturer),batterymapping[itemid].itemowner);
    }
    
    function itemownersdetails(uint num) public view returns(address[] memory){
        return inventorymapping[num].ownerarray;
    }
    
    function batteryownersdetails(uint num) public view returns(address[]memory){
        return batterymapping[num].ownerarray;
    }
    
    function itemreceived(uint itemid) public{
        require(inventorymapping[itemid].itemstatus == status.outfordeliverybymanufacturer,"The item has not been out for delivery from the manufacturer yet.");
        inventorymapping[itemid].itemstatus = status.itemrecievedbyassembler;
        inventorymapping[itemid].itempossesdby = posession.assembler;
    }
    
    function batteryreceived(uint itemid) public{
        require(batterymapping[itemid].itemstatus == status.outfordeliverybymanufacturer,"The item has not been out for delivery from the manufacturer yet.");
        batterymapping[itemid].itemstatus = status.itemrecievedbyassembler;
        batterymapping[itemid].itempossesdby = posession.assembler;
    }
    
    function registercar(string memory carname, string memory carmodel, uint carprice, uint carid, uint itemid, uint batteryid) public  {
        assembler = msg.sender;
        carmapping[carid].engine.itemname = inventorymapping[itemid].itemname ;
        carmapping[carid].engine.itemprice = inventorymapping[itemid].itemprice;
        carmapping[carid].engine.itemquantity = inventorymapping[itemid].itemquantity;
        // carmapping[carid].engine.itemuniqueid = inventorymapping[itemid].itemuniqueid ;
        carmapping[carid].engine.itemnumber = inventorymapping[itemid].itemnumber;
        carmapping[carid].engine.itemowner = inventorymapping[itemid].itemowner;
        carmapping[carid].engine.itemstatus = inventorymapping[itemid].itemstatus;
        carmapping[carid].engine.itempossesdby = inventorymapping[itemid].itempossesdby;
        carmapping[carid].battery.itemname = batterymapping[batteryid].itemname ;
        carmapping[carid].battery.itemprice = batterymapping[batteryid].itemprice;
        carmapping[carid].battery.itemquantity = batterymapping[batteryid].itemquantity;
        // carmapping[carid].battery.itemuniqueid = batterymapping[batteryid].itemuniqueid ;
        carmapping[carid].battery.itemnumber = batterymapping[batteryid].itemnumber;
        carmapping[carid].battery.itemowner = batterymapping[batteryid].itemowner;
        carmapping[carid].battery.itemstatus = batterymapping[batteryid].itemstatus;
        carmapping[carid].battery.itempossesdby = batterymapping[batteryid].itempossesdby;
        carmapping[carid].carname = carname;
        carmapping[carid].carmodel = carmodel;
        carmapping[carid].carprice = carprice;
        // carmapping[carid].caruniqueid = uniqueidgenerator();
        carmapping[carid].carownerarray.push(msg.sender);
        carmapping[carid].carowner = assembler;
        carmapping[carid].carstatus = carstatus.readyforsale;
        
        emit carevent(carmapping[carid].engine.itemname,carmapping[carid].engine.itemprice,carmapping[carid].engine.itemquantity,carmapping[carid].engine.itemnumber,carmapping[carid].engine.itemowner,carmapping[carid].carname, carmapping[carid].carmodel,carmapping[carid].carprice);
    
    }
    
    
    function buyandpaycar(uint carid) public payable{
        require(carmapping[carid].carprice == msg.value, "car price not matched");
        require(carmapping[carid].carstatus == carstatus.readyforsale,"The car is not yet readyforsale");
        
        carmapping[carid].carstatus = carstatus.sold;
        carmapping[carid].carowner = msg.sender;
        carmapping[carid].carownerarray.push(msg.sender);
        
    }    
    
    function sellusedcar(uint carprice, uint carid) public{
        carmapping[carid].carprice = carprice;
        // carmapping[carid].caruniqueid = uniqueidgenerator();
        carmapping[carid].carstatus = carstatus.readyforsale;
        
    } 
    function carownershistory(uint carid) public view returns(address[] memory){
        return carmapping[carid].carownerarray;
    }
    
    function cardetails(uint carid) public view returns (carstruct memory){
        return(carmapping[carid]);
    }
    
    function withdrawpaymentfromcontract() public {
        require(msg.sender == manufacturer,"Only the manufacturer can withdraw the payment");
        // manufactureraddress = manufacturer;
        manufactureraddress.transfer(address(this).balance);
    }

    
}


// event(itemcreatedbymanufacturer,boughtandpaidbyassembler,outfordeliverybymanufacturer,itemrecievedbyassembler,itemsold)
//     manufacturer - itemcreation {name, price, quantity, uniqueid, itemnumber}
//     assembler - buyandpayitem {itemnumber - payment}
//     manufacturer - recieve payment from smart contract
//     manufacturer - itemdelivery{changeevent to outfordelivery}
//     assembler - registercar - {owner, engine-uniqueid, uniqueid}
//     transferownership - lookup - (uniqueid - frommanufacturer-soldtoassembler)
//     specify warranty, manufacturing date, numberofservices, counterfiet
//     mapping of set of individual items to a car
//     generate uniqueid for car for lookup of all details
//     All items created array;
